<template>
    <div>
        <div class="form-group">
            <select v-model="currentRoleId" class="form-control" v-on:change="getRolePermission($event)"
                    v-if="listRoles && listRoles.length > 0">
                <option v-for="role in listRoles" :value="role.id" :key="'role_'+role.id">{{role.roleName}}
                </option>
            </select>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="select_all" ::checked="selectAll"
                           v-model="selectAll">
                    <label class="custom-control-label" for="select_all">{{$i('SelectAll')}}</label>
                </div>
            </div>
            <div v-for="group in memberPermission" class="col-sm-6 rolePermission"
                 :key="'g_'+group.id+currentRoleId" v-if="loaded">
                <h4>{{group.name}}</h4>
                <div class="custom-control custom-checkbox" v-for="per in group.permissions" :key="'p_'+per.id">
                    <input type="checkbox" class="custom-control-input" :id="'select_'+per.id"
                           v-model="per.isExists" :value="true">
                    <label class="custom-control-label" :for="'select_'+per.id">{{per.name}}</label>

                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-success" @click="updatePermission()">
                <span>{{$i("Save")}}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'permission',
        props: ['memberId', 'roleId'],
        data() {
            return {
                memberPermission: null,
                listRole: [],
                selectAll: false,
                currentRoleId: 0,
                loaded: false,
                objDataUserPermission: {
                    userId: -1,
                    roleId: -1,
                    permissionIds: [],
                }
            }
        },
        computed: {
            ...mapGetters(['userPermission', 'detailRolePermission', 'listRoles']),
        },
        watch: {
            'selectAll'(val) {
                for (var group of this.memberPermission) {
                    for (var per of group.permissions) {
                        per.isExists = val;
                    }
                }
            },
        },
        methods: {
            ...mapActions(['getDetailUserPermission', 'getDetailRolePermission', 'getListRoles', 'saveUserPermission']),
            getUserPermission() {
                this.getDetailUserPermission(this.memberId).then((response) => {
                    if (response.success) {
                        this.memberPermission = null;
                        this.memberPermission = response.data;
                        this.loaded = true;
                    }
                }).catch(error => {
                    return this.$message(error.message, 'error');
                });
            },
            getRolePermission(e) {
                let id = e.target.value;
                this.currentRoleId = id;
                this.getDetailRolePermission(id).then((response) => {
                    if (response.success) {
                        this.memberPermission = null;
                        this.memberPermission = response.data;
                        this.loaded = true;
                    }
                }).catch(error => {
                    return this.$message(error.message, 'error');
                });
            },
            updatePermission() {
                if (this.currentRoleId <= 0) {
                    return this.$message(this.$i("RequiredRole"), 'error');
                }
                let objPermission = [];
                for (var group of this.memberPermission) {
                    for (var per of group.permissions) {
                        if (per.isExists > 0)
                            objPermission.push(per.id);
                    }
                }
                this.objDataUserPermission.userId = this.memberId;
                this.objDataUserPermission.roleId = this.currentRoleId;
                this.objDataUserPermission.permissionIds = JSON.stringify(objPermission);
                this.saveUserPermission(this.objDataUserPermission).then((response) => {
                    if (response.success) {
                        this.$emit('closePopup');
                        this.$message(this.$i("Successful"));
                    }
                }).catch(error => {
                    return this.$message(error.message, 'error');
                });
            },
            getRoles() {
                this.getListRoles().then((response) => {
                }).catch(error => {
                    return this.$message(error.message, 'error');
                });
            },
        },
        created() {
            this.currentRoleId = this.roleId;
            this.getRoles();
            this.getUserPermission();
        },
    }

</script>

<style scoped>
    .mu-checkbox {
        display: table;
    }

    .rolePermission {
        margin-bottom: 15px;
    }

    .rolePermission h3 {
        margin-bottom: 8px;
    }
</style>
