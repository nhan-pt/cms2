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
                       :placeholder="$i('Member')">
                    <el-option
                        v-for="item in listMember"
                        :key="item.id"
                        :label="item.loginEmail"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <input class="form-control input-search-2" :placeholder="$i('cms_job_post_input_search_location')" v-model="objData.shopName" disabled="disabled">
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
                            <tr v-if="listApply.length" v-for="(v, k) in listApply" :key="k">
                                <td class="fixed-left-row">
                                    <a href="javascript:;" @click="redirect(v.employerPostId, v.memberId)">{{v.id}}</a>
                                    
                                </td>
                                <td>
                                    <div class="td-nowrap"  :title="formatDate(v.createdDate)">
                                        <a href="javascript:;" @click="redirect(v.employerPostId, v.memberId)">{{formatDate(v.createdDate)}}</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="td-nowrap" v-for="(e,i) in v.nearStation" :key=i>
                                        {{e.stationName}} - {{e.trainLineName}}
                                    </div>
                                </td>
                                <td>
                                    <div class="td-nowrap" :title="v.location">{{v.location}}</div>
                                </td>
                                <td>
                                    <div class="width-350 td-wrap" :title="v.title">{{v.title}}</div>
                                </td>
                                <td>
                                    <div class="text-right">{{formatPrice(v.salary)}}</div>
                                </td>
                                <td>
                                    <div class="td-nowrap">
                                        {{v.candidate.name}}
                                    </div>
                                </td>
                                <td>
                                    <div class="td-nowrap" v-for="(e,i) in v.candidateStations" :key="i">
                                        {{e.trainStationName}} - {{e.trainLineName}}
                                    </div>
                                </td>
                                <td>
                                    <div class="td-nowrap">
                                        {{v.residentName}}
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(e,i) in v.applyShiftJobInPosts" :key=i>
                                        {{e.name}} {{e.startWorking}}-{{e.endWorking}}
                                    </div>
                                </td>
                                <td>
                                    <div v-for="(e,i) in v.interviewSchedules" :key="i">
                                        {{formatDate(e.interviewDate)}} {{formatShift(e.startHour)}} - {{formatShift(e.endHour)}}
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
export default {
    components: {
        ElRemoteSearch: () => import('../_shared/el-search'),
        ExportDetail: () => import('./export'),
    },
    data() {
        return {
            checkAll: false,
            vuexTab: {
                checktab: true,
                status: 10,
            },
            orderType:'DESC',
            listTab: [{
                    status: 10,
                    label: 'Applied',
                    css: 'active'
                },
                {
                    status: 7,
                    label: 'Interview_setup',
                    css: 'deactive'
                },
                {
                    status: 11,
                    label: 'Hired',
                    css: 'deactive'
                },
                {
                    status: 12,
                    label: 'cms_applicant_reject ',
                    css: 'deactive'
                },
                {
                    status: 5,
                    label: 'pendding_update_info',
                    css: 'deactive'
                },
                {
                    status: 6,
                    label: 'waiting_confirm',
                    css: 'deactive'
                },
                {
                    status: 8,
                    label: 'Hide',
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
                status: []
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
        }
    },
    computed: {
        ...mapGetters(['province',  'objSearchApplication', 'tabApplication']),
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
        }
    },
    methods: {
        ...mapActions(['saveSearchApplication', 'saveTabApplication', 'deleteEmployerPost', 'getListApplicationPost', 'getListEmployerMember', 'searchListDistrict', 'searchListStation', 'searchTrainLine']),
        getOrderBy(orderType) {
            this.orderType = orderType
            this.objData.orderType = this.orderType;
            this.saveSearchApplication(this.objData)
            this.getList();
        },
        searchApplication() {
            this.objData.employerId = this.objData.employerId || null;
            this.objData.minSalary = this.objData.minSalary || null;
            this.objData.maxSalary = this.objData.maxSalary || null;
            this.objData.provinceId = this.objData.provinceId || null;
            this.objData.districtId = this.objData.districtId || null;
            this.objData.stationIds = this.objData.stationIds || [];
            this.saveSearchApplication(this.objData)
            this.getList(1)
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
                        e.location = e.employerPost.shopName
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
            return time.getTime() < this.objData.startDate
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
        redirect(employerPostId, candidateId) {

            this.$router.push({
                path: '/application/detail',
                query: {
                    employerPostId: employerPostId,
                    candidateId: candidateId
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
