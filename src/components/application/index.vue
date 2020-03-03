<template>
<div class="template w-100 bg-white position-relative">
    <div class="d-flex align-items-center template-title ">
        <i class="fas fa-bars mr-20"></i>
        <p class="m-0">{{$i('cms_applicant_search')}}</p>
    </div>
    <div class="template-content">
        <div class="row">
            <div class="col-12">
                <label class="form-checkbox">
                    <input type="checkbox" class="inactive-appli" name="vehicle1" value="Bike">
                    <span>{{$i('cms_hide_inactive_apply')}}</span>
                </label>
                <div class="text-right mr-35">
                    <ExportDetail :objData="objData" />
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-6 col-lg-3 col-12">
                <el-select v-model.trim="objData.employerId"
                       remote
                       filterable
                       clearable
                       :remote-method="remoteMember"
                       :placeholder="$i('cms_employer_list_employer')">
                    <el-option
                        v-for="item in listMember"
                        :key="item.id"
                        :label="item.companyName"
                        :value="item.id" 
                        :title="TitleCompany(item)"
                        >
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <el-select v-model="objData.branchId" remote clearable filterable :placeholder="$i('cms_job_post_input_search_location')">
                    <el-option v-for="item in listBranch" :key="item.id" :label="item.name" :value="item.id" :title="TitleBranch(item)">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <input class="form-control input-search-2" :placeholder="$i('cms_job_post_input_min_saraly')" type="number" v-model="objData.minSalary">
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <input class="form-control input-search-2" :placeholder="$i('cms_job_post_input_max_saraly')" type="number" v-model="objData.maxSalary">
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6 col-lg-3 col-12">
                <el-select v-model="objData.provinceId" clearable filterable remote :placeholder="$i('Province')">
                    <el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <el-select v-model="objData.districtId" clearable filterable remote :placeholder="$i('District')">
                    <el-option v-for="item in listDistricts" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <el-select v-model="objData.trainLineId" collapse-tags :placeholder="$i('SEARCH_trainLine')" disabled="disabled">
                    <el-option value="-1" label="--Select--"></el-option>
                    <el-option v-for="item in listTrainLines" :key="item.trainLineId" :label="item.name" :value="item.trainLineId">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <el-select v-model="objData.stationIds" clearable filterable remote multiple collapse-tags :placeholder="$i('cms_job_post_input_station')">
                    <el-option v-for="item in listStations" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6 col-lg-3 col-12">
                <div>
                    <el-date-picker v-model="objData.startDate" format="yyyy/MM/dd" value-format="yyyy/MM/dd" type="date" class="width-date" :placeholder="$i('cms_min_applied_date')">
                    </el-date-picker>
                </div>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <el-date-picker v-model="objData.endDate" format="yyyy/MM/dd" value-format="yyyy/MM/dd" :picker-options="datePickerEnd" type="date" class="width-date" :placeholder="$i('cms_max_applied_date')">
                </el-date-picker>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12 text-center">
                <button class="btn bg-orange btn-search " type="button" @click="searchApplication()">
                    {{$i('Search')}}
                    <i :class="loading ? 'text-white':'text-orange'" class="fa fa-spinner fa-spin"></i>
                </button>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="text-right">
                    <button class="btn text-bold btn-view-status" type="button" @click="gettab()" :class="{ 'bg-orange': vuexTab.checktab === true,'text-white': vuexTab.checktab === true}">{{$i('cms_job_post_view_status')}}
                    </button>
                    <button class="btn text-bold btn-list-view" type="button" @click="gettab()" :class="{ 'bg-orange': vuexTab.checktab === false,'text-white': vuexTab.checktab === false}">{{$i('viewAll')}}
                    </button>
                </div>
            </div>
        </div>
        <div class="row my-4">
        </div>
        <!-- show data -->
        <div class="row">
            <div v-if="vuexTab.checktab" class="col-12">
                <input class=" text-bold text-white btn-list-tab" v-for="(e,i) in listTab" :key="i" @click="clickTab(i)" type="button" :value="$i(e.label)" :class="{ 'active': e.css == 'active'}" />
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="table-responsive" :class="{'bt-f89e1f':vuexTab.checktab}">
                    <table class="table table-minwidth table-midle fixed-table">
                        <thead>
                            <tr class="border-top-none">
                                <th class="fixed-left-row">ID</th>
                                <th class="width-title">
                                    <div class="form-btn-header">
                                        <div class="title-btn">{{ $i('cms_applied_date') }}</div>
                                        <div class="click-date">
                                            <button type="button" class="up" @click="getOrderBy('DESC')">
                                                <i class="fas fa-chevron-up"></i>
                                            </button>
                                            <button type="button" class="down" @click="getOrderBy('ASC')">
                                                <i class="fas fa-chevron-down"></i>
                                            </button>
                                        </div>
                                    </div>
                                </th>
                                <th class=""> {{ $i('cms_workplace_near_station') }}</th>
                                <th class="width-loca">{{ $i('cms_job_post_input_search_location') }} </th>
                                <th class="width-title">
                                    <div>{{ $i('cms_job_post_title') }}</div>
                                </th>
                                <th class="width-title">
                                    <div class="form-btn-header">
                                        <div class="title-btn">{{ $i('cms_post_job_salary') }}</div>
                                    </div>
                                </th>
                                <th class=""> {{ $i('cms_candidate_name') }}</th>
                                <th class=""> {{ $i('cms_near_station_applicant') }}</th>
                                <th class=""> {{ $i('cms_status_residence') }}</th>
                                <th class="text-center "> {{ $i('cms_recruitment_shift') }}</th>
                                <th class="text-center "> {{ $i('cms_interview_schedule') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="listApply.length" v-for="(v, k) in listApply" :key="k" >
                                <td class="fixed-left-row">
                                    <a href="javascript:;" @click="redirect(v.id)">{{v.id}}</a>
                                    
                                </td>
                                <td class="position-relative">
                                    <div class="td-nowrap"  :title="formatDate(v.createdDate)">
                                        <a href="javascript:;" @click="redirect(v.id)">{{formatDate(v.createdDate)}}</a>
                                    </div>
                                    <div class="td-nowrap"  :title="formatDate(v.startedWorkDate)" v-if="v.startedWorkDate">
                                        <a href="javascript:;" @click="onToolTip(v.id, TransactionTypeId.IN)" :class="{'text-green':v.startedWorkDate }">
                                            <i class="far fa-check-circle"></i>{{formatDate(v.startedWorkDate)}} <i class="fas fa-yen-sign"></i>
                                        </a>
                                    </div>
                                    <div class="td-nowrap"  :title="formatDate(v.leavedDate)" v-if="v.leavedDate">
                                        <a href="javascript:;" @click="onToolTip(v.id, TransactionTypeId.OUT)" :class="{'text-danger':v.leavedDate }">
                                            <i class="fas fa-chevron-circle-left"></i>{{formatDate(v.leavedDate)}} <i class="fas fa-yen-sign"></i>
                                        </a>
                                    </div>
                                    <div v-if="rowToolTip == v.id && checkRow" class="popup-title position-absolute content-transaction" >
                                        <div class="container my-3 text-white">
                                            <div class="row">
                                                <div class="col-5"> 
                                                    {{$i('cms_create_date')}}:
                                                </div>
                                                <div class="col-7" v-if="listTransaction && listTransaction.createdDate">
                                                    {{formatDate(listTransaction.createdDate)}}
                                                </div>  
                                            </div>
                                            <div class="row">
                                                <div class="col-5" >
                                                    {{$i('cms_code_transaction')}}:
                                                </div>
                                                <div class="col-7" v-if="listTransaction && listTransaction.id">
                                                    <div class="row">
                                                        <div class="col-4">
                                                            {{listTransaction.id}}
                                                        </div>
                                                        <div class="col-8">
                                                            <button type="button" class="btn_detail_transaction btn bg-confirm text-white" @click="redirectTransaction(listTransaction.id)">
                                                                <i class="fas fa-info-circle"></i> {{$i('cms_click_detail_transaction')}}
                                                            </button>
                                                        </div>
                                                    </div>
                                                     
                                                </div>  
                                            </div>
                                            <div class="row">
                                                <div class="col-5">
                                                    {{$i('cms_status_transaction')}}:
                                                </div>
                                                <div class="col-7" v-if="listTransaction && listTransaction.completeStatus">
                                                    <div :class="{'text-green':v.completeStatus == TransactionStatus.COMPLETE, 'text-orange':v.completeStatus == TransactionStatus.PENDDING, 'text-danger':v.completeStatus == TransactionStatus.FAILED}">
                                                        {{getNameStatus(listTransaction.completeStatus)}}
                                                    </div>
                                                </div>  
                                            </div>
                                            <div class="row">
                                                <div class="col-5">
                                                    {{$i('cms_content_transaction')}}
                                                </div>
                                                <div class="col-7">
                                                    <div class="nowrap-content" v-if="listTransaction && listTransaction.description">
                                                        <div v-html="listTransaction.description"></div>
                                                    </div>
                                                </div>  
                                            </div>
                                            <div class="row">
                                                <div class="col-5">
                                                    {{$i('cms_type_transaction')}}
                                                </div>
                                                <div class="col-7" v-if="listTransaction && listTransaction.type != null">
                                                    {{getNameType(listTransaction.type)}}
                                                </div>  
                                            </div>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td >
                                    <div class="td-nowrap" v-for="(e,i) in v.nearStation" :key=i>
                                        <a href="javascript:;" @click="redirect(v.id)">{{e.stationName}} - {{e.trainLineName}}</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="td-nowrap" :title="v.location">
                                        <a href="javascript:;" @click="redirect(v.id)">{{v.location}}</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="width-350 td-wrap" :title="v.title">
                                        <a href="javascript:;" @click="redirect(v.id)">{{v.title}}</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="text-right">
                                        <a href="javascript:;" @click="redirect(v.id)">{{formatPrice(v.salary)}}</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="td-nowrap">
                                        <a href="javascript:;" @click="redirect(v.id)"> {{v.candidate ? v.candidate.name : null}}</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="td-nowrap" v-for="(e,i) in v.candidateStations" :key="i">
                                        <a href="javascript:;" @click="redirect(v.id)"> {{e.trainStationName}} - {{e.trainLineName}}</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="td-nowrap">
                                        <a href="javascript:;" @click="redirect(v.id)"> {{v.residentName}}</a>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(e,i) in v.applyShiftJobInPosts" :key=i>
                                        <a href="javascript:;" @click="redirect(v.id)"> {{e.name}} {{e.startWorking}}-{{e.endWorking}}</a>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(e,i) in v.interviewSchedules" :key="i">
                                        <a href="javascript:;" @click="redirect(v.id)">{{formatDate(e.interviewDate)}} {{formatShift(e.startHour)}} - {{formatShift(e.endHour)}}</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!--  pagination -->
        <pager :total="applyCount" :pageIndex="objData.pageIndex" :pageSize="objData.pageSize" @change="pageChange" />

    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import {
        PostApply, TransactionCompleteStatus, TransactionType
    } from '../../types/enum';
export default {
    components: {
        ElRemoteSearch: () => import('../_shared/el-search'),
        ExportDetail: () => import('./export'),
    },
    data() {
        return {
            listBranch: null,
            objDataBranch: {
                pageSize: 10,
                pageIndex: 1,
                employerId: null,
            },
            checkAll: false,
            vuexTab: {
                checktab: true,
                status: 10,
            },
            orderType:'DESC',
            listTab: [{
                    status: PostApply.APPLIED,
                    label: 'Applied',
                    css: 'active'
                },
                {
                    status: PostApply.INTERVIEWING,
                    label: 'Interview_setup',
                    css: 'deactive'
                },
                {
                    status: PostApply.HIRED,
                    label: 'Hired',
                    css: 'deactive'
                },
                {
                    status: PostApply.REJECT,
                    label: 'cms_applicant_reject ',
                    css: 'deactive'
                },
                {
                    status: PostApply.PENDDINGUPDATEINFO,
                    label: 'pendding_update_info',
                    css: 'deactive'
                },
                {
                    status: PostApply.WAITINGCONFIRM,
                    label: 'waiting_confirm',
                    css: 'deactive'
                },
                {
                    status: PostApply.HIDE,
                    label: 'Hide',
                    css: 'deactive'
                },
                {
                    status: PostApply.DECLINE,
                    label: 'cms_application_decline',
                    css: 'deactive'
                },
                {
                    status: PostApply.QUIT,
                    label: 'cms_application_quit',
                    css: 'deactive'
                },
                {
                    status: PostApply.FIRED,
                    label: 'cms_application_fired',
                    css: 'deactive'
                },
            ],
            loading: false,
            objData: {
                pageSize: 10,
                pageIndex: 1,
                provinceId: null,
                districtId: null,
                stationIds: [],
                trainLineId: null,
                orderType: 'DESC',
                orderBy:'CREATEDDATE',
                status: [],
                branchId:null,
            },
            datePickerEnd: {
                disabledDate: this.disabledDueDate
            },
            jobTypeIds: [],
            objLocation: {
                pageIndex: 1,
                pageSize: 999,
                provinceId: -1,
            },
            objDataMember: {
                pageSize: 99,
                pageIndex: 1,
                searchKeyword: ''
            },
            listDistricts: [],
            listApply: [],
            listMember: [],
            applyCount: 0,
            listStations: [],
            listTrainLines: [],
            employerPostId: 0,
            rowToolTip: null,
            checkType: null,
            checkRow:false,
            listTransaction: {},
            TransactionStatus: TransactionCompleteStatus,
            TransactionTypeId: TransactionType,
        }
    },
    computed: {
        ...mapGetters(['province', 'objSearchApplication', 'tabApplication', 'listCompleteStatus', 'listType']),
    },
    watch: {
        'objData.provinceId': function (value) {
            if (value) {
                this.objLocation.provinceId = value;
                this.getDistrict();
                this.getStation()
            }
        },
        'objData.startDate'(value) {
            value = new Date(value)
            if (value.getTime() > new Date(this.objData.endDate).getTime()) this.objData.endDate = null
        },
        'objData.employerId'(value) {
            if (value) {
                this.getDataBranch()
            } else {
                this.objData.branchId = null
                this.getDataBranch()
            }
        },
    },
    methods: {
        ...mapActions(['getListTransaction', 'saveSearchApplication', 'saveTabApplication', 'deleteEmployerPost', 'getListApplicationPost', 'getListEmployerMember', 'searchListDistrict', 'searchListStation', 'searchTrainLine','getBranch']),
        getNameStatus(id) {
            if(!id) return ''
            return this.$i(this.listCompleteStatus.find(e => e.id == id).name)
        },
        getNameType(id) {
            if(id == null) return ''
            return this.listType.find(e => e.id == id).name
        },
        onToolTip(id, type) {
            if((type == this.checkType || this.checkType == null)) this.checkRow = !this.checkRow
            this.checkType = type
            this.rowToolTip = id
            this.getTransaction()
        },
        getOrderBy(orderType) {
            this.orderType = orderType
            this.objData.orderType = this.orderType;
            this.saveSearchApplication(this.objData)
            this.getList();
        },
        searchApplication() {
            this.objData.branchId = this.objData.branchId || null;
            this.objData.employerId = this.objData.employerId || null;
            this.objData.minSalary = this.objData.minSalary || null;
            this.objData.maxSalary = this.objData.maxSalary || null;
            this.objData.provinceId = this.objData.provinceId || null;
            this.objData.districtId = this.objData.districtId || null;
            this.objData.stationIds = this.objData.stationIds || [];
            this.saveSearchApplication(this.objData)
            this.getList(1)
        },
        getDataBranch() {
            this.objDataBranch.employerId = this.objData.employerId
            this.getBranch(this.objDataBranch).then(res => {
                this.listBranch = res.data;
            }).catch(err => {
                this.$error(err.message);
            })
        },
        getTransaction() {
            let obj = {}
            obj.relatedIds = this.rowToolTip
            obj.type = this.checkType
            this.getListTransaction(obj)
                .then((res) => {
                    this.listTransaction = (res.data && res.data.length) ? res.data[0] : null;
                })
                .catch(err => {
                    this.$error(err.message);
                })
        },
        redirectTransaction(id) {
            return this.$router.push({path:'/transaction', query: {id: id} })
        },
        getList(index) {
            if (index) {
                this.objData.pageIndex = index;
            }
            this.loading = true;
            this.objData.pageSize = 10;
            if (this.vuexTab.checktab) this.objData.staties = this.vuexTab.status
            else delete this.objData.staties 
            this.getListApplicationPost(this.objData)
                .then((respon) => {
                    this.loading = false;
                    this.listApply = respon.data
                    this.listApply.map(e => {
                        e.nearStation = e.employerPost.stations
                        e.salary = e.employerPost.salary
                        e.title = e.employerPost.title
                        e.applicantName = e.candidate ? e.candidate.fullName : ''
                        e.residentName = e.candidate ? e.candidate.residentName : ''
                        e.candidateStations = (e.candidate && e.candidate.address && e.candidate.address.stations && e.candidate.address.stations.length) ? e.candidate.address.stations : []
                        e.location = e.employerPost.branchName
                    })
                    this.applyCount = respon.totalRow
                })
                .catch(err => {
                    this.loading = false;
                    this.$error(err.message);
                })
        },
        remoteMember(value) {
            if (value !== '') {
                setTimeout(() => {
                    this.objDataMember.searchKeyword = value.trim();
                    this.getDataMember();
                }, 200);
            } else {
                this.objDataMember.searchKeyword = '';
            }
        },
        getDataMember(employerId) {
            if(employerId) this.objDataMember.id = employerId;
            this.getListEmployerMember(this.objDataMember).then(res => {
                this.listMember = res.data;
            }).catch(err => {
                this.$error(err.message);
            })
        },
        disabledDueDate(time) {
            return time.getTime() < Date.parse(this.objData.startDate)
        },

        getDistrict() {
            let dataSearch = Object.assign({}, this.objLocation);
            dataSearch.provinceId = this.objData.provinceId || -1;
            this.searchListDistrict(dataSearch)
                .then((respon) => {
                    this.listDistricts = respon.data
                    this.objData.districtId = this.listDistricts.find(i => i.id == this.objData.districtId) ? this.objData.districtId : null
                }).catch((error) => {
                    this.$error(error.message);
                })
        },
        getStation() {
            let dataSearch = Object.assign({}, this.objLocation);
            dataSearch.provinceId = this.objData.provinceId || -1;
            this.searchListStation(dataSearch)
            .then((res) => {
                this.listStations = res.data;
                this.objData.stationIds = this.listStations.map(i=> i.id).some(v=> this.objData.stationIds.indexOf(v) !== -1) ? this.objData.stationIds : []
            }).catch((error) => {
            this.$error(error.message);
            })
        },
        gettab() {
            this.vuexTab.checktab = !this.vuexTab.checktab
            this.getList(1)
        },
        filterStatus(id) {
            this.listTab.map(e => {
                e.css = 'deactive'
            })
            this.listTab.find(e => e.status == id).css = 'active'
        },
        clickTab(item) {
            this.listTab.map(e => {
                e.css = 'deactive'
            })
            this.listTab[item].css = 'active'
            this.vuexTab.status = this.listTab[item].status
            this.getList(1)
        },
        // change page by pagination
        pageChange(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            this.getList();
        },
        // transfer detail apply
        redirect(id) {

            this.$router.push({
                path: '/application/detail',
                query: {
                    id: id,
                }
            });
        }
    },
    mounted() {
        this.objData = {...this.objSearchApplication}
        if(this.objData.employerId) this.getDataMember(this.objData.employerId)
        this.vuexTab = this.tabApplication
        this.filterStatus(this.vuexTab.status)
        this.getList(1);
    },
}
</script>

<style scoped>
tbody tr:hover {
    background: #F6FAFD;
}

.check-size-small input[type="checkbox"] {
    display: none;
}

.form-checkbox.check-size-small {
    margin-bottom: 0px;
}

.form-checkbox.check-size-small span {
    padding: 0;
    height: 17px;
    width: 17px;
    display: block
}

.form-checkbox.check-size-small span::before,
.form-checkbox.check-size-small input[type="checkbox"]:checked+span:after {
    width: 17px;
    height: 17px;
    line-height: 17px;
}

.width-120 {
    width: 120px !important;
}

.nowrap-row {
    white-space: nowrap;
}

table p {
    margin-bottom: 0px;
}

.width-title {
    width: 200px;
}

.width-loca {
    width: 200px;
}
.table td a {
    color: #222328;
}
</style>
