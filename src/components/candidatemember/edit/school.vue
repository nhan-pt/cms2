<template>
  <div id="tab-candidate-2" class="tab-pane fade active show">
    <div class="group-basicInfo-candidate border-frame border-top__ha" v-if="objData.candidateSchool">
      <div class="group-row">
        <div class="row">
          <div class="col-3 border-right__ha">
            <div class="content-candidate-left p-15">
              <div class="name-title">{{$i('cms_school_name')}}</div>
            </div>
          </div>
          <div class="col-9">
            <div class="content-candidate-right p-y-15">
              <div class="box-row rule">
                <div class="texts w-100">
                  <input type="text" class="input-text__ha "
                         v-model="objData.candidateSchool.name">
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
              <div class="name-title"> {{$i('cms_home_address')}}</div>
            </div>
          </div>
          <div class="col-9">
            <div class="content-candidate-right p-y-15">
              <div class="row mb-2">
                <div class="col-6">
                  <div class="group-rule-text">
                    <div class="name-title">{{$i('Zipcode')}}</div>
                    <div class="name-value w-100">
                      <el-select v-model.lazy="objData.candidateSchool.address.zipCode"
                                 :placeholder="$i('Select')"
                                 :remote-method="remoteZipcode"
                                 :loading="loadZipcode"
                                 @change="revertStations"
                                 remote
                                 filterable
                      >
                        <el-option
                          v-for="zc in listZipCode"
                          :key="'zip' + zc.zipCode + zc.id"
                          :label="zc.zipCode + ' - ' + zc.districtName + ' - ' + zc.townName"
                          :value="zc.zipCode">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="group-rule-text">
                    <div class="name-title">{{ $i('prefectures') }}</div>
                    <div class="name-value w-100">
                      <el-select v-model="objData.candidateSchool.address.provinceId"
                                 remote
                                 filterable
                                 :placeholder="$i('Province')">
                        <el-option
                          v-for="pr in province"
                          :key="pr.id"
                          :label="pr.name"
                          :value="pr.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-6">
                  <div class="group-rule-text">
                    <div class="name-title">{{$i('city')}}</div>
                    <div class="name-value w-100">
                      <el-select v-model="objData.candidateSchool.address.districtId"
                                 remote
                                 filterable
                                 :placeholder="$i('District')">
                        <el-option
                          v-for="dt in listDistrict"
                          :key="dt.id"
                          :label="dt.name"
                          :value="dt.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="group-rule-text">
                    <div class="name-title">{{$i('Village')}}</div>
                    <div class="name-value w-100">
                      <input type="text" class="input-text__ha" v-model="objData.candidateSchool.address.townName">
                    </div>
          
                  </div>
                </div>
              </div>
              <div class="row ">
                <div class="col-12">
                  <div class="group-rule-text">
                    <div class="name-title">{{$i('Address')}}</div>
                    <div class="name-value w-100">
                      <input type="text" class="input-text__ha"
                             value="3 Chome 14-21 Noguchi Bld 2F"
                             v-model="objData.candidateSchool.address.address">
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
              <div class="name-title"> {{$i('nearest_station')}} </div>
            </div>
          </div>
          <div class="col-9">
            <div class="content-candidate-right Nearest p-y-15">
              <div class="row mb-2" v-for="(e,i) in objData.candidateSchool.address.stations" :key="i">
                <div class="col-4">
                  <div class="group-rule-text">
                    <div class="name-title w-100">
                      <el-select v-model="e.stationId"
                                 filterable remote clearable reserve-keyword
                                 :placeholder="$i('Station')">
                        <el-option
                          :remote-method="remoteStation"
                          v-for="station in listStation"
                          :key="station.id"
                          :loading="loadStation"
                          :label="station.name + ' - ' + station.trainLineName"
                          :value="station.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="group-rule-text">
                    <div class="name-title w-100">
                      <el-select v-model="e.stationId"
                                 disabled
                                 :placeholder="$i('SEARCH_trainLine')">
                        <el-option
                          v-for="station in listStation"
                          :key="station.id"
                          :label="station.trainLineName"
                          :value="station.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="col-3">
                  <div class="group-rule-text">
                    <div class=" w-100">
                      <input type="number" :placeholder="$i('WalkingMinute')" class="form-control" v-model="e.description">
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div @click="removeStation(i)" class="minus__wrapper">
                    <i class="fas fa-2x fa-minus-circle ml-auto"></i>
                  </div>
                </div>
              </div>
              <div class="row ">
                <div class="col-2">
                  <div class="group-rule-text">
                    <i class="fas fa-2x fa-plus-circle" @click="addStation()"></i>
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
              <div class="name-title"> {{$i('cms_school_time')}} </div>
            </div>
          </div>
          <div class="col-9">
            <div class="content-candidate-right p-y-15">
              <div class="box-row rule">
                <input type="text" class="input-text__ha "
                       v-model="objData.candidateSchool.schoolTime">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="group-btn-footer__ha">
      <div class="list-btn__ha">
        <div class="item-btn">
          <a href="javascript:;" class="text-links btn-back" @click="previousTab"> {{$i('back')}} </a>
        </div>
        <div class="item-btn">
          <a href="javascript:;" class="text-links btn-confirm" @click="confirm"> {{$i('Confirm')}} </a>
        </div>
        <div class="item-btn">
          <a href="javascript:;" class="text-links btn-next" @click="nextTab"> {{$i('cms_next')}} </a>
        </div>
        <div class="item-btn">
          <a href="javascript:;" @click="$router.push('/candidatemember')" class="text-links btn-cancels"> {{$i('Cancel')}} </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters,} from 'vuex'
    export default {
        name: "school",
        props: ['value'],
        data() {
            return {
                objData: {},
                loading: false,
                loadZipcode: false,
                loadStation: false,
                listZipCode:[],
                listDistrict: [],
                listStation: [],
                objDataLocation: {
                    zipCode: -1,
                    provinceId: -1,
                    pageIndex: 1,
                    pageSize: 999,
                    status: 1,
                },
                objDataCds: {
                    pageIndex: 1,
                    pageSize: 999
                },
            }
        },
        watch: {
            'value' (value) {
                this.objData = value || {};
            },
            'objData.candidateSchool.address.provinceId'() {
                this.getDataDistrict();
                this.getDataStation();
            },
            'objData.candidateSchool.address.zipCode'(value) {
                if(value == -1) {
                    this.objData.candidateSchool.address.districtId = null;
                    this.objData.candidateSchool.address.provinceId = null;
                    this.objData.candidateSchool.address.townName = null;
                }
                else {
                    setTimeout(() => {
                        this.listZipCode.forEach(e => {
                            if (e.zipCode == this.objData.candidateSchool.address.zipCode) {
                                this.objData.candidateSchool.address.districtId = e.districtId;
                                this.objData.candidateSchool.address.townName = e.townName;
                                if(this.objData.candidateSchool.address.provinceId == e.provinceId) this.getDataStation();
                                else this.objData.candidateSchool.address.provinceId = e.provinceId;
                            }
                        });
                    }, 100);
                }

            }
        },
        computed: {
          ...mapGetters(['province'])
    },
        methods: {
            ...mapActions([ 'getListZipCode','searchListDistrict', 'searchListStation']),
            remoteZipcode(query) {
                setTimeout(() => {
                    this.getZipCode(query);
                }, 200);
            },
            nextTab() {
                this.$emit('nextTab')
            },
            previousTab() {
                this.$emit('previousTab')
            },
            confirm() {
                this.$emit('confirmTab')
            },
            remoteStation() {
                this.loading = true;
            },
            revertStations() {
              this.objData.candidateSchool.address.stations = [{
                stationId:null,
                description:'',
              }]
            },
            getDataStation() {
                let dataSearch = Object.assign({}, this.objDataLocation);
                dataSearch.provinceId = this.objData.candidateSchool.address.provinceId || -1;
                dataSearch.zipCode = this.objData.candidateSchool.address.zipCode || -1;
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
                dataSearch.provinceId = this.objData.candidateSchool.address.provinceId || -1;
                this.searchListDistrict(dataSearch)
                    .then((respon) => {
                        this.listDistrict = respon.data
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            },
            getZipCode(code) {
                this.loadZipcode = true
                this.getListZipCode(code).then(res => {
                  this.$forceUpdate()
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
            addStation() {
                this.objData.candidateSchool.address.stations.push({
                    stationId:null,
                    description:'',
                })
            },
            removeStation(index) {
                this.objData.candidateSchool.address.stations.splice(index, 1);
            },
            getData() {
                this.getZipCode();
            },
        },
        mounted() {
            this.objData = this.value || {};
            this.getData()
        }
    }
</script>

<style scoped>

</style>