<template xmlns="http://www.w3.org/1999/html">
  <form action="#" class="mb-4">
    <div class="row">
      <div class="col">
        <div class="section-title bg-orange p-10-15 text-white weight-600">
          <div class="row">
            <div class="col-10">
              {{$i('cms_job_post_basic_info')}}
            </div>
            <div class="col-2 text-right">
              <button class="border-orange bg-orange text-white" type="button"  @click="editTab(1)">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mb-4">
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{ $i('Member') }}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div v-for="member in listMember" :key="member.id" v-if="objData.memberId == member.id">
              {{member.loginEmail}}
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_job_post_title')}}</p>
          
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            {{objData.title}}
          </div>
        </div>
      </div>
      <div class="row basic-row">
        <div
          class="col-3 d-flex justify-content-between align-items-center flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_job_post_input_search_location')}}</p>
          
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 d-flex justify-content-between">
            {{objData.shopName}}
          </div>
        </div>
      </div>
      <div class="row basic-row ">
        <div class="col-3 d-flex justify-content-between align-items-center flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_job_post_creat_work_place')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="job-detail p-20-0">
            <div class="row mt-1">
              <div class="col-4">
                {{$i('Zipcode')}}:
                <span class="text-normal">{{objData.zipCode}}</span>
              </div>
              <div class="col-8">
                {{$i('prefectures')}}:
                <span class="text-normal" v-for="pv in province" v-if="objData.provinceId == pv.id">{{pv.name}}</span>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-4">
                {{$i('cms_city_ward')}}:
                <span class="text-normal" v-for="district in listDistrict" v-if="objData.districtId == district.id">{{district.name}}</span>
              </div>
              <div class="col-4">
                {{$i('Village')}}:
                <span class="text-normal"> {{objData.townName}}</span>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-12">
                {{$i('Address')}}:
                <span class="text-normal">{{objData.address}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_job_post_nearest_station')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div class="row mt-1"  v-for="(e,i) in objData.stations" :key="i">
              <div class="col-4 weight-600" v-for="station in listStation" v-if="e.stationId == station.id">
                {{$i('Station')}}:
                <span class="text-normal">
                      {{station.name}}</span>
              </div>
              <div class="col-4 weight-600" v-for="station in listStation" v-if="e.stationId == station.id">
                <span class="text-normal">
                      {{station.trainLineName}}
                </span>
              </div>
              <div class="col-4" v-if="e.description">
                <span class="text-normal">{{e.description}} {{$i('cms_minutes_walk')}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('job_description')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div v-html="objData.description"></div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_requirement_type')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div v-html="objData.requirements"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="section-title bg-orange p-10-15 text-white weight-600">
          <div class="row">
            <div class="col-10">
              {{$i('cms_job_post_detail_hiring_condition')}}
            </div>
            <div class="col-2 text-right">
              <button class="border-orange bg-orange text-white" type="button"  @click="editTab(2)">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mb-4">
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_recruitment_type')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            {{dataJobModel}}
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('JobType')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            {{dataJobType}}
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_required_applicant_jp')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">{{dataJapaneseCertification}}
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_recruitment_shift')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <table class="table table-borderless" >
              <tbody>
              <tr v-for="(e,i) in objData.shiftJobInPosts" :key="'ship' + i">
                <td>
                  <div v-for="shift in shiftJob" v-if="e.shiftJobId == shift.id">
                    {{shift.name}}
                  </div>
                </td>
                <td>
                  {{e.startWorking}}
                </td>
                <td class="w-15 text-center"><div v-if="e.shiftJobId">{{$i('cms_to')}}</div></td>
                <td>
                  {{e.endWorking}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0 ">
            <p>{{$i('cms_applied_days')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 px-3">
            <div class="row">
              {{dataListDateWeek}}
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_working_day')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 px-3">
            <div class="row">
              {{dataWorkingDay}}
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_working_hour_per_day')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div v-if="objData.workingHourPerDay">
              {{objData.workingHourPerDay}} {{$i('hourOrMore')}}
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_post_job_salary')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div class="row">
              <div class="col-6">
                {{formatPrice(objData.salary)}} {{$i('yenOrMore')}}
              </div>
              <div class="col-6">
                {{$i('SalaryType')}}: {{dataSalaryType}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_post_job_payment_method')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 px-3">
            <div class="row">
              {{dataPaymentMethod}}
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_transportation_expense')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            {{objData.moneyForMove}} {{$i('cms_maximum_yen')}}
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_post_job_benifit')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 d-flex justify-content-between">
            {{dataListRegime}}
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('Tag')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 d-flex justify-content-between">
            {{dataListTag}}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="section-title bg-orange p-10-15 text-white">
          <div class="row">
            <div class="col-10">
              {{$i('cms_interview_schedule')}}
            </div>
            <div class="col-2 text-right">
              <button class="border-orange bg-orange text-white" type="button"  @click="editTab(3)">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mb-4">
      <div class="row basic-row ">
        <div class="col-3 d-flex justify-content-between align-items-center flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_job_post_interview_place_creat')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="job-detail p-20-0">
            <div class="row mt-1">
              <div class="col-4">
                {{$i('Zipcode')}}:
                <span class="text-normal">{{interviewInformation.zipCode}}</span>
              </div>
              <div class="col-8 display-flex">
                <div>{{$i('prefectures')}}: </div>
                <div>
                  <span class="text-normal" v-for="pv in province" v-if="interviewInformation.provinceId == pv.id">{{pv.name}}</span>
                </div>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-4 display-flex">
                <div>{{$i('city')}}: </div>
                <div v-if="interviewDistrict && interviewDistrict.length">
                  <span class="text-normal" v-for="district in interviewDistrict" v-if="interviewInformation.districtId == district.id">{{district.name}}</span>
                </div>
                <div v-else>
                  <span> {{objData.districtName}}</span>
                </div>
              </div>
              <div class="col-4">
                {{$i('Village')}}:
                <span class="text-normal"> {{interviewInformation.townName}}</span>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-12">
                {{$i('Address')}}:
                <span class="text-normal">{{interviewInformation.address}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_job_post_nearest_station')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div class="row mt-1"  v-for="(e,i) in interviewInformation.stations" :key="i">
              <div class="col-4 weight-600" v-for="station in interviewStation" v-if="e.stationId == station.id">
                {{$i('Station')}}:
                <span class="text-normal">
                      {{station.name}}</span>
              </div>
              <div class="col-4 weight-600" v-for="station in interviewStation" v-if="e.stationId == station.id">
                <span class="text-normal">
                      {{station.trainLineName}}
                </span>
              </div>
              <div class="col-4" v-if="e.description">
                <span class="text-normal">{{e.description}} {{$i('cms_minutes_walk')}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_job_post_creat_interview_schedule')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <table class="table table-borderless">
              <tbody>
              <tr v-for="(e,i) in interviewInformation.interviewScheduleSuggests" :key="'ship' + i">
                <td>
                  <div v-for="date in interviewScheduleDate" v-if="e.interviewDateId==date.id">
                    {{date.name}}
                  </div>
                </td>
                <td>
                  {{e.startHour}}
                </td>
                <td class="w-15 text-center"><div v-if="e.interviewDateId">{{$i('cms_to')}}</div></td>
                <td>
                  {{e.endHour}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_interview_note')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <pre>{{interviewInformation.interviewNote}}</pre>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="section-title bg-orange p-10-15 text-white">
          <div class="row">
            <div class="col-10">
              {{$i('cms_posting')}}
            </div>
            <div class="col-2 text-right">
              <button class="border-orange bg-orange text-white" type="button"  @click="editTab(4)">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mb-4">
      <div class="row basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_photo')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="row p-20-0">
            <div class="col">
              <div class="upload-block" >
                <div v-for="(image, index) in objData.employerPostImages" :key="'image' +index" class="upload-image">
                  <img :src="image" :alt="image">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_job_post_posting_period ')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="row p-20-0">
            <div class="col-6">
              <label class="text-normal">{{$i('cms_posting_date')}}</label>
              {{formatDate(objData.startDate)}}
            </div>
            <div class="col-6">
              <label class="text-normal">{{$i('cms_closing_date')}}</label>
              {{formatDate(objData.endDate)}}
            </div>
          </div>
        </div>
      </div>
      <div class="row basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('Status')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 d-flex justify-content-between">
            <div v-for="e in listStatus" v-if="e.status == objData.status"> {{$i(e.label)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="group-btn-footer">
      <div class="list-item-btn" >
        <div class="item-btn">
          <button type="button" class="btn btn-links bg-save" @click="save">{{$i('Save')}}
          </button>
        </div>
        <div class="item-btn">
          <button @click="$router.push('/employerpost')" type="button" class="btn btn-links bg-cancel">{{$i('Cancel')}}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "confirm",
        props: ['value', 'listDataInterview', 'listDataBasicInfo'],
        data() {
            return {
                objData: {},
                regimeValue: [],
                dataListRegime: [],
                dataListTag: [],
                dataListDateWeek: [],
                dataWorkingDay: null,
                dataPaymentMethod: null,
                dataJobModel: null,
                dataJobType: null,
                dataSalaryType: null,
                dataJapaneseCertification: null,
                listShiftJob: [],
                listMember: [],
                listStatus: [
                    {
                        status: 0,
                        label: 'Deleted'
                    },
                    {
                        status: 1,
                        label: 'Active'
                    },
                    {
                        status: 2,
                        label: 'Inactive'
                    },
                    {
                        status: 3,
                        label: 'Expired'
                    },
                    {
                        status: 4,
                        label: 'Non-posting'
                    },
                ],
                interviewDistrict: [],
                interviewStation: [],
                listDistrict: [],
                listStation: [],
                objDataLocation: {
                    zipCode: -1,
                    provinceId: -1,
                    pageIndex: 1,
                    pageSize: 999,
                    status: 1,
                },
                interviewInformation: {}
            }
        },
        components: {
            basicInfo: () => import('./basic-infor'),
            hiringCondition: () => import('./hiring-condition'),
            interviewSetting: () => import('./interview-setting'),
            posting: () => import('./posting'),
        },
        computed: {
            ...mapGetters(['province', 'interviewScheduleDate', 'shiftJobTime', 'shiftJob', 'workingDay', 'dateWeeks', 'tag' ,'paymentMethod', 'regime', 'jobModel', 'salaryType', 'japaneseCertification', 'jobType', 'listJapaneseCertification']),
        },
        methods: {
            ...mapActions(['searchListStation']),
            save() {
                this.$emit('save')
            },
            editTab(tab) {
                this.$emit('tab',tab)
            },
            getDataStation() {
                let dataSearch = Object.assign({}, this.objDataLocation);
                dataSearch.provinceId = this.objData.provinceId;
                dataSearch.districtId = this.objData.districtId;
                dataSearch.zipCode = this.objData.zipCode;
                this.searchListStation(dataSearch)
                    .then((res) => {
                        this.listStation = res.data
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            },
            getInterviewStation() {
                let dataSearch = Object.assign({}, this.objDataLocation);
                dataSearch.provinceId = this.interviewInformation.provinceId;
                dataSearch.districtId = this.interviewInformation.districtId;
                dataSearch.zipCode = this.interviewInformation.zipCode;
                this.searchListStation(dataSearch)
                    .then((res) => {
                        this.interviewStation = res.data
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            },
            getAllData() {
                if(this.objData.stations && this.objData.stations.length) {
                    this.getDataStation();
                }
                if(this.interviewInformation && this.interviewInformation.stations.length) {
                    this.getInterviewStation();
                }
                if(this.listDataBasicInfo) {
                    this.listDistrict = [...this.listDataBasicInfo.listDistrict] || []
                    this.listMember = [...this.listDataBasicInfo.listMember] || []
                }
                if(this.listDataInterview) {
                    this.interviewDistrict = [...this.listDataInterview.listDistrict] || []
                }
                
                if(this.objData.regimeIds && this.objData.regimeIds.length)
                {
                    let regimes = [...this.regime] || []
                    regimes.map(e => {
                        this.objData.regimeIds.map(i => {
                            if (i == e.id) this.dataListRegime.push(e.name)
                        })
                    })
                    
                }
                if(this.objData.tagIds && this.objData.tagIds.length)
                {
                    let tags = [...this.tag] || []
                    tags.map(e => {
                        this.objData.tagIds.map(i => {
                            if (i == e.id) this.dataListTag.push(e.name)
                        })
                    })
                }
                if(this.objData.postHiringDateIds && this.objData.postHiringDateIds.length)
                {
                    let dateWeek = [...this.dateWeeks] || []
                    dateWeek.map(e => {
                        this.objData.postHiringDateIds.map(i => {
                            if (i == e.id) this.dataListDateWeek.push(e.name)
                        })
                    })
                }
                if(this.objData.workingDayId)
                {
                    let workingDays = [...this.workingDay] || []
                    workingDays.map(e => {
                        if (e.id != this.objData.workingDayId) return;
                        else this.dataWorkingDay = e.name
                    })

                }
                if(this.objData.paymentMethodId)
                {
                    let payment = [...this.paymentMethod] || []
                    payment.map(e => {
                        if (e.id != this.objData.paymentMethodId) return;
                        else this.dataPaymentMethod = e.name
                    })
                }
                if(this.objData.jobModelId)
                {
                    let model = [...this.jobModel] || []
                    model.map(e => {
                        if (e.id != this.objData.jobModelId) return;
                        else this.dataJobModel = e.name
                    })

                }
                if(this.objData.jobTypeId)
                {
                    let jobType = [...this.jobType] || []
                    jobType.map(e => {
                        if (e.id != this.objData.jobTypeId) return;
                        else this.dataJobType = e.name
                    })
                }
                if(this.objData.salaryTypeId)
                {
                    let salaryTypes = [...this.salaryType] || []
                    salaryTypes.map(e => {
                        if (e.id != this.objData.salaryTypeId) return;
                        else this.dataSalaryType = e.name
                    })
                }
                if(this.objData.japaneseCertificationId)
                {
                    let japaneseCertifications = [...this.japaneseCertification] || []
                    japaneseCertifications.map(e => {
                        if (e.id != this.objData.japaneseCertificationId) return;
                        else this.dataJapaneseCertification = e.name
                    })
                }

                this.dataListDateWeek = this.dataListDateWeek.length ? this.dataListDateWeek.join(', ') : null
                this.dataListRegime = this.dataListRegime.length ? this.dataListRegime.join(', ') : null
                this.dataListTag = this.dataListTag.length ? this.dataListTag.join(', ') : null
            }
        },
        mounted() {
            this.objData = this.value || {}
            this.interviewInformation = this.objData.interviewInformation || {}
            this.getAllData();



        }
    }
</script>

<style scoped>
  .table td, .table th {
    border: none !important;
    padding: 0 !important;
  }
</style>