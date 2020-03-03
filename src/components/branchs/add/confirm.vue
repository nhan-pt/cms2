<template>
<div class="" v-if="this.objCreateBranch">
        <section class="group-content-candidate__ha">
            <div class="d-flex align-items-center template-title ">
                <i class="fas fa-bars mr-20"></i>
                <p class="m-0">{{$i('cms_employer_creat_or_edit')}}</p>
            </div>
            <div class="group-btn-header__ha my-4">
                <div class="list-btn__ha">
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-text" @click="back">
                            {{$i('employer_forgot_pass_back')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-green" @click="save">
                            {{$i('Save')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links btn-cancels" @click="cancel">
                            {{$i('employer_job_post_job_edit_job_cancel')}} </a>
                    </div>
                </div>
            </div>
            <div class="employer__content">
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
                                            {{objCreateBranch.companyName}}
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
                                            {{objCreateBranch.name}}
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
                                        <div class="upload-image" v-for="(image, index) in objCreateBranch.images" :key="'image' +index">
                                            <img :src="image" :alt="image">
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
                                <div class="content-candidate-right p-y-15" v-if="objCreateBranch.address">
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Zipcode')}}:</div>
                                                <div class="name-value w-100 d-flex align-items-center">
                                                    {{objCreateBranch.address.zipCode}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('prefectures')}}:</div>
                                                <div class="name-value w-100">
                                                    {{provinceName}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('city')}}:</div>
                                                <div class="name-value w-100">
                                                    {{districtName}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Village')}}:</div>
                                                {{objCreateBranch.address.townName}}
                                            </div>

                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-12">
                                            <div class="group-rule-text">
                                            <div class="name-title">{{$i('Address')}}:</div>
                                            <div class="name-value w-100">
                                                {{objCreateBranch.address.address}}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_tel')}}:</div>
                                                <div class="name-value w-100">
                                                    {{objCreateBranch.mobile}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                            <div class="name-title">{{$i('cms_employer_create_fax')}}:</div>
                                            <div class="name-value w-100">
                                                {{objCreateBranch.fax}}
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

                                <div class="content-candidate-right Nearest p-y-15 w-100" v-if="objCreateBranch.address">
                                    <div class="row mb-3" v-for="(e,i) in objCreateBranch.address.stations" :key=i>
                                        <div class="col">
                                            <div class="row">
                                                <div class="col-4">
                                                    <div class="group-rule-text">
                                                        <div class="name-title w-100"  v-if="e.stationId && getStationValue(e.stationId)">
                                                            {{getStationValue(e.stationId).name}}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="group-rule-text">
                                                        <div class="name-title w-100" v-if="e.stationId && getStationValue(e.stationId)">
                                                            {{getStationValue(e.stationId).trainLineName}}
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
                                            {{objCreateBranch.email}}
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
                                        <div class="text-normal w-100" v-html="objCreateBranch.description">
                                            
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
                                                <div v-if="objCreateBranch.openFullDay" class="row">
                                                    <div class="col-2">{{$i('cms_work_time_branch')}}:</div>  
                                                    <div class="col-4" v-if="objCreateBranch.openFullDay">{{$i('cms_24_hours_open')}}</div>
                                                </div>
                                                <div v-else class="row">
                                                    <div class="col-2">{{$i('cms_work_time_branch')}}:</div>  
                                                    <div class="col-4" v-if="objCreateBranch.openTime || objCreateBranch.closeTime">{{formatShift(objCreateBranch.openTime)}} {{$i('cms_to_time')}} {{formatShift(objCreateBranch.closeTime)}}</div>
                                                </div>
                                                
                                            </div>
                                            <div class="col-12">
                                                <div v-if="objCreateBranch.allDayOpen" class="row">
                                                    <div class="col-2">{{$i('cms_date_time_branch')}}:</div> 
                                                    <div class="col-8">{{$i('cms_always_open')}}</div>  
                                                </div>
                                                <div v-else>
                                                    <div class="row">
                                                    <div class="col-2">{{$i('cms_date_time_branch')}}:</div>  
                                                    <div class="col-8">
                                                        <div class="row">
                                                        <div class="col-12">{{dateOffWeeks.toString()}}</div>  
                                                        </div> 
                                                        <div class="row" v-if="objCreateBranch.publicHoliday">
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
                                            <div class="col-6" v-for="e in listSection" :key="e.id" v-if="e.id == objCreateBranch.section">
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
            <div class="group-btn-header__ha my-4">
                <div class="list-btn__ha">
                    <div class="list-btn__ha">
                        <div class="item-btn">
                            <a href="javascript:;" class="text-links bg-text" @click="back">
                                {{$i('employer_forgot_pass_back')}} </a>
                        </div>
                        <div class="item-btn">
                            <a href="javascript:;" class="text-links bg-green" @click="save">
                                {{$i('Save')}} </a>
                        </div>
                        <div class="item-btn">
                            <a href="javascript:;" class="text-links btn-cancels" @click="cancel">
                                {{$i('employer_job_post_job_edit_job_cancel')}} </a>
                        </div>
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
    import {BranchSection} from '../../../types/enum'

    export default {
        data() {
            return {
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
                dateOffWeeks: [],
                listStation: [],
                objCreateBranch: {},
                objDataLocation: {
                    zipCode: -1,
                    provinceId: -1,
                    pageIndex: 1,
                    pageSize: 9999,
                    status: 1,
                },


            }

        },
        props: {
            value: {
                type: Object
            },

        },
        validations: {
            
        },
        computed: {
            ...mapGetters(['province', 'dateWeeks', 'district']),
            districtName() {
                if(this.objCreateBranch && this.objCreateBranch.address) return this.district.find(d => d.id == this.objCreateBranch.address.districtId).name;
                return '1'
            },
            provinceName() {
                if(this.objCreateBranch && this.objCreateBranch.address) return this.province.find(d => d.id == this.objCreateBranch.address.provinceId).name;
                return '1'
            }
        },
        watch: {
            
        },
        methods: {
            ...mapActions(['searchListStation']),
            save() {
              this.$emit('save')
            },
            back() {
              this.$emit('tab', 1)
            },
            cancel() {
              return this.$router.push('/branch');
            },
            save() {
              this.$emit('save')
            },
            getStationValue(id) {
              if(!id) return ''
              return this.listStation.find(e => e.id == id)
            },
            getDataStation() {
              let dataSearch = Object.assign({}, this.objDataLocation);
              dataSearch.provinceId = this.objCreateBranch.address.provinceId;
              dataSearch.districtId = this.objCreateBranch.address.districtId;
              dataSearch.zipCode = this.objCreateBranch.address.zipCode;
              this.searchListStation(dataSearch)
                  .then((res) => {
                      this.listStation = res.data
                  })
                  .catch(err => {
                      this.$error(err.message);
                  })
            },
            getAllData() {
              if(this.objCreateBranch && this.objCreateBranch.address) {
                this.getDataStation();
              }
              if(this.objCreateBranch && this.objCreateBranch.dayoffIds.length) {
                this.objCreateBranch.dayoffIds.map(e => {
                  this.dateWeeks.map(i => {
                    if (i.id == e) this.dateOffWeeks.push(i.name)
                  })
                })
              }
            }

        },
        created() {

        },
        mounted() {
            this.objCreateBranch = this.value || {}
            this.getAllData();
        }
    }
</script>

<style scoped>
.erorr-text {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    left: 0;
    margin-left: 20px;
}

.input-text__ha::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.text_changePassword{
    cursor: pointer;
}
</style>
