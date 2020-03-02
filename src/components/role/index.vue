<template>
    <wrapper :title="$i('PermissionManagement')" sapo="">
        <div id="form-search">
            <button type="button" class="btn btn-primary" @click="openPopup()">{{$i('Add')}}</button>
        </div>
        <div class="common-table tbl-fix-600">
            <table class="table table-striped">
                <thead slot="header">
                    <tr>
                        <th>{{$i("Index")}}</th>
                        <th> {{$i('Role')}}</th>
                        <th class="text-center width-250">{{$i("Action")}}</th>
                    </tr>
                </thead>
                <tbody v-if="listRoles">
                    <tr v-for="(item, index) in listRoles" :key="item.id">
                        <td>{{index + 1}}</td>
                        <td>{{item.roleName}}</td>
                        <td class="text-center" v-if="!item.isSystem">
                            <button class="btn btn-danger" :disabled="item.isSystem" :title="$i('Remove')" @click="remove(item.id)">
                                <i class="fas fa-times"></i>
                            </button>
                            <button class="btn btn-primary" :title="$i('PermissionSetup')" @click="openPopupSetting(item.id,item.roleName)">
                                <i class="fa fa-cog"></i>
                            </button>
                            <button class="btn btn-warning" :title="$i('Edit')" @click="openPopup(item.id)">
                                <i class="fa fa-edit"></i>
                            </button>
                        </td>
                        <td class="text-center" v-else>---</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <modal v-if="popupAdd" @close="popupAdd=false" :footer="true" :width="600" :title="roleId > 0 ? $i('UpdateRole') : $i('NewRole')">
            <div slot="body" v-if="orderDetail">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>{{$i('NameGroup')}}</label>
                            <input type="text" class="form-control" v-model="orderDetail.roleName" :placeholder="$i('NameGroup')" />
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-primary" @click="save()">
                    <span>{{$i("Save")}}</span>
                </button>
            </div>
        </modal>
        <modal v-if="popupSetting" @close="popupSetting=false" id="modal-edit-class" :width="750" :title="$i('Decentralization') + ': ' + roleName">
            <div slot="body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="select_all" ::checked="selectAll" v-model="selectAll">
                            <label class="custom-control-label" for="select_all">{{$i('SelectAll')}}</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="selectUpdateMember" ::checked="isUpdateMember" v-model="isUpdateMember">
                            <label class="custom-control-label" for="selectUpdateMember">{{$i('UpdateUserRightsAgain')}}</label>
                        </div>
                    </div>
                    <div v-for="group in rolePermission" class="col-sm-6 rolePermission" :key="'g_'+group.id">
                        <h4>{{group.name}}</h4>
                        <div class="custom-control custom-checkbox" v-for="per in group.permissions" :key="'p_'+per.id">
                            <input type="checkbox" class="custom-control-input" :id="'select_'+per.id" ::checked="per.isExists > 0" v-model="per.isExists" :value="per.isExists">
                            <label class="custom-control-label" :for="'select_'+per.id">{{per.name}}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-success" secondary @click="updatePermission()">
                    <span>{{$i("Save")}}</span>
                </button>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'role-index',
        data() {
            return {
                popupAdd: false,
                popupSetting: false,
                roleName: '',
                roleId: 0,
                selectAll: false,
                isUpdateMember: false,
                listData: [],
                rolePermission: [],
                orderDetail: {
                    id: 0,
                    roleName: ''
                },
                loaded: false,
            }
        },
        watch: {
            'selectAll'(val) {
                for (var group of this.rolePermission) {
                    for (var per of group.permissions) {
                        per.isExists = val;
                    }
                }
            },
        },
        computed: {
            ...mapGetters(['listRoles']),
        },
        methods: {
            ...mapActions(['getListRoles', 'getDetailRolePermission']),
            openPopup(id) {
                this.orderDetail.id = id || 0;
                this.popupAdd = true;
                this.roleId = id;
                if (this.orderDetail.id > 0)
                    this.getDetail();
                else
                    this.orderDetail = {
                        id: 0,
                        name: '',
                        nameJP: ''
                    };
            },
            closePopup() {
                this.popupAdd = false;
            },
            openPopupSetting(roleId, roleName) {
                this.roleId = roleId;
                this.roleName = roleName;
                this.popupSetting = true;
                this.selectAll = false;
                this.isUpdateMember = false;
                this.getRolePermission();
            },
            closePopupSetting() {
                this.popupSetting = false;
            },
            getRoles() {
                this.getListRoles().then((response) => {
                }).catch(error => {
                    return this.$message(error.message, 'error');
                });
            },
            getDetail() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'role',
                        fn: 'detail',
                        id: this.orderDetail.id
                    }
                }).then((response) => {
                    if (response.success) {
                        this.orderDetail = response.data;
                    }
                    loading.hide();
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            getRolePermission() {
                this.getDetailRolePermission(this.roleId).then((response) => {
                    if (response.success) {
                        this.rolePermission = response.data;
                        this.loaded = true;
                    }
                }).catch(error => {
                    return this.$message(error.message, 'error');
                });
            },
            save() {
                var me = this;
                if (me.orderDetail.roleName == '') {
                    return this.$message(this.$i('PleaseEnterNameRole'), 'error');
                }
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'role',
                        fn: this.orderDetail.id > 0 ? 'update': 'add',
                        ...this.orderDetail
                    }
                }).then((res) => {
                    loading.hide();
                    this.closePopup();
                    this.$message(this.$i("Successful"));
                    me.getRoles();
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });

            },
            remove(id) {
                this.$confirm(this.$i('DeleteRole')).then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'role',
                            fn: 'remove',
                            id: id
                        }
                    }).then((response) => {
                        if (response.success) {
                            loading.hide();
                            this.getRoles();
                        }
                        loading.hide();
                    }).catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
                });
            },
            updatePermission() {
                let loading = this.$loading.show();
                let objPermission = [];
                for (var group of this.rolePermission) {
                    for (var per of group.permissions) {
                        if (per.isExists > 0)
                            objPermission.push(per.id);
                    }
                }
                this.$http({
                    data: {
                        m: 'role',
                        fn: 'update-permission',
                        isUpdateMember: this.isUpdateMember,
                        roleId: this.roleId,
                        permissionIds: objPermission
                    }
                }).then(() => {
                    loading.hide();
                    this.closePopupSetting();
                    this.$message(this.$i("Successful"));
                }).catch(err => {
                    this.$message(err.message, 'error');
                    loading.hide();
                });

            },
        },
        created() {
            this.getRoles();
        },
    }
</script>