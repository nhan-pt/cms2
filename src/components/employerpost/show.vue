<template>
        <div v-if="objDataJobPost" class="template w-100 bg-white position-relative">
            <div class="d-flex align-items-center template-title ">
                <i class="fas fa-bars mr-20"></i>
                <p class="m-0">{{$i('cms_job_post_detail_title')}}</p>
            </div>
            <div class="template-content">  
                <div class="panelhead-candidate__ha_back mb-3">
                  <div class="list-btn__ha">
                      <div class="item-btn">
                      <a href="javascript:;" class="text-links bg-purple" @click="edit">
                          {{$i('Edit')}} </a>
                      </div>
                      <div class="item-btn">
                      <a href="javascript:;" class="text-links bg-f53345" @click="deleteEvent">
                          {{$i('Delete')}} </a>
                      </div>
                      <div class="item-btn">
                      <a href="javascript:;" class="text-links btn-cancels" @click="back">
                          {{$i('Cancel')}} </a>
                      </div>
                </div>
              </div>
                <div class="row d-flex justify-content-between mb-4">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <button v-if="(objDataJobPost.status!=ACTIVE && objDataJobPost.status!=EXPIRED)" class=" btn-publish bg-darkgreen" @click="updateStatus">{{$i('publish_this_job_post')}}</button>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <button class=" btn-publish bg-orange"  @click="sameJob">{{$i('create_a_same_jobpost')}}</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <ul class="nav nav-tabs job-post-tabs">
                            <li v-for="(e,i) in listTab" class="fit-width">
                              <a data-toggle="tab" @click="clickTab(i)" :class="e.status=='active' ? 'active':''">{{$i(e.label)}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="tab-content ">
                    <div v-if="tabActive == 'basic_information'" id="basic-info" class="tab-pane fade show active">
                        <form action="#" class="mb-4">
                            <div class="container-fluid mb-4">
                                <div class="row  basic-row">
                                    <div
                                      class="col-3  border-right-1">
                                        <div class="d-flex justify-content-between flex-wrap p-20-0">
                                            <div>{{$i('cms_job_post_title')}}</div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="p-20-0">
                                            <p>{{objDataJobPost.title}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row basic-row">
                                    <div
                                      class="col-3  border-right-1">
                                        <div class="d-flex justify-content-between align-items-center flex-wrap p-20-0">
                                            <div>{{$i('cms_job_post_input_search_location')}}</div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="p-20-0">
                                            <p>{{objDataJobPost.branchName}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row basic-row ">
                                    <div
                                      class="col-3  border-right-1">
                                        <div class="d-flex justify-content-between align-items-center flex-wrap p-20-0">
                                            <div>{{$i('cms_job_post_work_place')}}</div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="job-detail p-20-0">

                                            <div class="row">
                                              <div class="col-4">
                                                {{$i('Zipcode')}}:
                                                <span class="text-normal">{{objDataJobPost.zipCode}}</span>
                                              </div>
                                              <div class="col-8">
                                                {{$i('prefectures')}}:
                                                <span class="text-normal">{{objDataJobPost.provinceName}}</span>
                                              </div>
                                            </div>
                                            <div class="row">
                                              <div class="col-4">
                                                {{$i('city')}}:
                                                <span class="text-normal">{{objDataJobPost.districtName}}</span>
                                              </div>
                                              <div class="col-4">
                                                {{$i('Village')}}:
                                                  <span class="text-normal">{{objDataJobPost.townName}}</span>
                                              </div>
                                            </div>
                                            <div class="row">
                                              <div class="col-12">
                                                {{$i('Address')}}:
                                                <span class="text-normal">{{objDataJobPost.address}}</span>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row basic-row">
                                    <div
                                      class="col-3  border-right-1">
                                        <div class="d-flex justify-content-between flex-wrap p-20-0">
                                            <div>{{$i('cms_job_post_nearest_station')}}</div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="job-detail row p-20-0">
                                            <div class="col-12" v-for="(e,i) in objDataJobPost.stations" :key="i">
                                                <div class="row">
                                                    <div class="col-md-2">{{e.stationName}}</div>
                                                    <div class="col-md-3">{{e.trainLineName}}</div>
                                                    <div class="col-md-4" v-if="e.description">{{e.description}} {{$i('cms_minutes_walk')}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row basic-row">
                                    <div
                                      class="col-3 border-right-1">
                                        <div class="d-flex justify-content-between flex-wrap p-20-0">
                                            <div>{{$i('JobType')}}</div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="p-20-0">
                                            <p>{{objDataJobPost.jobTypeName}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row  basic-row">
                                    <div
                                      class="col-3  border-right-1">
                                        <div class="d-flex justify-content-between flex-wrap p-20-0">
                                            <div>{{$i('job_description')}}</div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="p-20-0">
                                          <div v-html="objDataJobPost.description"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row  basic-row">
                                    <div
                                      class="col-3  border-right-1">
                                        <div class="d-flex justify-content-between flex-wrap p-20-0">
                                            <p>{{$i('cms_requirement_type')}}</p>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                      <div class="p-20-0">
                                        <div v-html="objDataJobPost.requirements"></div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-if="tabActive == 'cms_hiring_condition'" id="hiring-condition" class="tab-pane fade show active">
                      <form action="#" class="mb-4">
                        <div class="container-fluid mb-4">
                          <div class="row  basic-row">
                            <div
                              class="col-3 d-flex justify-content-between flex-wrap border-right-1">
                              <div class="p-20-0">
                                <div>{{$i('cms_recruitment_type')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="p-20-0 d-flex justify-content-between">
                                <p>{{objDataJobPost.jobModelName}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row basic-row">
                            <div
                              class="col-3 d-flex justify-content-between align-items-center flex-wrap border-right-1">
                              <div class="p-20-0">
                                <div>{{$i('cms_required_applicant_jp')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="p-20-0 d-flex justify-content-between">
                                <p>{{objDataJobPost.japaneseCertificationName}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row basic-row">
                            <div class="col-3 border-right-1">
                              <div class="p-20-0 d-flex justify-content-between align-items-center flex-wrap">
                                <div>{{$i('cms_recruitment_shift')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="job-detail p-20-0">
                                <div class="row" v-for="(e,i) in objDataJobPost.shiftJobInPosts" :key="i">
                                  <div class="col-3">
                                    <p>{{e.name}}</p>
                                  </div>
                                  <div class="col-9">
                                    <p>{{e.startWorking}} - {{e.endWorking}}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row basic-row">
                            <div
                              class="col-3 border-right-1">
                              <div class="p-20-0 d-flex justify-content-between flex-wrap">
                                <div>{{$i('cms_applied_days')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="job-detail row p-20-0" >
                                <div class="col-2" v-for="(e,i) in objDataJobPost.hiringDates" :key="i">
                                  <p>{{e.name}}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row basic-row">
                            <div
                              class="col-3 border-right-1">
                              <div class="d-flex justify-content-between flex-wrap p-20-0">
                                <div>{{$i('cms_working_day')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="p-20-0">
                                <p>{{objDataJobPost.workingDayName}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row basic-row">
                            <div
                              class="col-3 border-right-1">
                              <div class="p-20-0 d-flex justify-content-between flex-wrap">
                                <div>{{$i('cms_working_hour_per_day')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="p-20-0">
                                <p>{{objDataJobPost.workingHourPerDay}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row basic-row">
                            <div
                              class="col-3 border-right-1">
                              <div class="d-flex justify-content-between flex-wrap p-20-0">
                                <div>{{$i('cms_post_job_salary')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="p-20-0">
                                <div class="job-detail">
                                  <div>
                                    <label class="text-normal">
                                      {{objDataJobPost.salaryTypeName}} {{formatPrice(objDataJobPost.salary)}} {{$i('yenOrMore')}}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row  basic-row">
                            <div
                              class="col-3 d-flex justify-content-between flex-wrap border-right-1">
                              <div class="p-20-0">
                                <div>{{$i('cms_post_job_payment_method')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="p-20-0">
                                <div class="job-detail d-flex justify-content-between">
                                  <label for="" class="text-normal">
                                    {{objDataJobPost.paymentMethodName}}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row  basic-row">
                            <div
                              class="col-3 d-flex justify-content-between flex-wrap border-right-1">
                              <div class="p-20-0">
                                <div>{{$i('cms_post_job_benifit')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="p-20-0 d-flex justify-content-between">
                                <p>{{objDataJobPost.regimes.map(i=>i.name).join(' , ')}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row  basic-row">
                            <div
                              class="col-3 d-flex justify-content-between flex-wrap border-right-1">
                              <div class="p-20-0">
                                <div>{{$i('Tag')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="p-20-0 d-flex justify-content-between">
                                <p>{{objDataJobPost.tags}}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div v-if="tabActive == 'cms_interview_setting'" id="interview-setting" class="tab-pane fade show active">
                        <form action="#" class="mb-4">
                        <div class="container-fluid mb-4">
                          <div class="row  basic-row">
                            <div
                              class="col-3 border-right-1">
                              <div class="p-20-0 d-flex justify-content-between align-items-center flex-wrap">
                                <div>{{$i('cms_job_post_interview_place')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="job-detail p-20-0">
                                  <div class="row">
                                    <div class="col-4">
                                      {{$i('Zipcode')}}:
                                      <span class="text-normal">{{interviewInformation.zipCode}}</span>
                                    </div>
                                    <div class="col-8">
                                      {{$i('prefectures')}}:
                                      <span class="text-normal">{{interviewInformation.provinceName}}</span>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-4">
                                      {{$i('city')}}:
                                      <span class="text-normal">{{interviewInformation.districtName}}</span>
                                    </div>
                                    <div class="col-4">
                                      {{$i('Village')}}:
                                      <span class="text-normal">{{interviewInformation.townName}}</span>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-12">
                                      {{$i('Address')}}:
                                      <span class="text-normal">{{interviewInformation.address}}</span>
                                    </div>
                                  </div>
                              </div>
            
                            </div>
                          </div>
                          <div class="row basic-row">
                            <div
                              class="col-3  border-right-1">
                              <div class="d-flex justify-content-between flex-wrap p-20-0">
                                <div>{{$i('cms_job_post_nearest_station')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="job-detail row p-20-0">
                                <div class="col-12" v-for="(e,i) in interviewInformation.stations" :key="i">
                                  <div class="row">
                                    <div class="col-md-2">{{e.trainStationName}}</div>
                                    <div class="col-md-3">{{e.trainLineName}}</div>
                                    <div class="col-md-4"  v-if="e.description">{{e.description}} {{$i('cms_minutes_walk')}}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row  basic-row">
                            <div
                              class="col-3  border-right-1">
                              <div class="d-flex justify-content-between align-items-center flex-wrap p-20-0">
                                <div>{{$i('cms_interview_schedule')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="job-detail p-20-0 row">
                                <div class="col-12" v-for="(e,i) in interviewInformation.interviewScheduleSuggests" :key="i+e.id">
                                  <div class="row">
                                    <div class="col-md-2">{{e.name}}</div>
                                    <div class="col-md-4">{{e.startHour}}</div>
                                    <div class="col-md-2">{{$i('cms_to')}}</div>
                                    <div class="col-md-4">{{e.endHour}}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row basic-row">
                            <div
                              class="col-3 d-flex justify-content-between flex-wrap border-right-1">
                              <div class="p-20-0">
                                <div>{{$i('cms_interview_note')}}</div>
                              </div>
                            </div>
                            <div class="col-9">
                              <div class="p-20-0">
                                <div> {{interviewInformation.interviewNote}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div v-if="tabActive == 'cms_posting'" id="posting" class="tab-pane fade show active">
                      <form action="#" class="mb-4">
                        <div class="container-fluid mb-4">
                        <div class="row basic-row">
                          <div
                            class="col-3 border-right-1">
                            <div class="d-flex justify-content-between flex-wrap p-20-0">
                              <div>{{$i('cms_photo')}}</div>
                            </div>
                          </div>
                          <div class="col-9">
                            <div class="row p-20-0">
                              <div class="col">
                                <div class="mb-2 text-right">
                                  <a href="#" class="border-0">
                                    <i class="i fas fa-edit"></i>
                                  </a>
                                </div>
                                <div class="upload-block">
                                  <div class="upload-image" v-for="(e,i) in objDataJobPost.employerPostImages" :key="e.id">
                                    <img :src="e.image">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row basic-row">
                          <div
                            class="col-3 border-right-1">
                            <div class="d-flex justify-content-between flex-wrap p-20-0">
                              <div>{{$i('cms_job_post_posting_period ')}}</div>
                            </div>
                          </div>
                          <div class="col-9">
                            <div class="row p-20-0">
                              <div class="col-6">
                                <label for="" class="text-normal">{{$i('cms_posting_date')}}</label>
                                  {{formatDate(objDataJobPost.startDate)}}
                              </div>
                              <div class="col-6">
                                <label for="" class="text-normal">{{$i('cms_closing_date')}}</label>
                                {{formatDate(objDataJobPost.endDate)}}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row basic-row">
                          <div
                            class="col-3 d-flex justify-content-between flex-wrap border-right-1">
                            <div class="p-20-0">
                              <div>{{$i('cms_job_post_status')}}</div>
                            </div>
                          </div>
                          <div class="col-9">
                            <div class="row p-20-0">
                              <div class="col-6" v-for="e in listStatus" v-if="e.id == objDataJobPost.status">
                                  {{$i(e.status)}}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </form>
                    </div>
                    <div class="row d-flex justify-content-between mb-4">
                      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <button v-if="(objDataJobPost.status!=ACTIVE && objDataJobPost.status!=EXPIRED)" class=" btn-publish bg-darkgreen" @click="updateStatus">{{$i('publish_this_job_post')}}</button>
                      </div>
                      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <button class=" btn-publish bg-orange" @click="sameJob">{{$i('create_a_same_jobpost')}}</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import {mapActions, mapGetters,} from 'vuex'
    import {
        EmployerPost
    } from '../../types/enum';
    export default {
        data() {
            return {
                listTab: [
                    {
                        label:'basic_information',
                        status: 'active'
                    },
                    {
                        label:'cms_hiring_condition',
                        status: 'deactive'
                    },
                    {
                        label:'cms_interview_setting',
                        status: 'deactive'
                    },
                    {
                        label: 'cms_posting',
                        status: 'deactive'
                    },
                    
                ],
                ACTIVE:EmployerPost.ACTIVE,
                EXPIRED:EmployerPost.EXPIRED,
                listStatus: [
                    {
                        id: EmployerPost.ACTIVE,
                        status: 'Active'
                    },
                    {
                        id: EmployerPost.INACTIVE,
                        status: 'cms_job_post_invalid'
                    },
                    {
                        id: EmployerPost.EXPIRED,
                        status: 'Expired'
                    },
                    {
                        id: EmployerPost.NONPOSTING,
                        status: 'Non-posting'
                    }
                ],
                tabActive:'basic_information',
                dialogShowImage: false,
                imageShow: '',
                applyId: 3,
                listApply: null,
                interviewInformation: {},
                objDataJobPost: {
                    provinceId: 0,
                    districtId: 0,
                    stationId: 0,
                    shiftJobInPosts: [],
                    regimes: null,
                    tagIds: [],
                    censorship: null
                },
                activeName: 'ja',
                languages: null,
            }
        },
        watch: {
            applyId() {
                this.getListApply()
            }
        },
        computed: {
        },
        methods: {
            ...mapActions(['getDetailEmployerPost', 'listApplyEmployer', 'updateStatusDetailEmployerPost','deleteEmployerPost']),
            sameJob() {
                return this.$router.push('/employerpost/create-same/' + this.employerPostId);
            },
            back() {
              this.$router.push('/employerpost')
            },
            updateStatus() {
                let confirm = 'DoYouWantToChangeStatus'
                let dataSave = {
                    employerPostId: this.employerPostId,
                    status: EmployerPost.ACTIVE
                }
                this.$confirm(this.$i(confirm)).then(() => {
                    this.updateStatusDetailEmployerPost(dataSave)
                        .then((res) => {
                            if (res.success) {
                                this.$message(this.$i('Successful'));
                            }
                            this.getDetail();
                        })
                        .catch(err => {
                            this.$error(err.message);
                        })
                })
            },
            clickTab(item) {
                this.listTab.map(e => { e.status = 'deactive'})
                this.listTab[item].status = 'active'
                this.tabActive = this.listTab[item].label
            },
            edit() {
              return this.$router.push('/employerpost/edit/' + this.$route.params.id);
            },
            deleteEvent() {
                let id = this.$route.params.id
                this.$confirm(this.$i('DoYouWantDeleteEmployerPost')).then(() => {
                    this.deleteEmployerPost(id)
                        .then(() => {
                            this.$message(this.$i('Successful'));
                            return this.$router.push('/employerpost');

                        })
                        .catch(err => {
                            this.$error(err.message);
                        })
                })
            },
            getDetail() {
                let loading = this.$loading.show();
                this.getDetailEmployerPost({id: this.employerPostId})
                    .then(res => {
                        loading.hide();
                        this.objDataJobPost = res.data;
                        this.objDataJobPost.langs = this.objDataJobPost.langs.filter(i => i.languageCode != this.currentLanguage);
                        this.objDataJobPost.tags = Array.isArray(this.objDataJobPost.tags) ? this.objDataJobPost.tags.map(i => i.name).join(", ") : null;
                        this.employerPostImages = res.data.employerPostImages;
                        this.interviewInformation = this.objDataJobPost.interviewInformation
                        
                    })
                    .catch(err => {
                        loading.hide();
                        this.$error(err.message);
                    })
            },
            handleShowImage(image) {
                this.dialogShowImage = true;
                this.imageShow = image;
            },
            getListApply() {
                this.listApplyEmployer({
                    status: this.applyId,
                    id: this.employerPostId
                }).then(res => {
                    this.listApply = res;
                })
            },
            languageName(code) {
                if (!this.languages) return;
                return this.languages.filter(i => i.code == code)[0].name;
            },
        },
        mounted() {
            if (this.$route.params.id) {
                this.employerPostId = this.$route.params.id;
            }
            // this.getListApply();
            this.getDetail();
           
        }
    }
</script>

<style scoped>
    .employee-image .upload-drag-drop-image {
        width: 50px;
    }
    .table td, .table th { border: none !important; }
</style>
