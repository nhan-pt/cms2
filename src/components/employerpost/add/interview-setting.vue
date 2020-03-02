<template>
  <div v-if="objData">
      <div class="container-fluid mb-4">
        <div class="row basic-row ">
          <div class="col-3 border-right-1">
            <div class="p-20-0 d-flex justify-content-between align-objDatas-center flex-wrap ">
              <div>{{$i('cms_job_post_interview_place')}}</div>
            </div>
            <div class="d-flex justify-content-between align-objDatas-center flex-wrap ">
              <label for="1" class="checkbox-item m-0">
                {{$i('cms_job_post_same')}}
                <input type="checkbox" name="" id="1" disabled>
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="col-9">
            <div class="job-detail p-20-0">
              <div class="row">
                <div class="col">
                  <table class="table table-borderless table-address fix-select-table">
                    <tbody>
                    <tr>
                      <td class="w-15 text-bold">{{ $i('Zipcode') }}</td>
                      <td class="w-30">
                        <div>
                            <el-select v-model.lazy="objData.zipCode"
                                     filterable
                                     @change="revertStations"
                                     :placeholder="$i('Select')"
                                     :remote-method="remoteZipcode"
                                     :loading="loadZipcode"
                                     clearable
                                     remote
                          >
                            <el-option
                              v-for="objData in listZipCode"
                              :key="'zip' + objData.zipCode + objData.id"
                              :label="objData.zipCode + ' - ' + objData.districtName + ' - ' + objData.townName"
                              :value="objData.zipCode">
                            </el-option>
                          </el-select>
                        </div>
                      </td>
                      <td class="w-15 text-bold">{{ $i('prefectures') }}
                      </td>
                      <td>
                        <div>
                            <el-select v-model="objData.provinceId"
                                     remote
                                     :placeholder="$i('Province')">
                            <el-option value=null label="--Select--"></el-option>
                            <el-option
                              v-for="objData in province"
                              :key="objData.id"
                              :label="objData.name"
                              :value="objData.id">
                            </el-option>
                          </el-select>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-bold">{{$i('city')}}</td>
                      <td>
                        <div class="">
                            <el-select v-model="objData.districtId"
                                     remote
                                     :placeholder="$i('District')">
                            <el-option value=null label="--Select--"></el-option>
                            <el-option
                              v-for="objData in listDistrict"
                              :key="objData.id"
                              :label="objData.name"
                              :value="objData.id">
                            </el-option>
                          </el-select>
                        </div>
                      </td>
                      <td class="text-bold">
                        {{$i('Village')}}
                      </td>
                      <td>
                        <div class="form-group">
                          <input type="text" class="form-control" v-model="objData.townName">
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
        
              <div class="detail-address ">
                <div
                  class="display-flex w-100 justify-content-between align-objDatas-center">
                  <div class="text-bold">
                    {{$i('Address')}}
                  </div>
                  <div class="input-address">
                      <el-input type="text" v-model="objData.address"></el-input>
                  </div>
                  <div class="">
                    <selectLocation class="ml-2"  
                                    @confirm="confirmMap" 
                                    v-model="objData.address" 
                                    :provinceName="mapProb.provinceName" 
                                    :districtName="mapProb.districtName" 
                                    :townName="mapProb.townName" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row  basic-row">
          <div
            class="col-3 border-right-1">
            <div class="p-20-0 d-flex justify-content-between flex-wrap ">
              <div>{{$i('cms_job_post_nearest_station')}}</div>
            </div>
          </div>
          <div class="col-9">
            <div class="p-20-0">
              <table class="fix-select-table table table-borderless">
                <tbody>
                <tr v-for="(e,i) in objData.stations" :key="i">
                  <td>
                      <el-select v-model="e.stationId"
                               filterable remote clearable reserve-keyword
                               :placeholder="$i('Station')">
                      <el-option value=null label="--Select--"></el-option>
                      <el-option
                        v-for="station in listStation"
                        :key="station.id"
                        :label="station.name + ' - ' + station.trainLineName"
                        :value="station.id">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select v-model="e.stationId"
                               disabled
                               collapse-tags
                               :placeholder="$i('SEARCH_trainLine')">
                      <el-option value=null label="--Select--"></el-option>
                      <el-option
                        v-for="station in listStation"
                        :key="station.id"
                        :label="station.trainLineName"
                        :value="station.id">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <input type="number" :placeholder="$i('WalkingMinute')" class="form-control" v-model="e.description">
                  </td>
                  <td class="w-15 text-right">
                    <div @click="removeStation(i)" class="minus__wrapper">
                      <i class="fas fa-2x fa-minus-circle ml-auto"></i>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="ml-3">
                <i class="fas fa-2x fa-plus-circle" @click="addStation()"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="row  basic-row">
          <div
            class="col-3 border-right-1">
            <div class="p-20-0  d-flex justify-content-between flex-wrap">
              <div>{{$i('cms_interview_schedule')}}</div>
            </div>
          </div>
          <div class="col-9">
            <div class="p-20-0">
              <table class="table table-borderless">
                <tbody>
                <tr v-for="(e,i) in objData.interviewScheduleSuggests" :key="'ship' + i">
                  <td>
                    <select class="form-control" v-model="e.interviewDateId">
                      <option value="0">{{ $i('Select') }}</option>
                      <option v-for="date in interviewScheduleDate"
                              :key="date.id"
                              :value="date.id">
                        {{ date.name }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <el-time-select
                      :placeholder="$i('start_time')"
                      v-model="e.startHour"
                      :picker-options="{
                              start: '06:00',
                              step: '00:15',
                              end: '22:00'
                            }">
                    </el-time-select>
                  </td>
                  <td class="w-15 text-center">{{$i('cms_to')}}</td>
                  <td>
                    <el-time-select
                      :placeholder="$i('end_time')"
                      v-model="e.endHour"
                      :picker-options="{
                              start: '06:00',
                              step: '00:15',
                              end: '22:00',
                              minTime: e.startHour
                            }">
                    </el-time-select>
                  </td>
                  <td class="w-15 text-right">
                    <div @click="removeDate(i)" class="minus__wrapper">
                      <i class="fas fa-2x fa-minus-circle ml-auto"></i>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="ml-3">
                <i class="fas fa-2x fa-plus-circle" @click="addDate()"></i>
              </div>
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
              <textarea name="" id="" cols="30" rows="10" v-model="objData.interviewNote"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="group-btn-footer">
        <div class="list-item-btn" >
          <div class="item-btn">
            <button type="button" class="btn btn-links bg-back" @click="previousTab">{{$i('back')}}
            </button>
          </div>
          <div class="item-btn">
            <button type="button" class="btn btn-links bg-next" @click="nextTab">{{$i('cms_next')}}
            </button>
          </div>
          <div class="item-btn">
            <button type="button" @click="confirm()" class="btn btn-links bg-confirm">{{$i('Confirm')}}
            </button>
          </div>
          <div class="item-btn">
            <button @click="$router.push('/employerpost')" type="button" class="btn btn-links bg-cancel">{{$i('Cancel')}}
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "interview-setting",
        props:['value'],
        data() {
            return {
                checkVali:false,
                objData: {},
                dialogMap: false,
                mapProb:{
                  provinceName: "",
                  districtName: "",
                  townName: "",
                },
                objDataLocation: {
                    zipCode: -1,
                    provinceId: -1,
                    pageIndex: 1,
                    pageSize: 999,
                    status: 1,
                },
                objDataCds: {
                    pageIndex: 1,
                    pageSize: 9999
                },
                rules: {
                },
                detailAddress:'',
                loadZipcode: false,
                listZipCode:[],
                listDistrict: [],
                listStation: [],
                dataInterview: {},
            }
        },
        components: {
            selectLocation: () => import('../../_common/selectLocation'),
        },
        computed: {
            ...mapGetters(['listShiftJob', 'interviewScheduleDate', 'province']),
        },
        watch: {
            'objData.provinceId'(value) {
                this.getDataDistrict();
                this.getDataStation();
            },
            'objData.districtId'() {
                this.getLocationDetail();
            },
            'objData.zipCode'(value) {
                if(value == -1 || value == '') {
                    this.objData.districtId = null;
                    this.objData.provinceId = null;
                    this.objData.townName = null;
                    this.objData.address=null
                }
                else {
                    setTimeout(() => {
                        this.listZipCode.forEach(e => {
                            if (e.zipCode == this.objData.zipCode) {
                                this.objData.districtId = e.districtId;
                                this.objData.townName = e.townName;
                                if(this.objData.provinceId == e.provinceId) this.getDataStation();
                                else this.objData.provinceId = e.provinceId
                            }
                        });
                    }, 200);
                }

            }
        },
        methods: {
            ...mapActions(['getListZipCode', 'getListProvince', 'searchListDistrict',
                'searchListStation']),
            confirm() {
              this.$emit('confirmTab')
            },
            nextTab() {
              this.$emit('nextTab')
            },
            previousTab() {
                this.$emit('previousTab')
            },
            getLocationDetail() {
                if(this.province && this.province.length) {
                    this.mapProb.provinceName = this.province.find(i => i.id == this.objData.provinceId) ? this.province.find(i => i.id == this.objData.provinceId).name : ''
                }
                if(this.listDistrict && this.listDistrict.length) {
                    this.mapProb.districtName = this.listDistrict.find(i => i.id == this.objData.districtId) ? this.listDistrict.find(i => i.id == this.objData.districtId).name : ''
                }
                this.mapProb.townName = this.objData.townName;
            },
            confirmMap(value) {
                this.objData.lat = value.lat
                this.objData.long = value.lng
            },
            revertStations() {
              this.objData.stations = [{
                stationId:null,
                description:'',
              }]
            },
            addDate() {
                this.objData.interviewScheduleSuggests.push({
                    interviewDateId: null,
                    endHour: null,
                    startHour: null,
                })
                this.$forceUpdate()
            },
            removeDate(index) {
                this.objData.interviewScheduleSuggests.splice(index, 1);
            },
            addStation() {
                this.objData.stations.push({
                    stationId:null,
                    description:'',
                })
            },
            removeStation(index) {
                this.objData.stations.splice(index, 1);
            },
            remoteZipcode(query) {
                setTimeout(() => {
                    this.getZipCode(query);
                }, 200);
            },
            getZipCode(code) {
                this.loadZipcode = true
                this.getListZipCode(code).then(res => {
                    this.loadZipcode = false
                    this.listZipCode = res.data;
                    var index = 1
                    this.listZipCode.map(e => {
                        e.id = index
                        index++
                    })
                }).catch( err => {
                    this.loadZipcode = false
                    return this.$error(err.message);
                })
            },
            getDataStation() {
                let dataSearch = Object.assign({}, this.objDataLocation);
                dataSearch.provinceId = this.objData.provinceId;
                dataSearch.zipCode = this.objData.zipCode;
                if(!dataSearch.provinceId && !dataSearch.zipCode) dataSearch.pageSize = 99
                this.searchListStation(dataSearch)
                    .then((res) => {
                        this.listStation = res.data
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            },
            getDataDistrict() {
                let dataSearch = Object.assign({}, this.objDataLocation);
                dataSearch.provinceId = this.objData.provinceId;
                this.searchListDistrict(dataSearch)
                    .then((respon) => {
                        this.listDistrict = respon.data
                        this.objData.districtId = this.listDistrict.map(e => e.id).find(i => i == this.objData.districtId) ? this.objData.districtId : null
                        this.dataInterview.listDistrict = this.listDistrict
                        this.getLocationDetail();
                        this.$emit('dataInterview',this.dataInterview)
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            },
            getData() {
                this.getZipCode();
            },
        },
        mounted() {
            this.getData();
            this.objData = this.value.interviewInformation || {};
        }
    }
</script>

<style scoped>
  textarea {
    width: 100%;
  }
  .table td, .table th { border: none !important; }
  .vue-google-map {
    height: 350px;
  }
</style>