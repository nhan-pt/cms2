<template>
<div class="template w-100 bg-white position-relative">
    <div class="d-flex align-items-center template-title ">
        <i class="fas fa-bars mr-20"></i>
        <p class="m-0">{{$i('cms_job_edit_post')}}</p>
    </div>
    <div class="template-content">
        <div class="row mb-4">
            <div class="col">
                <ul class="nav nav-tabs job-post-tabs">
                    <li v-for="(e,i) in listTab" :key="e.id">
                        <a data-toggle="tab" class="text-bold" :class="{ 'active': e.status == 'active'}">{{$i(e.label)}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab-content ">
            <div v-if="currentTab.tabId == 1" id="basic-info" class="tab-pane fade show active">
                <div class="row">
                    <div class="col">
                        <div class="section-title bg-orange p-10-15 text-white weight-600">
                            {{$i('basic_information')}}
                        </div>
                    </div>
                </div>
                <basicInfo 
                 v-model="objDataJobPost"
                :sameLocation="sameLocation" 
                 @dataBasicInfo="getDataBasicInfo" 
                 @nextTab="nextTab" 
                 @confirmTab="clickTab(5)">
                </basicInfo>
            </div>
            <div v-if="currentTab.tabId == 2" class="tab-pane fade show active">
                <div class="row">
                    <div class="col">
                        <div class="section-title bg-orange p-10-15 text-white weight-600">
                            {{$i('cms_job_post_detail_hiring_condition')}}
                        </div>
                    </div>
                </div>
                <hiringCondition 
                 v-model="objDataJobPost" 
                 @nextTab="nextTab" 
                 @previousTab="previousTab" 
                 @confirmTab="clickTab(5)"/>
            </div>
            <div v-if="currentTab.tabId == 3" class="tab-pane fade show active">
                <div class="row">
                    <div class="col">
                        <div class="section-title bg-orange p-10-15 text-white weight-600">
                            {{$i('cms_job_post_detail_interview_setting')}}
                        </div>
                    </div>
                </div>
                <interviewSetting 
                 v-model="objDataJobPost" 
                 @dataInterview="getlistDataInterview" 
                 @previousTab="previousTab" 
                 @nextTab="nextTab" 
                 @confirmTab="clickTab(5)" />
            </div>
            <div v-if="currentTab.tabId == 4" class="tab-pane fade show active">
                <div class="row">
                    <div class="col">
                        <div class="section-title bg-orange p-10-15 text-white weight-600">
                            {{$i('cms_posting')}}
                        </div>
                    </div>
                </div>
                <posting v-model="objDataJobPost" @previousTab="previousTab" @confirmTab="clickTab(5)" />
            </div>
            <div v-if="currentTab.tabId == 5" class="tab-pane fade show active">
                <confirm v-model="objDataJobPost" :listDataBasicInfo="listDataBasicInfo" :listDataInterview="listDataInterview" @save="edit" @tab="editTab" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
} from 'vuex'
import _ from "lodash"
export default {
    data() {
        return {
            currentTab: {
                tabId: 1,
                label: 'basic_information'
            },
            listTab: [{
                    tabId: 1,
                    label: 'basic_information',
                    status: 'active'
                },
                {
                    tabId: 2,
                    label: 'cms_hiring_condition',
                    status: 'deactive'
                },
                {
                    tabId: 3,
                    label: 'cms_job_post_detail_interview_setting',
                    status: 'deactive'
                },
                {
                    tabId: 4,
                    label: 'cms_posting',
                    status: 'deactive'
                },
                {
                    tabId: 5,
                    label: 'cms_confirmation',
                    status: 'deactive'
                }
            ],
            sameLocation: {
                zipCode: null,
                provinceId: null,
                districtId: null,
                address: null,
                townName: null,
                stations: [{
                    stationId: null,
                    description: '',
                }],

            },
            objDataJobPost: {
                status: 2,
                tagIds: [],
                regimeIds: [],
                salary: 0,
                stations: [{
                    stationId: null,
                    description: '',
                }],
                interviewInformation: {
                    districtId: null,
                    provinceId: null,
                    stations: [{
                        stationId: null,
                        description: ''
                    }],
                    interviewScheduleSuggests: [{
                        interviewDateId: 0,
                        startHour: null,
                        endHour: null
                    }],
                },
                districtId: null,
                provinceId: null,
                address: '',
                townName: '',
                employerPostImages: [],
                postHiringDateIds: [],
                shiftJobInPosts: [{
                    shiftJobId: null,
                    startWorking: null,
                    endWorking: null
                }],
            },
            listDataInterview: null,
            listDataBasicInfo: null
        }
    },
    components: {
        basicInfo: () => import('./add/basic-infor'),
        hiringCondition: () => import('./add/hiring-condition'),
        interviewSetting: () => import('./add/interview-setting'),
        posting: () => import('./add/posting'),
        confirm: () => import('./add/confirm'),
    },
    methods: {
        ...mapActions(['saveEditEmployerPost', 'getDetailEmployerPost', 'saveAddEmployerPost']),
        editTab(tab) {
            this.clickTab(tab);
        },
        getDataBasicInfo(value) {
            this.listDataBasicInfo = value;
        },
        getlistDataInterview(value) {
            this.listDataInterview = value
        },
        clickTab(item) {
            this.listTab.map(e => {
                e.status = 'deactive'
                if (e.tabId != item) return;
                else {
                    e.status = 'active'
                    this.currentTab = e
                }
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            })
        },
        nextTab() {
            let futureTab = this.currentTab.tabId + 1
            if (this.currentTab.tabId < this.listTab.length) {
                this.clickTab(futureTab);
            }
        },
        previousTab() {
            let futureTab = this.currentTab.tabId - 1
            if (this.currentTab.tabId > 1) {
                this.clickTab(futureTab);
            }
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        edit() {
            let dataAdd = {
                ...this.objDataJobPost
            };
            let checkInsert = true;
            dataAdd.shiftJobInPosts = dataAdd.shiftJobInPosts.filter(e => e.shiftJobId > 0)
            dataAdd.interviewInformation.interviewScheduleSuggests = dataAdd.interviewInformation.interviewScheduleSuggests.filter(e => e.interviewDateId > 0)
            dataAdd.interviewInformation.stations = dataAdd.interviewInformation.stations.filter(e => e.stationId > 0)
            let listObj = ['branchId', 'memberId', 'title', 'description', 'provinceId', 'districtId', 'zipCode', 'address', 'workingDayId', 'salary', 'salaryTypeId', 'endDate', 'startDate']
            let listArray = ['stations', 'shiftJobInPosts', 'employerPostImages']
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            let textError = ''
            for (let i of listObj) {
                if (!_.get(dataAdd, i)) {
                    checkInsert = false
                    textError = i + '_is_required'
                    break;
                }
            }
            if (!checkInsert) {
                for (let i of listArray) {
                    if (!_.get(dataAdd, i).length) {
                        checkInsert = false
                        textError = i + '_is_required'
                        break;
                    }
                }
            }
            if (!checkInsert) {
                this.$message(this.$i(textError), 'error');
            } else if (new Date(dataAdd.endDate).getTime() - today.getTime() < 0) {
                this.$message(this.$i('creatdate_less_than_currentdate'), 'error');
            } else {
                let getApi = this.$route.params.id ? this.saveEditEmployerPost : this.saveAddEmployerPost
                dataAdd.interviewInformation.interviewScheduleSuggests = dataAdd.interviewInformation.interviewScheduleSuggests.filter(e => e.interviewDateId > 0)
                let loading = this.$loading.show();

                getApi(dataAdd).then((res) => {
                    if (res.success) {
                        this.$message(this.$i('Successful'));
                    }
                    loading.hide();
                    setTimeout(() => {
                        this.$router.push('/employerpost');
                    }, 1500)
                }).catch(err => {
                    this.$message(err.message, 'error');
                    loading.hide();
                })
            }
        },
        getDetail() {
            let getId = this.$route.params.id || this.$route.params.sameid
            this.getDetailEmployerPost({
                    id: getId
                })
                .then(res => {
                    let stations = [{
                        stationId: null,
                        description: '',
                    }];
                    let interviewScheduleSuggests = [{
                        interviewDateId: 0,
                        startHour: null,
                        endHour: null
                    }];
                    this.objDataJobPost = Object.assign({}, this.objDataJobPost, {
                        status: this.$route.params.sameid ? 2 : res.data.status,
                        employerPostId: res.data.id,
                        title: res.data.title,
                        memberId: res.data.memberId,
                        description: res.data.description,
                        requirements: res.data.requirements,
                        moneyForMove: res.data.moneyForMove,
                        endDate: this.formatDate(res.data.endDate),
                        startDate: this.formatDate(res.data.startDate),
                        zipCode: res.data.zipCode,
                        shopName: res.data.shopName,
                        paymentMethodId: res.data.paymentMethodId,
                        workingHourPerDay: res.data.workingHourPerDay,
                        jobModelId: res.data.jobModelId,
                        townName: res.data.townName,
                        jobTypeId: res.data.jobTypeId,
                        workingDayId: res.data.workingDayId,
                        japaneseCertificationId: res.data.japaneseCertificationId,
                        locationLat: res.data.locationLat,
                        locationLong: res.data.locationLong,
                        companyName: res.data.companyName,
                        salaryTypeId: res.data.salaryTypeId,
                        tagIds: res.data.tags.map(e => e.id),
                        salary: res.data.salary,
                        stations: res.data.stations.length ? res.data.stations : stations,
                        districtId: res.data.districtId,
                        branch: res.data.branchId,
                        branchId: res.data.branchId,
                        sameAddress: res.data.sameAddress ? res.data.sameAddress : false,
                        address: res.data.address,
                        provinceId: res.data.provinceId,
                        postHiringDateIds: res.data.hiringDates.map(e => e.id),
                        regimeIds: res.data.regimes.map(e => e.id),
                        employerPostImages: res.data.employerPostImages.map(e => e.image),
                        interviewInformation: {
                            sameAddress: res.data.sameAddress ? res.data.sameAddress : false,
                            interviewNote: res.data.interviewInformation.interviewNote,
                            zipCode: res.data.interviewInformation.zipCode,
                            lat: res.data.interviewInformation.lat,
                            long: res.data.interviewInformation.long,
                            address: res.data.interviewInformation.address,
                            townName: res.data.interviewInformation.townName,
                            districtId: res.data.interviewInformation.districtId,
                            provinceId: res.data.interviewInformation.provinceId,
                            stations: (res.data.interviewInformation.stations && res.data.interviewInformation.stations.length) ? res.data.interviewInformation.stations : stations,
                            interviewScheduleSuggests: (res.data.interviewInformation.interviewScheduleSuggests && res.data.interviewInformation.interviewScheduleSuggests.length) ? res.data.interviewInformation.interviewScheduleSuggests : interviewScheduleSuggests
                        },
                        shiftJobInPosts: res.data.shiftJobInPosts
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.$error(err.message);
                })
        },
    },
    created() {
        if (this.$route.params.id || this.$route.params.sameid) {
            this.getDetail();
        }
    }
}
</script>

<style>
.employee-image .upload-drag-drop-image {
    width: 50px;
}
</style>
