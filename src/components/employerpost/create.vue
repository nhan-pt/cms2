<template>
    <div class="template w-100 bg-white position-relative">
        <div class="d-flex align-items-center template-title ">
            <i class="fas fa-bars mr-20"></i>
            <p class="m-0">{{$i('cms_job_create_post')}}</p>
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
                    <basicInfo v-model="objData" @dataBasicInfo="getDataBasicInfo" @nextTab="nextTab" @confirmTab="clickTab(5)">
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
                    <hiringCondition v-model="objData" @nextTab="nextTab" @previousTab="previousTab" @confirmTab="clickTab(5)"/>
                </div>
                <div v-if="currentTab.tabId == 3" class="tab-pane fade show active">
                    <div class="row">
                        <div class="col">
                            <div class="section-title bg-orange p-10-15 text-white weight-600">
                                {{$i('cms_job_post_detail_interview_setting')}}
                            </div>
                        </div>
                    </div>
                    <interviewSetting v-model="objData" @dataInterview="getlistDataInterview" @previousTab="previousTab" @nextTab="nextTab" @confirmTab="clickTab(5)"/>
                </div>
                <div v-if="currentTab.tabId == 4" class="tab-pane fade show active">
                    <div class="row">
                        <div class="col">
                            <div class="section-title bg-orange p-10-15 text-white weight-600">
                                {{$i('cms_posting')}}
                            </div>
                        </div>
                    </div>
                    <posting v-model="objData" @previousTab="previousTab" @confirmTab="clickTab(5)"/>
                </div>
                <div v-if="currentTab.tabId == 5" class="tab-pane fade show active">
                    <confirm v-model="objData" :listDataBasicInfo="listDataBasicInfo" @save="add" :listDataInterview="listDataInterview" @tab="editTab" />
                </div>
            </div>
            
            <!--   list button in footer   -->
        
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
                listTab: [
                    {
                        tabId: 1,
                        label:'basic_information',
                        status: 'active'
                    },
                    {
                        tabId: 2,
                        label:'cms_hiring_condition',
                        status: 'deactive'
                    },
                    {
                        tabId: 3,
                        label:'cms_job_post_detail_interview_setting',
                        status: 'deactive'
                    },
                    {
                        tabId: 4,
                        label:'cms_posting',
                        status: 'deactive'
                    },
                    {
                        tabId: 5,
                        label:'cms_confirmation',
                        status: 'deactive'
                    }
                ],
                objData: {
                    status: 2,
                    tagIds: [],
                    regimeIds: [],
                    description: '',
                    salary: 0,
                    workingDayId: null,
                    stations: [
                        {
                            stationId: null,
                            description: '',
                        }
                    ],
                    interviewInformation: {
                        districtId: null,
                        provinceId: null,
                        stations: [
                            {
                                stationId: null,
                                description: ''
                            }
                        ],
                        interviewScheduleSuggests:[
                            {
                                interviewDateId: 0,
                                startHour: null,
                                endHour: null
                            }
                        ],
                    },
                    zipCode: null,
                    districtId: null,
                    provinceId: null,
                    address:'',
                    townName: '',
                    employerPostImages: [],
                    postHiringDateIds: [],
                    shiftJobInPosts: [
                        {
                            shiftJobId: null,
                            startWorking: null,
                            endWorking: null
                        }
                    ],
                },
                listDataInterview: null,
                listDataBasicInfo: null,
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
            ...mapActions(['saveAddEmployerPost']),
            changeTab(tab) {
                this.nextTab()
            },
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
            add() {
                let dataAdd = {...this.objData};
                let checkInsert = true;
                dataAdd.shiftJobInPosts = dataAdd.shiftJobInPosts.filter(e => e.shiftJobId > 0)
                dataAdd.interviewInformation.interviewScheduleSuggests = dataAdd.interviewInformation.interviewScheduleSuggests.filter(e => e.interviewDateId > 0)
                dataAdd.interviewInformation.stations = dataAdd.interviewInformation.stations.filter(e => e.stationId > 0)
                
                let listObj = ['shopName', 'memberId', 'title', 'description', 'provinceId', 'districtId', 'zipCode', 'address', 'workingDayId', 'salary', 'salaryTypeId', 'endDate', 'startDate']
                let listArray = ['stations', 'shiftJobInPosts', 'employerPostImages']
                let textError = ''
                for(let i of listObj ) {
                    if (!_.get(dataAdd, i)) {
                        checkInsert = false;
                        textError = i + '_is_required'
                        break;
                    }
                }
                if(!checkInsert) {
                    for(let i of listArray ) {
                        if (!_.get(dataAdd, i).length) {
                            checkInsert = false;
                            textError = i + '_is_required'
                            break;
                        }
                    }
                }
                if(!checkInsert) {
                    this.$message(this.$i(textError),'error');
                }else{
                    let loading = this.$loading.show();
                    this.saveAddEmployerPost(dataAdd).then((res) => {
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
            }
        },
    }
</script>

<style>
    .employee-image .upload-drag-drop-image {
        width: 50px;
    }
</style>