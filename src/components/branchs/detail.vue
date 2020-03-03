<template>
<div class="" v-if="objBranch">
    <section class="group-content-candidate__ha">
        <div class="d-flex align-items-center template-title title__detail">
            <div class="header-detail d-flex align-items-center">
                <i class="fas fa-bars mr-20"></i>
                <p class="m-0">{{$i('cms_detail_branch')}}</p>
            </div>
        </div>
        <div class="panelhead-candidate__ha_back">
            <div class="list-btn__ha">
                <div class="item-btn">
                    <a href="javascript:;" class="text-links bg-purple" @click="edit">
                    {{$i('Edit')}} </a>
                </div>
                <div class="item-btn">
                    <a href="javascript:;" class="text-links bg-f53345" @click="onDelete">
                    {{$i('Delete')}} </a>
                </div>
                <div class="item-btn">
                    <a href="javascript:;" class="text-links btn-cancels" @click="cancel">
                    {{$i('Cancel')}} </a>
                </div>
          </div>
        </div>
        <div class="employer__content mt-4">
          <div class="group-basicInfo-candidate border-frame border__top">
              <div class="group-row">
                  <div class="row">
                      <div class="col-3 border-right__ha">
                          <div class="content-candidate-left p-15">
                              <div class="name-title">{{$i('cms_employer_list_employer')}}</div>
                          </div>
                      </div>
                      <div class="col-9">
                          <div class="content-candidate-right p-y-15">
                              <div class="box-row rule justify-content-between">
                                  <div class="text-normal w-100">
                                      {{objBranch.employerCompanyName}}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="group-row">
                  <div class="row">
                      <div class="col-3 border-right__ha">
                          <div class="content-candidate-left p-15">
                              <div class="name-title">{{$i('cms_name_branch')}}</div>
                          </div>
                      </div>
                      <div class="col-9">
                          <div class="content-candidate-right p-y-15">
                              <div class="box-row rule justify-content-between">
                                  <div class="text-normal w-100">
                                      {{objBranch.name}}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="group-row">
                  <div class="row">
                      <div class="col-3 border-right__ha">
                          <div class="content-candidate-left p-15">
                              <div class="name-title">{{$i('cms_photo')}}</div>
                          </div>
                      </div>
                      <div class="col-9">
                          <div class="content-candidate-right p-y-15">
                              <div class="upload-block fix-img-job row mb-3 ml-1">
                                  <div class="upload-image" v-for="(image, index) in objBranch.images" :key="'image' +index">
                                    <img :src="image.image" :alt="image.image">
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="group-row">
                  <div class="row">
                      <div class="col-3 border-right__ha">
                          <div class="content-candidate-right p-15">
                              <div class="name-title">{{$i('Address')}}</div>
                          </div>
                      </div>
                      <div class="col-9">
                          <div class="content-candidate-right p-y-15" v-if="objBranch && objBranch.address">
                              <div class="row mb-3">
                                  <div class="col-6">
                                      <div class="group-rule-text">
                                          <div class="name-title">{{$i('Zipcode')}}:</div>
                                          <div class="name-value w-100 d-flex align-items-center">
                                            {{objBranch.address.zipCode}}
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="group-rule-text">
                                          <div class="name-title">{{$i('prefectures')}}:</div>
                                          <div class="name-value w-100">
                                              {{objBranch.address.provinceName}}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="row mb-3">
                                  <div class="col-6">
                                      <div class="group-rule-text">
                                          <div class="name-title">{{$i('city')}}:</div>
                                          <div class="name-value w-100">
                                              {{objBranch.address.districtName}}
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="group-rule-text">
                                          <div class="name-title">{{$i('Village')}}:</div>
                                          {{objBranch.address.townName}}
                                      </div>

                                  </div>
                              </div>
                              <div class="row mb-3">
                                  <div class="col-12">
                                    <div class="group-rule-text">
                                      <div class="name-title">{{$i('Address')}}:</div>
                                      <div class="name-value w-100">
                                        {{objBranch.address.address}}
                                      </div>
                                    </div>
                                  </div>
                              </div>
                              <div class="row ">
                                  <div class="col-6">
                                      <div class="group-rule-text">
                                          <div class="name-title">{{$i('cms_tel_branch')}}:</div>
                                          <div class="name-value w-100">
                                            {{objBranch.mobile}}
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-6">
                                    <div class="group-rule-text">
                                      <div class="name-title">{{$i('cms_fax_branch')}}:</div>
                                      <div class="name-value w-100">
                                        {{objBranch.fax}}
                                      </div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="group-row">
                  <div class="row">
                      <div class="col-3 border-right__ha">
                        <div class="content-candidate-left p-15">
                          <div class="name-title">{{$i('employer_dashboard_nearest_station_table_2')}}</div>
                        </div>
                      </div>
                      <div class="col-9">
                          <div class="content-candidate-right Nearest p-y-15 w-100" v-if="objBranch.address">
                              <div class="row mb-3" v-for="(e,i) in objBranch.address.stations" :key=i>
                                  <div class="col">
                                      <div class="row">
                                          <div class="col-4">
                                              <div class="group-rule-text">
                                                  <div class="name-title w-100">
                                                      {{e.trainStationName}}
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="col-4">
                                              <div class="group-rule-text">
                                                  <div class="name-title w-100">
                                                      {{e.trainLineName}}
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="col-4">
                                              <div class="group-rule-text">
                                                  <div class="name-title w-100" v-if="e.description">
                                                      {{$i('cms_walk_branch')}} {{e.description}} {{$i('cms_minute_branch')}}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
              <div class="group-row">
                  <div class="row">
                      <div class="col-3 border-right__ha">
                          <div class="content-candidate-left p-15">
                              <div class="name-title">{{$i('cms_email_branch')}}</div>
                          </div>
                      </div>
                      <div class="col-9">
                          <div class="content-candidate-right p-y-15">
                              <div class="box-row rule justify-content-between">
                                  <div class="text-normal w-100">
                                      {{objBranch.email}}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="group-row">
                  <div class="row">
                      <div class="col-3 border-right__ha">
                          <div class="content-candidate-left p-15">
                              <div class="name-title">{{$i('cms_description_branch')}}</div>
                          </div>
                      </div>
                      <div class="col-9">
                          <div class="content-candidate-right p-y-15">
                              <div class="box-row rule justify-content-between">
                                  <div class="text-normal w-100" v-html="objBranch.description">
                                    
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="group-row">
                  <div class="row">
                      <div class="col-3 border-right__ha">
                          <div class="content-candidate-left p-15">
                              <div class="name-title">{{$i('cms_operating_time_branch')}}</div>
                          </div>
                      </div>
                      <div class="col-9">
                          <div class="content-candidate-right p-y-15">
                              <div class="justify-content-between">
                                  <div class="row">
                                      <div class="col-12 mb-3">
                                          <div class="row" v-if="objBranch.openFullDay">
                                            <div class="col-2">{{$i('cms_work_time_branch')}}: </div> 
                                            <div class="col-4">{{$i('cms_24_hours_open')}}</div>
                                          </div>
                                          <div v-else class="row">
                                            <div class="col-2">{{$i('cms_work_time_branch')}}: </div> 
                                            <div class="col-8" v-if="objBranch.openTime || objBranch.closeTime"> {{formatShift(objBranch.openTime)}} {{$i('cms_to_time')}} {{formatShift(objBranch.closeTime)}}</div>
                                          </div>
                                          
                                      </div>
                                      <div class="col-12">
                                          <div class="row" v-if="objBranch.allDayOpen">
                                            <div class="col-2">{{$i('cms_date_time_branch')}}: </div>  
                                            <div class="col-8">{{$i('cms_always_open')}} </div>
                                          </div>
                                          <div v-else>
                                            <div class="row">
                                              <div class="col-2">{{$i('cms_date_time_branch')}}: </div>  
                                              <div class="col-8">
                                                <div class="row">
                                                  <div class="col-6">{{dateOffWeeks.toString()}}</div>  
                                                </div> 
                                                <div class="row" v-if="objBranch.publicHoliday">
                                                  <div class="col-6">{{$i('cms_public_holiday')}}</div>  
                                                </div>    
                                              </div>  
                                            </div>
                                          </div> 
                                         
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
              <div class="group-row">
                  <div class="row">
                      <div class="col-3 border-right__ha">
                          <div class="content-candidate-left p-15">
                              <div class="name-title">{{$i('cms_name_section')}}</div>
                          </div>
                      </div>
                      <div class="col-9">
                          <div class="content-candidate-right p-y-15">
                              <div class="box-row rule justify-content-between">
                                  <div class="row w-100">
                                      <div class="col-6" v-for="e in listSection" :key="e.id" v-if="e.id == objBranch.section">
                                         {{$i(e.name)}}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div class="panelhead-candidate__ha_back mt-4">
            <div class="list-btn__ha">
                <div class="item-btn">
                    <a href="javascript:;" class="text-links bg-purple" @click="edit">
                    {{$i('Edit')}} </a>
                </div>
                <div class="item-btn">
                    <a href="javascript:;" class="text-links bg-f53345" @click="onDelete">
                        {{$i('Delete')}} </a>
                </div>
                <div class="item-btn">
                    <a href="javascript:;" class="text-links btn-cancels" @click="cancel">
                        {{$i('Cancel')}} </a>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {BranchSection} from '../../types/enum'

export default {
    data() {
        return {
            objBranch: null,
            dateOffWeeks: [],
            listSection: [
                {
                    id: BranchSection.PRIVATE,
                    name: 'employer_private'
                },
                {
                    id: BranchSection.PUBLIC,
                    name: 'employer_public'
                }
            ],
        }
    },
    computed: {
        ...mapGetters(['dateWeeks']),
    },
    methods: {
        ...mapActions(['getDetailBranch', 'deleteBranch']),
        onDelete() {
            this.$confirm(this.$i('employer_job_post_job_delete')).then(() => {
                this.deleteBranch(this.$route.params.id)
                    .then(res => {
                        this.$success(this.$i('Successful'));
                        this.cancel();
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            })
        },
        cancel() {
            return this.$router.push('/branch');
        },
        edit() {
            return this.$router.push('/branch/edit/' + this.$route.params.id);
        },
        getDetail() {
            let loading = this.$loading.show();
            this.getDetailBranch(this.$route.params.id)
                .then(res => {
                    loading.hide();
                    this.objBranch = res.data;
                    this.objBranch.dayoffIds = this.objBranch.dayoffIds ? this.objBranch.dayoffIds.split(',') : [];
                    if(this.objBranch && this.objBranch.dayoffIds.length) {
                        this.objBranch.dayoffIds.map(e => {
                            this.dateWeeks.map(i => {
                            if (i.id == parseInt(e)) this.dateOffWeeks.push(i.name)
                            })
                        })
                    }
                })
                .catch(err => {
                    loading.hide();
                    this.$error(err.messages);
                })
        },

    },
    created() {
        this.getDetail();
    }
}
</script>

<style scoped>

</style>
