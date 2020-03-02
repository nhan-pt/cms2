<template>
    <div v-if="form">
        <div class="form-group">
            <label>{{$i('Username')}}</label>
            <template>
                <input type="text" class="form-control" :label="$i('Username')" :placeholder="$i('Username')" v-model="form.userName" v-if="memberId > 0" disabled />
                <input type="text" class="form-control" :label="$i('Username')" :placeholder="$i('Username')" v-model="form.userName" v-else  />
            </template>
        </div>
        <div class="form-group">
            <label>{{$i('FullName')}}</label>
            <input type="text" class="form-control" :label="$i('FullName')" :placeholder="$i('FullName')" v-model="form.fullName" fullWidth />
        </div>
        <div class="form-group" v-if="memberId <= 0">
            <label>{{$i('Password')}}</label>
            <input class="form-control" type="password" :label="$i('Password')" :placeholder="$i('Password')" v-model="form.password" fullWidth />
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-sm-6">
                    <label>{{$i('SelectRole')}}</label>
                    <select class="form-control" v-model="form.role" v-if="listRole && listRole.length > 0">
                        <option v-for="role in listRole" :value="role.id" :key="'role_'+role.id">{{role.roleName}}</option>
                    </select>
                </div>
                <div class="col-sm-6">
                    <label>{{$i('Status')}}</label>
                    <select v-model="form.status" class="form-control">
                        <option :value="1">{{$i('Active')}}</option>
                        <option :value="0">{{$i('DeActived')}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click="submitMember()">
                <span v-if="memberId > 0">{{$i("Update")}}</span>
                <span v-else>{{$i("Add")}}</span>
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'edit',
        props: ['memberId'],
        data() {
            var me = this;
            return {
                form: {
                    userName: '',
                    password: '',
                    fullName: '',
                    email: '',
                    status: 1,
                    gender: 1,
                    role: 0,
                    mobile: '',
                    level: 0,
                    note: '',
                    avatar: '',
                },
                listRole: []
            }
        },
        computed: {
        },
        methods: {
            submitMember() {
                var me = this;
                if (!this.form.fullName) {
                    return this.$message(this.$i("RequiredFullname"), 'error');
                }
                if (!this.form.userName) {
                    return this.$message(this.$i("RequiredUsername"), 'error');
                }
                if (!this.form.password && this.memberId == 0) {
                    return this.$message(this.$i("RequiredPasword"), 'error');
                }
                if (this.form.role == 0) {
                    return this.$message(this.$i("RequiredRole"), 'error');
                }
                this.$http({
                    data: {
                        m: 'user',
                        fn: 'save',
                        id: me.memberId,
                        ...this.form
                    }
                }).then((response) => {
                    if (response.success) {
                        this.$message(this.$i("Successful"));
                        me.$emit('closePopup');
                    }
                }).catch((ex) => {
                    this.$message(ex.message, 'error');
                });
            },
            onAvatarChange(val) {
                this.form.avatar = val;
            },
            getListRole() {
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'role_get_list'
                    }
                }).then((response) => {
                    if (response.success) {
                        this.listRole = response.data;
                    }
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            getUser() {
                this.$http({
                    data: {
                        m: 'user',
                        fn: 'get_detail',
                        id: this.memberId
                    }
                }).then((response) => {
                    if (response.success) {
                        this.form = response.data;
                    }
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
        },
        created() {
            this.getListRole();
            if (this.memberId > 0)
                this.getUser();
        }
    }
</script>
<style scoped>
    .dn-content-left { max-width: 800px; margin: 0 auto; }
    .student-avatar { width: 90px; height: 135px }
    input[type="file"] { display: none; }
    .custom-file-upload { border: 1px solid #ccc; display: inline-block; padding: 5px 8px; cursor: pointer; }

    @media(max-width: 767px) {
        .md-layout { flex-direction: column }
    }

    .ai-info-member { display: flex; align-items: center; margin-bottom: 25px; }
        .ai-info-member .info { margin-left: 20px; }
</style>
