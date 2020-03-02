<template>
  <wrapper :title="$i('MemberManagement')" sapo>
    <div class="row" id="form-search">
      <div class="col-sm-2">
        <input class="form-control" :placeholder="$i('Keyword')" v-model="objData.keyword">
      </div>
      <div class="col-sm-2">
        <select class="form-control" v-model="objData.status">
          <option :value="-1">{{$i('Status')}}</option>
          <option :value="1">{{$i('Active')}}</option>
          <option :value="0">{{$i('DeActived')}}</option>
        </select>
      </div>
    </div>
    <table class="table table-striped mb-10">
      <thead>
        <tr>
          <th class="width-50">#</th>
          <th class="text-center width-60">{{$i('Avatar')}}</th>
          <th>{{$i('UserName')}}</th>
          <!--<th>Họ tên</th>-->
          <!--<th>Điện thoại</th>-->
          <th>{{$i('Email')}}</th>
          <th>{{$i('CreatedDate')}}</th>
          <th>{{$i('MemberType')}}</th>
          <th class="text-center width-120">{{$i('Action')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in listData" :key="`user_${item.id}`">
          <td>{{i + 1 + rowNum}}</td>
            <td><avatar :src="item.avatarSquare" :width="50" :username="item.fullName" /></td>
          <!--<td>{{item.userName}}</td>-->
          <td>{{item.fullName}}</td>
          <!--<td>{{item.mobile}}</td>-->
          <td>{{item.email}}</td>
          <td>{{item.createdDate | moment("DD/MM/YYYY")}}</td>
          <td>{{item.loginType}}</td>
          <td class="btn-action">
            <span
              v-if="item.status < 1"
              :title="$i('Actived')"
              class="btn btn-primary"
              @click="activeMember(item.id)"
            >
              <i class="fa fa-unlock"></i>
            </span>
            <span v-else :title="$i('DeActived')" class="btn btn-danger" @click="lockMember(item.id)">
              <i class="fa fa-lock"></i>
            </span>
            <span :title="$i('ChangePassword')" class="btn btn-dark" @click="resetPass(item)">
              <i class="fas fa-sync-alt"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <page :total="totalRow" :pageIndex="objData.pageIndex" @change="pageChange"/>
    <modal
      v-if="popupResetPass"
      @close="popupResetPass=false"
      id="modal-resetpass"
      :footer="false"
      :width="400"
      :title="$i('ChangePassword')+': ' + memberName"
    >
      <div slot="body">
        <div class="form-group">
            <label>{{$i('NewPassword')}}</label>
          <input class="form-control" :placeholder="$i('NewPassword')" v-model="passReset" type="password">
        </div>
        <div class="text-center">
          <button class="btn btn-primary" secondary @click="comfirmResetPass()">{{$i('Save')}}</button>
        </div>
      </div>
    </modal>
    <modal
      v-if="popupAdd"
      @close="popupAdd=false"
      id="modal-dashbroad"
      :footer="false"
      :title="$i('Update')"
    >
      <div slot="body">
        <edit :memberId="memberId" v-on:closePopup="closePopup()"/>
      </div>
    </modal>
  </wrapper>
</template>
<script>
import edit from "./edit";
export default {
  name: "member-index",
  components: {
    edit
  },
  data() {
    var me = this;
    return {
      popupResetPass: false,
      resetMemberName: "",
      resetMemberId: 0,
      passReset: "",
      objData: {
        keyword: "",
        status: 1,
        roleId: -1,
        pageIndex: 1,
        pageSize: 20
      },
      listData: [],
      totalRow: 0,
      timeDelay: null,
      popupAdd: false,
      memberId: 0,
      userName: ""
    };
  },
  computed: {
    rowNum() {
      return (this.objData.pageIndex - 1) * this.objData.pageSize;
    }
  },
  watch: {
    //Search theo keyword
    "objData.keyword"(val) {
      clearTimeout(this.timeDelay);
      this.timeDelay = setTimeout(() => {
        this.$set(this.objData, "pageIndex", 1);
        this.$set(this.objData, "keyword", val);
        this.getlistData();
      }, 500);
    },
    //Search theo status
    "objData.status"(val) {
      this.$set(this.objData, "pageIndex", 1);
      this.$set(this.objData, "status", val);
      this.getlistData();
    }
  },
  methods: {
    pageChange(pageNum) {
      this.$set(this.objData, "pageIndex", pageNum);
      this.getlistData();
    },
    comfirmResetPass() {
      if (!this.passReset) {
        this.$alert(this.$i("Notification"), this.$i("RequiredNewPassword"), "error");
        return;
      }
      if (this.resetMemberId <= 0) {
        this.$alert(this.$i("Notification"), this.$i("Error"), "error");
        return;
      }

      this.$http({
        data: {
          m: "member",
          fn: "reset-password",
          memberId: this.resetMemberId,
          password: this.passReset
        }
      }).then(response => {
        if (response.success) {
          this.popupResetPass = false;
          this.$success(this.$i("ChangePasswordSuccessfully"));
        }
      });
    },
    activeMember(id) {
      var me = this;
        this.$confirm(this.$i('AreYouSure')).then(() => {
        this.$http({
          data: {
            m: "member",
            fn: "change-status",
            memberId: id,
            status: 1
          }
        })
          .then(response => {
            if (response.success) {
              me.getlistData();
            }
          })
          .catch(err => {
            return this.$message(err.message, "error");
          });
      });
    },
    lockMember(id) {
      var me = this;
        this.$confirm(this.$i('AreYouSure')).then(() => {
        this.$http({
          data: {
            m: "member",
            fn: "change-status",
            memberId: id,
            status: 0
          }
        })
          .then(response => {
            if (response.success) {
              me.getlistData();
            }
          })
          .catch(err => {
            return this.$message(err.message, "error");
          });
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
    getlistData() {
      let loading = this.$loading.show();
      this.$http({
        data: {
          m: "member",
          fn: "search",
          ...this.objData
        }
      })
        .then(response => {
          loading.hide();
          this.listData = response.data;
          this.totalRow = response.totalRow;
        })
        .catch(err => {
          loading.hide();
          return this.$message(err.message, "error");
        });
    }
  },
  created() {
    this.getlistData();
  }
};
</script>