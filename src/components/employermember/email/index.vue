<template>
<div v-if="listEmail" class="email_employer">
  <div class="table__location__wrapper">
        <table class="table table-borderless fixed-table">
            <thead>
                <tr>
                    <th class="">
                        {{$i('email_table_email')}}
                    </th>
                    <th class="width-100">
                        To
                    </th>
                    <th class="width-100">
                        Bcc
                    </th>
                    <th class="width-100">
                        Cc
                    </th>
                    <th>
                         {{$i('employer_job_post_action')}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in listEmail" :key="item.id">
                    <td> 
                        <div class="td-nowrap"  :title="item.email">
                            {{item.email}}
                        </div>
                    </td>
                    <td>
                        <div class="width-100 td-nowrap text-center"  v-if="item.type== toEmail">
                            <img src="../../../assets/images/check.png" />
                        </div>
                    </td>
                    <td>
                        <div class="width-100 td-nowrap text-center"  v-if="item.type== bccEmail">
                             <img src="../../../assets/images/check.png" />
                        </div>
                    </td>
                    <td>
                        <div class="width-100 td-nowrap text-center"  v-if="item.type== ccEmail">
                            <img src="../../../assets/images/check.png" />
                        </div>
                    </td>
                    <td class="btn-action fixed-right-row">
                        <div class="nowrap-row">
                          <button class="btn text-white  bg-purple" @click="openPopupUpdate(item.id)">
                            <i class="fa fas fa-edit"></i>
                          </button>
                          <button class="btn bg-f53345 white">
                            <i class="fa fa-trash-alt" @click="removeEmail(item.id)"></i>
                          </button>
                        </div>
                    </td>
                </tr>              
            </tbody>
        </table>
        <div class="group-btn-employer mb-4">
            <div class="row">
                <div class="col-12 text-right">
                    <button class="btn-publish w-25 bg-orange btn__add__location_2" @click="openPopup()">
                        {{$i('cms_new_branch')}}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <el-dialog :visible.sync="ShowModalEmail" width="25%" :close-on-click-modal="false" :show-close="false" center>
        <modalAddEmail v-model="objDataEmail" :emailId="emailId" @close="close"  @updateEmail="updateEmail"></modalAddEmail>
    </el-dialog>
</div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import modalAddEmail from './add'
import {EmailStatus} from '../../../types/enum'
export default {
    data() {
        return {
            objDataEmail:{
                email: null,
                type:EmailStatus.TO,
                description: null,
                employerId: this.$route.params.id
            },
            totalRow:null,
            ShowModalEmail: false,
            toEmail: EmailStatus.TO,
            ccEmail: EmailStatus.CC,
            bccEmail: EmailStatus.BCC,
            emailId:0
        }
    },
    components:{
        modalAddEmail
    },
    props:['listEmail','getListEmails'],
    methods: {
        ...mapActions(['deleteEmailEmployer','addEmailEmployer','editEmailEmployer']),
        removeEmail(value){
            let confirm = 'DoYouWantDelete'
            this.$confirm(this.$i(confirm)).then(() => {
                this.deleteEmailEmployer(value)
                    .then((res) => {
                        if (res.success) {
                            this.$message(this.$i('Successful'));
                            this.getListEmails()
                        }
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            })
        },
        close(){
            this.ShowModalEmail = false
            this.objDataEmail.email = null
            this.objDataEmail.type = EmailStatus.TO
            this.objDataEmail.description = null
            this.emailId = 0
        },
        openPopup() {
            this.ShowModalEmail = true;
        },
        openPopupUpdate(Id) {
            this.ShowModalEmail = true;
            this.emailId = Id || 0;
            this.listEmail.map(i => {
                if(i.id==Id){
                    this.objDataEmail.email= i.email
                    this.objDataEmail.type= i.type
                    this.objDataEmail.description= i.description
                }
            })
            
        },
        updateEmail(){
            let objDataUpdateEmail={
                email : this.objDataEmail.email,
                type: this.objDataEmail.type,
                description: this.objDataEmail.description,
                id: this.emailId
            }
           let editOrCreate = this.emailId != 0 ? this.editEmailEmployer(objDataUpdateEmail) :this.addEmailEmployer(this.objDataEmail)
            editOrCreate.then((res) => {
                if (res.success) {
                    this.$message(this.$i('Successful'));
                    this.ShowModalEmail= false
                    this.getListEmails()
                    this.objDataEmail.email = null
                    this.objDataEmail.type = EmailStatus.TO
                    this.objDataEmail.description = null
                    this.emailId = 0
                    }
                })
                .catch(err => {
                     this.$error(err.message);
                })
            },
    },
    created() {
    }
}
</script>
<style scoped>
.white{
    color: white
}
</style>
