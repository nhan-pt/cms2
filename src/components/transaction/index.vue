<template>
<div class="template w-100 bg-white position-relative">
    <div class="d-flex align-items-center template-title ">
        <i class="fas fa-bars mr-20"></i>
        <p class="m-0">{{$i('cms_list_transaction')}}</p>
    </div>
    <div class="template-content">
        <div class="row mt-2">
            <div class="col-md-6 col-lg-3 col-12">
                <el-input v-model="searchTransaction.searchKeyword" type="number" maxlength="200" :placeholder="$i('cms_code_transaction')"></el-input>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <el-select v-model="searchTransaction.type" clearable filterable :placeholder="$i('cms_type_transaction')">
                    <el-option v-for="item in listType" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div> 
            <div class="col-md-6 col-lg-3 col-12">
                <el-select v-model="searchTransaction.employerId" remote clearable filterable  :loading="loadEmployer" :remote-method="remoteEmployer" :placeholder="$i('cms_employer_list_employer')">
                    <el-option v-for="(em,i) in listEmployer" 
                        :key="em.code + i" 
                        :label="em.companyName" 
                        :value="em.id" 
                        :title="$i('cms_employer_list_employer') + ': ' + em.companyName + ' \n' + $i('cms_email_branch') + ': ' + em.email + ' \n' + $i('cms_employer_create_tel') + ': ' + em.mobile"
                        >
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <el-select v-model="searchTransaction.completeStatus" clearable filterable :placeholder="$i('cms_status_transaction')">
                    <el-option v-for="item in listCompleteStatus" :key="item.id" :label="$i(item.name)" :value="item.id">
                    </el-option>
                </el-select>
            </div>

        </div>
        <div class="row mt-4">
            <div class="col-md-6 col-lg-3 col-12">
                <div>
                    <el-date-picker v-model="searchTransaction.fromDate" format="yyyy/MM/dd" value-format="yyyy/MM/dd" type="date" class="width-date" :placeholder="$i('cms_from_time')">
                    </el-date-picker>
                </div>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <el-date-picker v-model="searchTransaction.toDate" format="yyyy/MM/dd" value-format="yyyy/MM/dd" :picker-options="datePickerEnd" type="date" class="width-date" :placeholder="$i('cms_to_date')">
                </el-date-picker>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12 text-center">
                <button class="btn bg-orange btn-search " type="button" @click="search">
                    {{$i('Search')}}
                </button>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-minwidth  fixed-table">
                        <thead>
                            <tr class="border-top-none">
                                <th class="fixed-left-row">
                                    {{$i('cms_create_date')}}
                                </th>
                                <th>
                                    {{$i('cms_code_transaction')}}   
                                </th>
                                <th>
                                    {{$i('cms_type_transaction')}}
                                </th>
                                <th>
                                    {{$i('company_name')}}
                                </th>
                                <th>
                                    {{$i('cms_status_transaction')}}
                                </th>
                                <th>
                                    {{$i('cms_relate_type_transaction')}}
                                </th>
                                <th>
                                    {{$i('cms_relate_id_transaction')}}
                                </th>
                                <th class="fixed-right-row">
                                    {{$i('employer_job_post_action')}}
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="listTransaction">
                            <tr v-for="v in listTransaction" :key="`${v.id}`">
                                <td class="fixed-left-row">
                                    <div class=" td-wrap" :title="formatDate(v.createdDate)">
                                        <div>{{formatDate(v.createdDate)}}</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="text-right">
                                        {{v.id}}
                                    </div>
                                </td>
                                <td>
                                    {{getNameType(v.type)}}
                                </td>  
                                <td>
                                    <div class="width-350 td-wrap" :title="v.name">
                                        <div>{{v.employerCompanyName}}</div>
                                    </div>
                                </td>
                                <td>
                                    <div :class="{'text-green':v.completeStatus == checkStatus.COMPLETE, 'text-orange':v.completeStatus == checkStatus.PENDDING, 'text-danger':v.completeStatus == checkStatus.FAILED}" class="">
                                        {{getNameStatus(v.completeStatus)}}
                                    </div>
                                </td>
                                <td>
                                    {{v.relatedTo}}
                                </td>
                                <td>
                                    <div class="text-right">
                                        {{v.relatedId}}
                                    </div>
                                    
                                </td>
                                <td class="btn-action fixed-right-row">
                                    <div class="w-100 nowrap-row">
                                        <button class="btn bg-purple text-white" @click="openPopup(v.id)">
                                            <i class="fa fas fa-edit"></i>
                                        </button>
                                        <button class="btn bg-f53345 text-white" @click="onDelete(v.id)">
                                            <i class="far fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <pager :total="totalRow" :pageIndex="objDefault.pageIndex" :pageSize="objDefault.pageSize" @change="pageChange" />
        <el-dialog
            :title="$i('cms_update_transaction')"
            :visible.sync="popupEdit"
            width="35%"
            :before-close="closePopUp"
            :close-on-click-modal="false"
            :destroy-on-close="true"
            class="popUpTransaction"
            top="15vh"
            center>
            <editTransaction :transactionId="transactionId" @close="closePopUpGetList()"/>
        </el-dialog>

    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import {TransactionCompleteStatus, TransactionType} from '../../types/enum'
import editEmployer from './edit'

export default {
    components: {
        editTransaction:  () => import("./edit")
    },
    data() {
        return {
            checkStatus: TransactionCompleteStatus,
            datePickerEnd: {
                disabledDate: this.disabledDueDate
            },
            loadEmployer: false,
            totalRow: 0,
            listTransaction: [],
            listEmployer: [],
            transactionId: null,
            popupEdit: false,
            searchTransaction: {
                employerId: null,
                fromDate: null,
                toDate: null,
                completeStatus: null,
                type: null,
                searchKeyword: null,
                pageIndex: 1
            },
            objDefault: {
                pageIndex: 1,
                pageSize: 10,
            },
            
        }
    },
    watch: {
    },
    computed: {
        ...mapGetters(['listCompleteStatus', 'listType']),
        
    },
    methods: {
        ...mapActions(['getListTransaction', 'getMiniEmployer', 'deleteTransaction']),
        disabledDueDate(time) {
            return time.getTime() < Date.parse(this.searchTransaction.fromDate)
        },
        getNameStatus(id) {
            if(!id) return ''
            return this.$i(this.listCompleteStatus.find(e => e.id == id).name)
        },
        getNameType(id) {
            if(id == null) return ''
            return this.listType.find(e => e.id == id).name
        },
        openPopup(Id) {
            this.transactionId = Id || 0
            this.popupEdit = true
        },
        closePopUp(){
            this.popupEdit = false
        },
        closePopUpGetList(){
            this.popupEdit = false
            this.getList()
        },
        onDelete(id) {
            this.$confirm(this.$i('employer_job_post_job_delete')).then(() => {
                this.deleteTransaction(id)
                    .then(res => {
                        this.$success(this.$i('Successful'));
                        this.getList()
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            })
        },
        remoteEmployer(query) {
            this.loadEmployer = true
            setTimeout(() => {
                this.getListEmployer(query);
            },200)
            
        },

        getListEmployer(keyword) {
            let obj = {}
            if(keyword) obj.searchKeyword = keyword.trim()
            obj.pageSize = 20
            this.getMiniEmployer(obj)
                .then((res) => {
                    this.loadEmployer = false
                    this.listEmployer = res.data;
                    let index = 1
                    this.listEmployer.map(e => {
                        e.code = index
                        for(let i in e) {
                            if(!e[i]) e[i] = ""
                        }
                        index++
                    })
                })
                .catch(err => {
                    this.loadEmployer = false
                    this.$error(err.message);
                })
        },

        search() {
            this.getList(1)
        },

        getList(index) {
            if (index) this.objDefault.pageIndex = index;
            let obj = Object.assign({}, this.searchTransaction)
            for(let i in obj) {
                if(i=="type") {
                    if((obj[i] !== TransactionType.OUT) && (obj[i] !== TransactionType.IN)) delete obj[i]
                } 
                else {
                    if(!obj[i]) delete obj[i]
                }
            }
            if(this.$route.query.id) {
                let query = Object.assign({}, this.$route.query);
                delete query.id;
                this.$router.replace({query});
            }
            obj.pageIndex = this.objDefault.pageIndex
            let loading = this.$loading.show();
            this.getListTransaction(obj)
                .then((res) => {
                    loading.hide();
                    this.listTransaction = res.data;
                    this.totalRow = res.totalRow;
                })
                .catch(err => {
                    loading.hide();
                    this.$error(err.message);
                })
        },
        //pager
        pageChange(pageNum) {
            this.$set(this.objDefault, 'pageIndex', pageNum);
            this.getList();
        },
    },
    mounted() {
        this.getListEmployer(null)
        if(this.$route.query.id) {
            this.searchTransaction.searchKeyword = this.$route.query.id
            this.openPopup(this.$route.query.id)
        }
        this.getList()
        
    }
}
</script>

<style scoped>

</style>
