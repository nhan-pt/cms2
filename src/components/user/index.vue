<template>
    <wrapper :title="$i('SystemAdmin')" sapo="">
        <div class="row" id="form-search">
            <div class="col-sm-2">
                <input class="form-control" :placeholder="$i('Keyword')" v-model="objData.keyword" />
            </div>
            <div class="col-sm-2">
                <select class="form-control" v-model="objData.roleId">
                    <option :value="-1">{{$i('Role')}}</option>
                    <option v-for="role in listRole" :value="role.id" :key="'role_'+role.id">{{role.roleName}}</option>
                </select>
            </div>
            <div class="col-sm-2">
                <select class="form-control" v-model="objData.status">
                    <option :value="1">{{$i('Active')}}</option>
                    <option :value="0">{{$i('DeActived')}}</option>
                </select>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-info" @click="getlistData()">{{$i('Search')}}</button>
                <button class="btn btn-primary" @click="openPopup()">{{$i('Add')}}</button>
            </div>
        </div>
        <table class="table table-striped mb-10">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{{$i('UserName')}}</th>
                    <th>{{$i('FullName')}}</th>
                    <th>{{$i('CreatedDate')}}</th>
                    <th>{{$i('Role')}}</th>
                    <th class="text-center">{{$i('Action')}}</th>
                </tr>
            </thead>
            <tbody v-if="listData">
                <tr v-for="(item, i) in listData" :key="`user_${item.id}`">
                   <th>{{i + 1 + rowNum}}</th>
                    <td>{{item.userName}}</td>
                    <td>{{item.fullName}}</td>
                    <td>{{item.createdDate | moment("DD/MM/YYYY")}}</td>
                    <td>{{roleName(item.roleId)}}</td>
                    <td class="btn-action width-210">
                        <button @click="changeStatus(item.id)" class="btn btn-danger" v-if="item.status == 1">
                            <i class="fas fa-times"></i>
                        </button>
                        <span :title="$i('RoleSetting')" class="btn btn-primary" @click="openPopupSetting(item.id,item.userName, item.roleId)"><i class="fa fa-cog"></i></span>
                        <span :title="$i('Edit')" class="btn btn-warning" @click="openPopup(item.id)"><i class="fa fa-edit"></i></span>
                        <span :title="$i('ChangePassword')" class="btn btn-dark" @click="resetPass(item)"><i class="fas fa-sync-alt"></i></span>
                    </td>
                </tr>
            </tbody>
        </table>
        <pager :total="totalRow" :pageIndex="objData.pageIndex" @change="pageChange" />
        <modal v-if="popupResetPass" @close="popupResetPass=false" id="modal-resetpass" :footer="false" :width="400" :title="$i('ChangePassword')+':' + memberName">
            <div slot="body">
                <div class="form-group">
                    <label>{{$i('NewPassword')}}</label>
                    <input class="form-control"  v-model="passReset" type="password" />
                </div>
               <div class="text-center"> <button class="btn btn-primary" secondary @click="comfirmResetPass()">{{$i('Save')}}</button></div>
            </div>
        </modal>
        <modal v-if="popupAdd" @close="popupAdd=false" id="modal-dashbroad" :footer="false" :title="$i('SystemAdmin')">
            <div slot="body">
                <edit :memberId="memberId" v-on:closePopup="closePopup()" />
            </div>
        </modal>
        <modal v-if="popupSetting" @close="popupSetting=false" id="modal-edit-class" :footer="false" :width="750" :title="$i('RoleSetting')+': '+ userName">
            <div slot="body">
                <permission :memberId="memberId" :roleId="role" v-on:closePopup="closePopupSetting()"></permission>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions} from 'vuex'
    import edit from './edit'
    import permission from './permission'
    export default {
        name: 'user-index',
        components: {
            edit, permission
        },
        data() {
            var me = this;
            return {
                popupResetPass: false,
                resetMemberName: '',
                resetMemberId: 0,
                passReset: '',
                objData: {
                    keyword: '',
                    status: 1,
                    roleId: -1,
                    pageIndex: 1,
                    pageSize: 20
                },
                listData: null,
                listRole: [],
                totalRow: 0,
                timeDelay: null,
                popupAdd: false,
                popupSetting: false,
                memberId: 0,
                userName: '',
                role: 0
            }
        },
        computed: {
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            }
        },
        methods: {
            ...mapActions(['deleteUser']),
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getlistData();
            },
            comfirmResetPass() {
                if (!this.passReset) {
                    this.$error(this.$i("RequiredNewPassword"));
                    return;
                }
                if (this.resetMemberId <= 0) {
                    this.$error(this.$i("MemberError"));
                    return;
                }

                this.$http({
                    data: {
                        m: "user",
                        fn: "reset-password",
                        userId: this.resetMemberId,
                        password: this.passReset
                    }
                }).then((response) => {
                    if (response.success) {
                        this.popupResetPass = false;
                        this.passReset = '';
                        this.$success(this.$i("ChangePasswordSuccessfully"));
                    }
                });
            },
            resetPass(item) {
                this.memberName = item.userName;
                this.resetMemberId = item.id;
                this.popupResetPass = true;
            },
            openPopup(id) {
                this.memberId = id || 0;
                this.popupAdd = true;
            },
            closePopup() {
                this.popupAdd = false;
                this.getlistData();
            },
            openPopupSetting(id, userName, role) {
                this.memberId = id || 0;
                this.role = role;
                this.userName = userName;
                this.popupSetting = true;
            },
            closePopupSetting() {
                this.popupSetting = false;
                this.getlistData();
            },
            getListRole() {
                this.$http({
                    data: {
                        m: 'role',
                        fn: 'list'
                    }
                }).then((response) => {
                    if (response.success) {
                        this.listRole = response.data;
                    }
                }).catch(err => {
                    return this.$message(err.message, 'error');
                });
            },
            getlistData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        url: '/cms/user/search',
                        ...this.objData
                    }
                }).then((response) => {
                    loading.hide();
                    this.listData = response.data;
                    this.totalRow = response.totalRow;
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            roleName(roleId) {
                let roleObj = this._.find(this.listRole, (item) => {
                    return item.id == roleId;
                });
                if (roleObj)
                    return roleObj.roleName;
                return "---";
            },
            changeStatus(value) {
                this.$confirm(this.$i('DoYouWantDeleteUser')).then(() => {
                    this.deleteUser(value).then(() => {
                        this.$message(this.$i('Successful'));
                    }).catch(err => {
                        this.$error(err.message);
                    }).finally(() => {
                        this.getlistData();
                    })
                });
            }
        },
        created() {
            this.getListRole();
            this.getlistData();
        },
    }
</script>
