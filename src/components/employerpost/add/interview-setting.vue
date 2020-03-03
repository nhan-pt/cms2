<template>
<div v-if="objDataJobPost">
    <div class="container-fluid mb-4">
        <div class="row basic-row ">
            <div class="col-3 border-right-1">
                <div class="p-20-0 d-flex justify-content-between align-objDatas-center flex-wrap ">
                    <div>{{$i('cms_job_post_interview_place')}}</div>
                </div>
                <div class="d-flex justify-content-between align-objDatas-center flex-wrap " v-if="mutablesameLocation">
                    <label for="1" class="checkbox-item m-0" :title="!mutablesameLocation.zipCode? 'update branch info':''" :class="!mutablesameLocation.zipCode ? 'check-disabled': ''">
                        {{$i('cms_job_post_same')}}
                        <input type="checkbox" name="" id="1" v-model="objDataJobPost.sameAddress" :disabled="!mutablesameLocation.zipCode">
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
                                                <el-select v-model.lazy="objDataJobPost.zipCode" filterable @change="revertStations" :placeholder="$i('Select')" :remote-method="remoteZipcode" :loading="loadZipcode" clearable remote :disabled="objDataJobPost.sameAddress">
                                                    <el-option v-for="objData in listZipCode" :key="'zip' + objData.zipCode + objData.id" :label="objData.zipCode + ' - ' + objData.districtName + ' - ' + objData.townName" :value="objData.zipCode">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </td>
                                        <td class="w-15 text-bold">{{ $i('prefectures') }}
                                        </td>
                                        <td>
                                            <div>
                                                <el-select v-model="objDataJobPost.provinceId" remote :placeholder="$i('Province')" :disabled="objDataJobPost.sameAddress">
                                                    <el-option value=null label="--Select--"></el-option>
                                                    <el-option v-for="objData in province" :key="objData.id" :label="objData.name" :value="objData.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-bold">{{$i('city')}}</td>
                                        <td>
                                            <div class="">
                                                <el-select v-model="objDataJobPost.districtId" remote :placeholder="$i('District')" :disabled="objDataJobPost.sameAddress">
                                                    <el-option value=null label="--Select--"></el-option>
                                                    <el-option v-for="objData in listDistrict" :key="objData.id" :label="objData.name" :value="objData.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </td>
                                        <td class="text-bold">
                                            {{$i('Village')}}
                                        </td>
                                        <td>
                                            <div class="form-group">
                                                <input type="text" class="form-control" v-model="objDataJobPost.townName" :disabled="objDataJobPost.sameAddress">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="detail-address ">
                        <div class="display-flex w-100 justify-content-between align-objDatas-center">
                            <div class="text-bold">
                                {{$i('Address')}}
                            </div>
                            <div class="input-address">
                                <el-input type="text" v-model="objDataJobPost.address" :disabled="objDataJobPost.sameAddress"></el-input>
                            </div>
                            <div class="">
                                <selectLocation class="ml-2" @confirm="confirmMap" v-model="objDataJobPost.address" :provinceName="mapProb.provinceName" :districtName="mapProb.districtName" :townName="mapProb.townName" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row  basic-row">
            <div class="col-3 border-right-1">
                <div class="p-20-0 d-flex justify-content-between flex-wrap ">
                    <div>{{$i('cms_job_post_nearest_station')}}</div>
                </div>
            </div>
            <div class="col-9">
                <div class="p-20-0">
                    <table class="fix-select-table table table-borderless">
                        <tbody>
                            <tr v-for="(e,i) in objDataJobPost.stations" :key="i">
                                <td>
                                    <el-select v-model="e.stationId" filterable remote clearable reserve-keyword :placeholder="$i('Station')">
                                        <el-option value=null label="--Select--"></el-option>
                                        <el-option v-for="station in listStation" :key="station.id" :label="station.name + ' - ' + station.trainLineName" :value="station.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select v-model="e.stationId" disabled collapse-tags :placeholder="$i('SEARCH_trainLine')">
                                        <el-option value=null label="--Select--"></el-option>
                                        <el-option v-for="station in listStation" :key="station.id" :label="station.trainLineName" :value="station.id">
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
            <div class="col-3 border-right-1">
                <div class="p-20-0  d-flex justify-content-between flex-wrap">
                    <div>{{$i('cms_interview_schedule')}}</div>
                </div>
            </div>
            <div class="col-9">
                <div class="p-20-0">
                    <table class="table table-borderless">
                        <tbody>
                            <tr v-for="(e,i) in objDataJobPost.interviewScheduleSuggests" :key="'ship' + i">
                                <td>
                                    <select class="form-control" v-model="e.interviewDateId">
                                        <option value="0">{{ $i('Select') }}</option>
                                        <option v-for="date in interviewScheduleDate" :key="date.id" :value="date.id">
                                            {{ date.name }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <el-time-select :placeholder="$i('start_time')" v-model="e.startHour" :picker-options="{
                              start: '06:00',
                              step: '00:15',
                              end: '22:00'
                            }">
                                    </el-time-select>
                                </td>
                                <td class="w-15 text-center">{{$i('cms_to')}}</td>
                                <td>
                                    <el-time-select :placeholder="$i('end_time')" v-model="e.endHour" :picker-options="{
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
            <div class="col-3 d-flex justify-content-between flex-wrap border-right-1">
                <div class="p-20-0">
                    <p>{{$i('cms_interview_note')}}</p>
                </div>
            </div>
            <div class="col-9">
                <div class="p-20-0">
                    <textarea name="" id="" cols="30" rows="10" v-model="objDataJobPost.interviewNote"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="group-btn-footer">
        <div class="list-item-btn">
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
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    name: "interview-setting",
    props: ['value','sameLocation'],
    data() {
        return {
            disable: false,
            stations: [{
                stationId: null,
                description: ''
            }], 
            mutablesameLocation: this.sameLocation,
            checkVali: false,
            objDataJobPost: {},
            dialogMap: false,
            mapProb: {
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
            rules: {},
            detailAddress: '',
            loadZipcode: false,
            listZipCode: [],
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
         'mutablesameLocation'(value){
            if((this.objDataJobPost.sameAddress && this.$route.params.id) || (this.objDataJobPost.sameAddress && this.$route.params.sameid) || (this.$route.params.id && this.objDataJobPost.zipCode=== null) ||(this.$route.params.sameid && this.objDataJobPost.zipCode=== null) ){
                this.objDataJobPost.zipCode = this.objDataJobPost.zipCode ? this.objDataJobPost.zipCode : this.mutablesameLocation.zipCode
                this.objDataJobPost.provinceId =  this.objDataJobPost.provinceId
                this.objDataJobPost.districtId =  this.objDataJobPost.districtId
                this.getDataStation()
                this.objDataJobPost.address =  this.objDataJobPost.address
                this.objDataJobPost.townName =  this.objDataJobPost.townName
                this.objDataJobPost.stations =  this.objDataJobPost.stations
            }else{
                if(this.objDataJobPost.sameAddress){
                 this.objDataJobPost.zipCode =  this.objDataJobPost.zipCode ?  this.objDataJobPost.zipCode : this.mutablesameLocation.zipCode
                this.objDataJobPost.provinceId =  this.objDataJobPost.provinceId
                this.objDataJobPost.districtId =  this.objDataJobPost.districtId
                this.getDataStation()
                this.objDataJobPost.address =  this.objDataJobPost.address
                this.objDataJobPost.townName =  this.objDataJobPost.townName
                this.objDataJobPost.stations =  this.objDataJobPost.stations
                }
            }
        },
          'objDataJobPost.sameAddress'(value) {
            if(value) {
                let tmp = (this.mutablesameLocation.stations && this.mutablesameLocation.stations.filter(e => e.stationId > 0))
                this.objDataJobPost.zipCode = this.mutablesameLocation.zipCode ? this.mutablesameLocation.zipCode : this.objDataJobPost.zipCode
                this.objDataJobPost.provinceId = this.mutablesameLocation.provinceId ? this.mutablesameLocation.provinceId : this.objDataJobPost.provinceId
                this.objDataJobPost.districtId = this.mutablesameLocation.districtId ? this.mutablesameLocation.districtId : this.objDataJobPost.districtId
                this.getDataStation()
                this.objDataJobPost.address = this.mutablesameLocation.address ? this.mutablesameLocation.address : this.objDataJobPost.address
                this.objDataJobPost.townName = this.mutablesameLocation.townName  ? this.mutablesameLocation.townName : this.objDataJobPost.townName
                if((this.mutablesameLocation.stations && this.mutablesameLocation.stations.filter(e => e.stationId > 0).length)){
                    this.objDataJobPost.stations = (this.mutablesameLocation.stations && this.mutablesameLocation.stations.filter(e => e.stationId > 0)) ?  this.mutablesameLocation.stations : this.objDataJobPost.stations
                }else{
                    this.objDataJobPost.stations =  this.objDataJobPost.stations ? this.objDataJobPost.stations :this.stations
                }

        }
        },
        'value.branchId'(value) {
            // this.objDataJobPost.sameAddress = false
            if (value) {
                this.getDetailBranchs()
            }
        },
        'objDataJobPost.provinceId'(value) {
            this.getDataDistrict();
            this.getDataStation();
        },
        'objDataJobPost.districtId'() {
            this.getLocationDetail();
        },
        'objDataJobPost.zipCode'(value) {
            if (value == -1 || value == '') {
                this.objDataJobPost.districtId = null;
                this.objDataJobPost.provinceId = null;
                this.objDataJobPost.townName = null;
                this.objDataJobPost.address = null
            } else {
                setTimeout(() => {
                    this.listZipCode.forEach(e => {
                        if (e.zipCode == this.objDataJobPost.zipCode) {
                            this.objDataJobPost.districtId = e.districtId;
                            this.objDataJobPost.townName = e.townName;
                            if (this.objDataJobPost.provinceId == e.provinceId) this.getDataStation();
                            else this.objDataJobPost.provinceId = e.provinceId
                        }
                    });
                }, 200);
            }

        }
    },
    methods: {
        ...mapActions(['getListZipCode', 'getListProvince', 'searchListDistrict',
            'searchListStation', 'getDetailBranch'
        ]),
        confirm() {
            this.$emit('confirmTab')
        },
        getDetailBranchs() {
            this.getDetailBranch(
                    this.value.branchId
                )
                .then(res => {
                    if (res.data) {
                        this.mutablesameLocation.zipCode = res.data.address ? res.data.address.zipCode :null
                        this.mutablesameLocation.provinceId = res.data.address ? res.data.address.provinceId :null
                        this.mutablesameLocation.districtId = res.data.address ? res.data.address.districtId :null
                        this.mutablesameLocation.townName = res.data.address ? res.data.address.townName :null
                        this.mutablesameLocation.address = res.data.address ? res.data.address.address :null
                        this.mutablesameLocation.stations = res.data.address ? res.data.address.stations :this.stations
                    }
                })
                .catch(err => {
                    this.$error(err.message);
                })
        },
        nextTab() {
            this.$emit('nextTab')
        },
        previousTab() {
            this.$emit('previousTab')
        },
        getLocationDetail() {
            if (this.province && this.province.length) {
                this.mapProb.provinceName = this.province.find(i => i.id == this.objDataJobPost.provinceId) ? this.province.find(i => i.id == this.objDataJobPost.provinceId).name : ''
            }
            if (this.listDistrict && this.listDistrict.length) {
                this.mapProb.districtName = this.listDistrict.find(i => i.id == this.objDataJobPost.districtId) ? this.listDistrict.find(i => i.id == this.objDataJobPost.districtId).name : ''
            }
            this.mapProb.townName = this.objDataJobPost.townName;
        },
        confirmMap(value) {
            this.objDataJobPost.lat = value.lat
            this.objDataJobPost.long = value.lng
        },
        revertStations() {
            this.objDataJobPost.stations = [{
                stationId: null,
                description: '',
            }]
        },
        addDate() {
            this.objDataJobPost.interviewScheduleSuggests.push({
                interviewDateId: null,
                endHour: null,
                startHour: null,
            })
            this.$forceUpdate()
        },
        removeDate(index) {
            this.objDataJobPost.interviewScheduleSuggests.splice(index, 1);
        },
        addStation() {
            this.objDataJobPost.stations.push({
                stationId: null,
                description: '',
            })
        },
        removeStation(index) {
            this.objDataJobPost.stations.splice(index, 1);
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
            }).catch(err => {
                this.loadZipcode = false
                return this.$error(err.message);
            })
        },
        getDataStation() {
            let dataSearch = Object.assign({}, this.objDataLocation);
            dataSearch.provinceId = this.objDataJobPost.provinceId;
            dataSearch.zipCode = this.objDataJobPost.zipCode;
            if (!dataSearch.provinceId && !dataSearch.zipCode) dataSearch.pageSize = 99
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
            dataSearch.provinceId = this.objDataJobPost.provinceId;
            this.searchListDistrict(dataSearch)
                .then((respon) => {
                    this.listDistrict = respon.data
                    this.objDataJobPost.districtId = this.listDistrict.map(e => e.id).find(i => i == this.objDataJobPost.districtId) ? this.objDataJobPost.districtId : null
                    this.dataInterview.listDistrict = this.listDistrict
                    this.getLocationDetail();
                    this.$emit('dataInterview', this.dataInterview)
                })
                .catch(err => {
                    this.$error(err.message);
                })
        },
        getData() {
            this.getZipCode();
            this.getDetailBranchs()
        },
    },
    mounted() {
        this.getData();
        this.objDataJobPost = this.value.interviewInformation || {};
        this.mutablesameLocation = {
            zipCode:null
        }
    }
}
</script>

<style scoped>
textarea {
    width: 100%;
}

.table td,
.table th {
    border: none !important;
}

.vue-google-map {
    height: 350px;
}
</style>
