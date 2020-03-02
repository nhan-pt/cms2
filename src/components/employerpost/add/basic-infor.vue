<template>
  <div v-if="objData">
      <div class="container-fluid mb-4">
      <div class="row  basic-row">
        <div class="col-3 border-right-1">
          <div class="p-20-0 d-flex justify-content-between flex-wrap">
            <div>{{ $i('Member') }}</div>
            <p class="required">{{$i('Required')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0" :class="{'is-invalid has-danger': $v.objData.memberId.$dirty && $v.objData.memberId.$invalid}">
              <el-select v-model="objData.memberId"
                       remote
                       filterable
                       @input="$v.objData.memberId.$touch()"
                       clearable
                       :remote-method="remoteMember"
                       :placeholder="$i('Select')">
              <el-option
                v-for="item in listMember"
                :key="item.id"
                :label="item.loginEmail"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 border-right-1">
          <div class="p-20-0 d-flex justify-content-between align-objDatas-center flex-wrap">
            <div>{{$i('cms_job_post_basic_info')}}</div>
            <p class="required">{{$i('Required')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0" :class="{'is-invalid has-danger': $v.objData.title.$dirty && $v.objData.title.$invalid}">
            <el-input v-model="objData.title"  @input="$v.objData.title.$touch()" ></el-input>
          </div>
        </div>
      </div>
      <div class="row basic-row">
        <div
          class="col-3 border-right-1">
          <div class="p-20-0 p-20-0 d-flex justify-content-between align-objDatas-center flex-wrap">
            <div>{{$i('cms_job_post_input_search_location')}}</div>
            <p class="required">{{$i('Required')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0" :class="{'is-invalid has-danger': $v.objData.shopName.$dirty && $v.objData.shopName.$invalid}">
            <el-input v-model="objData.shopName"  @input="$v.objData.shopName.$touch()" ></el-input>
          </div>
        </div>
      </div>
      <div class="row basic-row ">
        <div class="col-3 border-right-1">
          <div class="p-20-0 d-flex justify-content-between align-objDatas-center flex-wrap ">
            <div>{{$i('cms_job_post_creat_work_place')}}</div>
            <p class="required">{{$i('Required')}}</p>
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
                    <td class="w-15 text-bold pl-0">{{ $i('Zipcode') }}:</td>
                    <td class="w-30 ">
                      <div :class="{'is-invalid has-danger': $v.objData.zipCode.$dirty && $v.objData.zipCode.$invalid}">
                          <el-select v-model.lazy="objData.zipCode"
                                     @input="$v.objData.zipCode.$touch()"
                                     filterable
                                     :placeholder="$i('Select')"
                                     :remote-method="remoteZipcode"
                                     clearable
                                     :loading="loadZipcode"
                                     @change="revertStations"
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
                    <td class="w-15 text-bold">{{ $i('prefectures') }}:
                    </td>
                    <td class="pr-0">
                      <div :class="{'is-invalid has-danger': $v.objData.provinceId.$dirty && $v.objData.provinceId.$invalid}">
                          <el-select v-model="objData.provinceId"
                                     @input="$v.objData.provinceId.$touch()"
                                     remote
                                     :placeholder="$i('Province')">
                            <el-option value=null :label="$i('Select')"></el-option>
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
                    <td class="text-bold pl-0">{{$i('city')}}:</td>
                    <td>
                      <div :class="{'is-invalid has-danger': $v.objData.districtId.$dirty && $v.objData.districtId.$invalid}">
                          <el-select v-model="objData.districtId"
                                     @input="$v.objData.districtId.$touch()"
                                     remote
                                     :placeholder="$i('District')">
                            <el-option value=null :label="$i('Select')"></el-option>
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
                      {{$i('Village')}}:
                    </td>
                    <td class="pr-0">
                      <div class="form-group" :class="{'is-invalid has-danger': $v.objData.townName.$dirty && $v.objData.townName.$invalid}">
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
                <div class="input-address" :class="{'is-invalid has-danger': $v.objData.address.$dirty && $v.objData.address.$invalid}">
                    <el-input type="text" v-model="objData.address" @input="$v.objData.address.$touch()"></el-input>
                </div>
                <div class="">
                    <selectLocation class="ml-2"  
                    @confirm="confirmMap" 
                    v-model="objData.address" 
                    :provinceName="mapProb.provinceName" 
                    :districtName="mapProb.districtName" 
                    :townName="mapProb.townName" 
                    />
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
            <p class="required">{{$i('Required')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <table class="fix-select-table table table-borderless">
              <tbody>
              <tr v-for="(e,i) in objData.stations" :key="i" :class="{'is-invalid has-danger': $v.objData.stations.$each[i].$dirty && $v.objData.stations.$each[i].$invalid}">
                <td>
                    <el-select v-model="e.stationId"
                               filterable remote clearable reserve-keyword
                               :placeholder="$i('Station')">
                      <el-option value=null :label="$i('Select')"></el-option>
                      <el-option
                        :remote-method="remoteStation"
                        v-for="station in listStation"
                        :key="station.id"
                        :loading="loadStation"
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
                  <div v-if="i!=0" @click="removeStation(i)" class="minus__wrapper">
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
          <div class="p-20-0 d-flex justify-content-between flex-wrap">
            <div>{{$i('job_description')}}</div>
            <p class="required">{{$i('Required')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0" :class="{'is-invalid has-danger': $v.objData.description.$dirty && $v.objData.description.$invalid}">
              <tiny-mce @change="objData.description = $event" :height="350"
                        v-model="objData.description"
                        @input="$v.objData.description.$touch()"></tiny-mce>
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
            <tiny-mce @change="objData.requirements = $event" :height="350"
                      v-model="objData.requirements"></tiny-mce>
          </div>
        </div>
      </div>
    </div>
    <div class="group-btn-footer">
      <div class="list-item-btn" >
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
    import {
      required,
      minLength
    } from 'vuelidate/lib/validators'
    export default {
        name: "basic-infor",
        props:['value'],
        validations: {
          objData: {
            shopName: {
              required
            },
            memberId: {
              required
            },
            title: {
              required
            },
            description: {
              required
            },
            zipCode: {
              required
            },
            districtId: {
              required
            },
            provinceId: {
              required
            },
            address: {
              required
            },
            townName: {
              required
            },
            stations: {
              minLength: minLength(1),
              required,
              $each: {
                stationId:{
                  required
                },
                description: {
                  required
                },
              }
            },

          }
        },
        data() {
            return {
                checkVali:false,
                objData: {},
                mapProb:{
                  provinceName: "",
                  districtName: "",
                  townName: "",
                },
                dialogMap: false,
                loadZipcode: false,
                loadStation: false,
                listZipCode:[],
                listDistrict: [],
                listStation: [],
                listMember: [],
                objDataLocation: {
                    zipCode: -1,
                    provinceId: -1,
                    pageIndex: 1,
                    pageSize: 9999,
                    status: 1,
                },
                objDataCds: {
                    pageIndex: 1,
                    pageSize: 9999
                },
                markers: [],
                center: {
                    lat: parseFloat(35.6585848),
                    lng: parseFloat(139.7432442,17),
                },
                zoom: parseFloat(16),
                objData: {},
                dataBasicInfo: {},
                objDataMember: {
                  pageSize: 99,
                  pageIndex: 1,
                  searchKeyword: ''
                },
                rules: {
                }
            }
        },
        components: {
            selectLocation: () => import('../../_common/selectLocation'),
        },
        watch: {
            'objData.memberId' (value) {
                if(this.$route.params.id || this.$route.params.sameid) this.getDataMemberEditOrSameJob()
            },
            'value' (value) {
                this.objData = value || {};
            },
            'objData.provinceId'() {
                this.getDataDistrict();
                this.getDataStation();
            },
            'objData.districtId'() {
                this.getLocationDetail();
            },
            'objData.zipCode'(value) {
                if(value == -1) {
                    this.objData.districtId = null;
                    this.objData.provinceId = null;
                    this.objData.townName = null;
                }
                else {
                    setTimeout(() => {
                        this.listZipCode.forEach(e => {
                            if (e.zipCode == this.objData.zipCode) {
                                this.objData.districtId = null;
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
        computed: {
            ...mapGetters(['province']),
        },
        methods: {
            ...mapActions(['getListEmployerMember', 'getListZipCode','getListProvince', 'searchListDistrict',
                'searchListStation', 'getAllTag']),
            confirm() {
              let invalid = this.$v.$invalid;
              if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'),'warning');
                return;
              }
              else{
                this.$emit('confirmTab')
              }
            },
            nextTab() {
              let invalid = this.$v.$invalid;
              if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'),'warning');
                return;
              }
              else{
                this.$emit('nextTab')
              }
            },
            revertStations() {
              this.objData.stations = [{
                stationId:null,
                description:'',
              }]
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
            remoteStation() {
                this.loading = true;
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
            confirmMap(value) {
                this.objData.locationLat = value.lat
                this.objData.locationLong = value.lng
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
                        this.dataBasicInfo.listDistrict = this.listDistrict
                        this.getLocationDetail();
                        this.$emit('dataBasicInfo',this.dataBasicInfo)
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            },
            remoteMember(value) {
                if (value !== '') {
                    setTimeout(() => {
                        this.objDataMember.searchKeyword = value;
                        this.getDataMember();
                    }, 200);
                } else {
                    this.objDataMember.searchKeyword = '';
                }
            },
            getDataMember() {
                this.getListEmployerMember(this.objDataMember).then(res => {
                    this.listMember = res.data;
                    this.dataBasicInfo.listMember = this.listMember
                    this.$emit('dataBasicInfo',this.dataBasicInfo)
                }).catch(err => {
                    this.$error(err.message);
                })
            },
            getDataMemberEditOrSameJob() {
              let dataSearch = Object.assign({}, this.objDataMember);
              dataSearch.id = this.objData.memberId;
              this.getListEmployerMember(dataSearch).then(res => {
                  this.listMember = res.data;
                  this.dataBasicInfo.listMember = this.listMember
                  this.$emit('dataBasicInfo',this.dataBasicInfo)
              }).catch(err => {
                  this.$error(err.message);
              })
            },
            getData() {
              this.objData = this.value || {};
              this.getDataMember();
              this.getZipCode();
            },
            addStation() {
                this.objData.stations.push({
                    stationId:null,
                    description:'',
                })
              this.$forceUpdate()
            },
            removeStation(index) {
                this.objData.stations.splice(index, 1);
            }
        },
        mounted() {
            this.objData = this.value || {};
            this.getData();
        }
    }
</script>

<style scoped>
  .table td, .table th { border: none !important; }
  .vue-google-map {
    height: 350px;
  }
  .erorr-text {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    left: 0;
    margin-left: 20px;
  }
</style>