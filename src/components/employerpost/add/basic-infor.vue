<template>
<div v-if="objDataJobPost">
    <div class="container-fluid mb-4">
        <div class="row  basic-row">
            <div class="col-3 border-right-1">
                <div class="p-20-0 d-flex justify-content-between flex-wrap">
                    <div>{{ $i('Member') }}</div>
                    <p class="required">{{$i('Required')}}</p>
                </div>
            </div>
            <div class="col-9">
                <div class="p-20-0" :class="{'is-invalid has-danger': $v.objDataJobPost.memberId.$dirty && $v.objDataJobPost.memberId.$invalid}">
                    <el-select v-model="objDataJobPost.memberId" remote filterable @input="$v.objDataJobPost.memberId.$touch()" clearable :remote-method="remoteMember" :placeholder="$i('Select')">
                        <el-option v-for="item in listMember" :key="item.id" :label="item.companyName" :value="item.id" :title="TitleCompany(item)">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="row  basic-row">
            <div class="col-3 border-right-1">
                <div class="p-20-0 d-flex justify-content-between align-objDatas-center flex-wrap">
                    <div>{{$i('cms_job_post_basic_info')}}</div>
                    <p class="required">{{$i('Required')}}</p>
                </div>
            </div>
            <div class="col-9">
                <div class="p-20-0" :class="{'is-invalid has-danger': $v.objDataJobPost.title.$dirty && $v.objDataJobPost.title.$invalid}">
                    <el-input v-model="objDataJobPost.title" @input="$v.objDataJobPost.title.$touch()"></el-input>
                </div>
            </div>
        </div>
        <div class="row basic-row">
            <div class="col-3 border-right-1">
                <div class="p-20-0 p-20-0 d-flex justify-content-between align-objDatas-center flex-wrap">
                    <div>{{$i('cms_job_post_input_search_location')}}</div>
                    <p class="required">{{$i('Required')}}</p>
                </div>
            </div>
            <div class="col-9">
                <div class="p-20-0" :class="{'is-invalid has-danger': $v.objDataJobPost.branchId.$dirty && $v.objDataJobPost.branchId.$invalid}">
                    <el-select v-model="objDataJobPost.branchId" remote clearable filterable :placeholder="$i('cms_job_post_input_search_location')" @input="$v.objDataJobPost.branchId.$touch()" @change="changeBranch">
                        <el-option v-for="item in listBranch" :key="item.id" :label="item.name" :value="item.id" :title="TitleBranch(item)">
                        </el-option>
                    </el-select>
                    <!-- <el-input v-model="objData.shopName"  @input="$v.objData.shopName.$touch()" ></el-input> -->
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
                    <label for="1" class="label-checkbox__ha  m-0" :title="!mutablesameLocation.zipCode? 'update branch info':''" :class="!mutablesameLocation.zipCode ? 'check-disabled': ''">
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
                                        <td class="w-15 text-bold pl-0">{{ $i('Zipcode') }}:</td>
                                        <td class="w-30 ">
                                            <div :class="{'is-invalid has-danger': $v.objDataJobPost.zipCode.$dirty && $v.objDataJobPost.zipCode.$invalid}">
                                                <el-select v-model.lazy="objDataJobPost.zipCode" @input="$v.objDataJobPost.zipCode.$touch()" filterable :placeholder="$i('Select')" :remote-method="remoteZipcode" clearable :loading="loadZipcode" @change="revertStations" remote :disabled="objDataJobPost.sameAddress">
                                                    <el-option v-for="objDataJobPost in listZipCode" :key="'zip' + objDataJobPost.zipCode + objDataJobPost.id" :label="objDataJobPost.zipCode + ' - ' + objDataJobPost.districtName + ' - ' + objDataJobPost.townName" :value="objDataJobPost.zipCode">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </td>
                                        <td class="w-15 text-bold">{{ $i('prefectures') }}:
                                        </td>
                                        <td class="pr-0">
                                            <div :class="{'is-invalid has-danger': $v.objDataJobPost.provinceId.$dirty && $v.objDataJobPost.provinceId.$invalid}">
                                                <el-select v-model="objDataJobPost.provinceId" @input="$v.objDataJobPost.provinceId.$touch()" remote :placeholder="$i('Province')" :disabled="objDataJobPost.sameAddress">
                                                    <el-option value=null :label="$i('Select')"></el-option>
                                                    <el-option v-for="objDataJobPost in province" :key="objDataJobPost.id" :label="objDataJobPost.name" :value="objDataJobPost.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-bold pl-0">{{$i('city')}}:</td>
                                        <td>
                                            <div :class="{'is-invalid has-danger': $v.objDataJobPost.districtId.$dirty && $v.objDataJobPost.districtId.$invalid}">
                                                <el-select v-model="objDataJobPost.districtId" @input="$v.objDataJobPost.districtId.$touch()" remote :placeholder="$i('District')" :disabled="objDataJobPost.sameAddress">
                                                    <el-option value=null :label="$i('Select')"></el-option>
                                                    <el-option v-for="objDataJobPost in listDistrict" :key="objDataJobPost.id" :label="objDataJobPost.name" :value="objDataJobPost.id">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </td>
                                        <td class="text-bold">
                                            {{$i('Village')}}:
                                        </td>
                                        <td class="pr-0">
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
                            <div class="input-address" :class="{'is-invalid has-danger': $v.objDataJobPost.address.$dirty && $v.objDataJobPost.address.$invalid}" :disabled="objDataJobPost.sameAddress">
                                <el-input type="text" v-model="objDataJobPost.address" @input="$v.objDataJobPost.address.$touch()" :disabled="objDataJobPost.sameAddress"></el-input>
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
                    <p class="required">{{$i('Required')}}</p>
                </div>
            </div>
            <div class="col-9">
                <div class="p-20-0">
                    <table class="fix-select-table table table-borderless">
                        <tbody>
                            <tr v-for="(e,i) in objDataJobPost.stations" :key="i" :class="{'is-invalid has-danger': $v.objDataJobPost.stations.$each[i].$dirty && $v.objDataJobPost.stations.$each[i].$invalid}">
                                <td>
                                    <el-select v-model="e.stationId" filterable remote clearable reserve-keyword :placeholder="$i('Station')" id="myText" >
                                        <el-option value=null :label="$i('Select')"></el-option>
                                        <el-option :remote-method="remoteStation" v-for="station in listStation" :key="station.id" :loading="loadStation" :label="station.name + ' - ' + station.trainLineName" :value="station.id">
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
            <div class="col-3 border-right-1">
                <div class="p-20-0 d-flex justify-content-between flex-wrap">
                    <div>{{$i('job_description')}}</div>
                    <p class="required">{{$i('Required')}}</p>
                </div>
            </div>
            <div class="col-9">
                <div class="p-20-0" :class="{'is-invalid has-danger': $v.objDataJobPost.description.$dirty && $v.objDataJobPost.description.$invalid}">
                    <tiny-mce @change="objDataJobPost.description = $event" :height="350" v-model="objDataJobPost.description" @input="$v.objDataJobPost.description.$touch()"></tiny-mce>
                </div>
            </div>
        </div>
        <div class="row  basic-row">
            <div class="col-3 d-flex justify-content-between flex-wrap border-right-1">
                <div class="p-20-0">
                    <p>{{$i('cms_requirement_type')}}</p>
                </div>
            </div>
            <div class="col-9">
                <div class="p-20-0">
                    <tiny-mce @change="objDataJobPost.requirements = $event" :height="350" v-model="objDataJobPost.requirements"></tiny-mce>
                </div>
            </div>
        </div>
    </div>
    <div class="group-btn-footer">
        <div class="list-item-btn">
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
import {
    required,
    minLength
} from 'vuelidate/lib/validators'
export default {
    name: "basic-infor",
    props: ['value','sameLocation'],
    validations: {
        objDataJobPost: {
            branchId: {
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
            stations: {
                minLength: minLength(1),
                required,
                $each: {
                    stationId: {
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
            disable: false,
            stations: [{
                stationId: null,
                description: ''
            }],            
            mutablesameLocation:this.sameLocation,
            listBranch: null,
            objDataBranch: {
                pageSize: 10,
                pageIndex: 1,
                employerId: null,
            },
            checkVali: false,
            mapProb: {
                provinceName: "",
                districtName: "",
                townName: "",
            },
            dialogMap: false,
            loadZipcode: false,
            loadStation: false,
            listZipCode: [],
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
                lng: parseFloat(139.7432442, 17),
            },
            zoom: parseFloat(16),
            objDataJobPost: {},
            dataBasicInfo: {},
            objDataMember: {
                pageSize: 20,
                pageIndex: 1,
                searchKeyword: ''
            },
            rules: {}
        }
    },
    components: {
        selectLocation: () => import('../../_common/selectLocation'),
    },
    watch: {
        'value'(value) {
            this.objDataJobPost = value || {};
            this.objDataJobPost.branchId = value.branch ? value.branch : null
        },
        'mutablesameLocation'(value){
            if((this.objDataJobPost.sameAddress && this.$route.params.id) || (this.objDataJobPost.sameAddress && this.$route.params.sameid) || (this.$route.params.id && this.objDataJobPost.zipCode=== null) ||(this.$route.params.sameid && this.objDataJobPost.zipCode=== null) ){
                this.objDataJobPost.zipCode = value.zipCode ? value.zipCode : this.mutablesameLocation.zipCode
                this.objDataJobPost.provinceId = value.provinceId
                this.objDataJobPost.districtId = value.districtId
                this.getDataStation()
                this.objDataJobPost.address = value.address
                this.objDataJobPost.townName = value.townName
                this.objDataJobPost.stations = value.stations
            }else{
                if(this.objDataJobPost.sameAddress){
                 this.objDataJobPost.zipCode = value.zipCode ? value.zipCode : this.mutablesameLocation.zipCode
                this.objDataJobPost.provinceId = value.provinceId
                this.objDataJobPost.districtId = value.districtId
                this.getDataStation()
                this.objDataJobPost.address = value.address
                this.objDataJobPost.townName = value.townName
                this.objDataJobPost.stations = value.stations ? value.stations : this.objDataJobPost.stations
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
                    this.objDataJobPost.stations = (this.mutablesameLocation.stations && this.mutablesameLocation.stations.filter(e => e.stationId > 0).length) ?  this.mutablesameLocation.stations : this.objDataJobPost.stations
                }else{
                    this.objDataJobPost.stations =  this.objDataJobPost.stations ? this.objDataJobPost.stations :this.stations
                }

        }
        },
        'objDataJobPost.memberId'(value) {
            if (this.$route.params.id || this.$route.params.sameid) this.getDataMemberEditOrSameJob()
            this.getDataBranch()
        },
        'objDataJobPost.branchId'(value) {
            if (value) {
                this.getDetailBranchs()
            }
        },

        'objDataJobPost.provinceId'() {
            this.getDataDistrict();
            this.getDataStation();
        },
        'objDataJobPost.districtId'() {
            this.getLocationDetail();
        },
        'objDataJobPost.zipCode'(value) {
            if (value == -1) {
                this.objDataJobPost.districtId = null;
                this.objDataJobPost.provinceId = null;
                this.objDataJobPost.townName = null;
            } else {
                setTimeout(() => {
                    this.listZipCode.forEach(e => {
                        if (e.zipCode == this.objDataJobPost.zipCode) {
                            this.objDataJobPost.districtId = null;
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
    computed: {
        ...mapGetters(['province']),
    },
    methods: {
        ...mapActions(['getListEmployerMember', 'getListZipCode', 'getListProvince', 'searchListDistrict',
            'searchListStation', 'getAllTag', 'getBranch', 'getDetailBranch'
        ]),
        getDataBranch() {
            this.objDataBranch.employerId = this.objDataJobPost.memberId
            this.getBranch(this.objDataBranch).then(res => {
                this.listBranch = res.data;
                this.objDataJobPost.branchId = this.listBranch.find(b => b.id == this.objDataJobPost.branchId) ? this.objDataJobPost.branchId : null
            }).catch(err => {
                this.$error(err.message);
            })
        },
        getDetailBranchs() {
            this.getDetailBranch(
                    this.objDataJobPost.branchId
                )
                .then(res => {
                    if (res.data) {
                        this.mutablesameLocation.zipCode = res.data.address ? res.data.address.zipCode :null
                        this.mutablesameLocation.provinceId = res.data.address ? res.data.address.provinceId :null
                        this.mutablesameLocation.districtId = res.data.address ? res.data.address.districtId :null
                        this.mutablesameLocation.townName = res.data.address ? res.data.address.townName :null
                        this.mutablesameLocation.address = res.data.address ? res.data.address.address :null
                        this.mutablesameLocation.stations = res.data.address ? res.data.address.stations : this.stations
                    }
                })
                .catch(err => {
                    this.$error(err.message);
                })
        },
        confirm() {
            let invalid = this.$v.$invalid;
            if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'), 'warning');
                return;
            } else {
                this.$emit('confirmTab')
            }
        },
        nextTab() {
            let invalid = this.$v.$invalid;
            if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'), 'warning');
                return;
            } else {
                this.$emit('nextTab')
            }
        },
        revertStations() {
            this.objDataJobPost.stations = [{
                stationId: null,
                description: '',
            }]
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
            }).catch(err => {
                this.loadZipcode = false
                return this.$error(err.message);
            })
        },
        confirmMap(value) {
            this.objDataJobPost.locationLat = value.lat
            this.objDataJobPost.locationLong = value.lng
        },
        changeBranch(){
            this.objDataJobPost.sameAddress = false
            this.objDataJobPost.interviewInformation.sameAddress = false
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
                    this.dataBasicInfo.listDistrict = this.listDistrict
                    this.getLocationDetail();
                    this.$emit('dataBasicInfo', this.dataBasicInfo)
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
                this.$emit('dataBasicInfo', this.dataBasicInfo)
                this.getDataBranch()
            }).catch(err => {
                this.$error(err.message);
            })
        },
        getDataMemberEditOrSameJob() {
            let dataSearch = Object.assign({}, this.objDataMember);
            dataSearch.id = this.objDataJobPost.memberId;
            this.getListEmployerMember(dataSearch).then(res => {
                this.listMember = res.data;
                this.dataBasicInfo.listMember = this.listMember
                this.$emit('dataBasicInfo', this.dataBasicInfo)
            }).catch(err => {
                this.$error(err.message);
            })
        },
        getData() {
            this.objDataJobPost = this.value || {};
            this.getDataMember();
            this.getZipCode();
        },
        addStation() {
            this.objDataJobPost.stations.push({
                stationId: null,
                description: '',
            })
            this.$forceUpdate()
        },
        removeStation(index) {
            this.objDataJobPost.stations.splice(index, 1);
        }
    },
    mounted() {
        this.objDataJobPost = this.value || {};
        this.getData();

    }
}
</script>

<style scoped>
.table td,
.table th {
    border: none !important;
}

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

.check-disabled,
.check-disabled .checkmark,
input:disabled {
    background-color: #F5F7FA;
    border-color: #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed !important;
}
</style>
