<template>
  <div id="tab-candidate-1" class="tab-pane fade active show">
    <div class="group-basicInfo-candidate border-frame border-top__ha">
        <div class="group-row">
         <div class="row">
          <div class="col-3 border-right__ha">
            <div class="content-candidate-left p-15">
              <div class="name-title">{{$i('full_name')}}</div>
            </div>
          </div>
          <div class="col-9">
            <div class="content-candidate-right p-y-15">
                <div class="box-row rule">
                    <div class="group-title text-bold">{{$i('cms_alphabet')}}</div>
                    <div class="group-value">
                        <input type="text" class="input-text__ha" :placeholder="$i('cms_alphabet')" v-model="objData.fullName">
                    </div>
                </div>
                <div class="box-row rule">
                    <div class="group-title text-bold"> {{$i('katakanaName_cms')}}</div>
                    <div class="group-value">
                        <input type="text" class="input-text__ha" :placeholder="$i('katakanaName_cms')" v-model="objData.katakanaName">
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
                        <div class="name-title">{{$i('birthday')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="box-row rule">
                            <div class="text-normal">
                                <el-date-picker v-model="objData.birthday" type="date" class="width-date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" :placeholder="$i('birthday')">
                                </el-date-picker>
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
                        <div class="name-title"> {{$i('phone_number')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="box-row rule justify-content-between">
                            <div class="text-normal w-100" :class="{'is-invalid has-danger': $v.objData.mobile.$dirty && $v.objData.mobile.$invalid}">
                                <el-input
                                    type='text'
                                    placeholder="##-####-####"
                                    @input="$v.objData.mobile.$touch()"
                                    v-model="objData.mobile" >
                                </el-input>
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
                        <div class="name-title"> {{$i('cms_applicant_email_address')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="box-row rule justify-content-between">
                            <div class="text-normal w-100">
                                <input type="text" class="input-text__ha" v-model="objData.email">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group-row" v-if="!$route.params.id">
            <div class="row">
                <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                        <div class="name-title"> {{$i('InputPassword')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="box-row rule justify-content-between">
                            <div class="text-normal w-100" :class="{'is-invalid has-danger': $v.objData.password.$dirty && $v.objData.password.$invalid}">
                                <el-input type="password" v-model="objData.password"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group-row" v-else="">
            <div class="row">
                <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                        <div class="name-title"> {{$i('InputPassword')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="box-row rule justify-content-between">
                            <div class="group-title text-bold w-100 pointer" @click="changePass = true">
                                {{$i('cms_employer_change_passWord')}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group-row" v-if="!$route.params.id">
            <div class="row">
                <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                        <div class="name-title"> {{$i('ConfirmPassword')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="box-row rule justify-content-between">
                            <div class="text-normal w-100" :class="{'is-invalid has-danger': $v.objData.confirmPassword.$dirty && $v.objData.confirmPassword.$invalid}">
                                <el-input type="password" v-model="objData.confirmPassword"></el-input>
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
                        <div class="name-title"> {{$i('cms_other_contact')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="box-row rule">
                            <div class="group-title"> LINE ID</div>
                            <div class="group-value">
                                <input type="text" class="input-text__ha" v-model="objData.lineUserId">
                            </div>
                        </div>
                        <div class="box-row rule">
                            <div class="group-title"> {{$i('web_FacebookUrl')}}</div>
                            <div class="group-value">
                                <input type="text" class="input-text__ha" v-model="objData.facebookUrl">
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
                        <div class="name-title">{{$i('cms_home_address')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="row mb-2">
                            <div class="col-6">
                                <div class="group-rule-text">
                                    <div class="name-title">{{$i('Zipcode')}}</div>
                                    <div class="name-value w-100">
                                        <el-select v-model.lazy="objData.address.zipCode" :placeholder="$i('Select')" :remote-method="remoteZipcode" :loading="loadZipcode" @change="revertStations" remote filterable>
                                            <el-option v-for="zc in listZipCode" :key="'zip' + zc.zipCode + zc.id" :label="zc.zipCode + ' - ' + zc.districtName + ' - ' + zc.townName" :value="zc.zipCode">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="group-rule-text">
                                    <div class="name-title">{{ $i('prefectures') }}</div>
                                    <div class="name-value w-100">
                                        <el-select v-model="objData.address.provinceId" remote filterable :placeholder="$i('Province')">
                                            <el-option v-for="pr in province" :key="pr.id" :label="pr.name" :value="pr.id">
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
                                        <el-select v-model="objData.address.districtId" remote filterable :placeholder="$i('District')">
                                            <el-option v-for="dt in listDistrict" :key="dt.id" :label="dt.name" :value="dt.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="group-rule-text">
                                    <div class="name-title">{{$i('Village')}}</div>
                                    <div class="name-value w-100">
                                        <input type="text" class="input-text__ha" v-model="objData.address.townName">
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-12">
                                <div class="group-rule-text">
                                    <div class="name-title">{{$i('Address')}}</div>
                                    <div class="name-value w-100">
                                        <input type="text" class="input-text__ha" value="3 Chome 14-21 Noguchi Bld 2F" v-model="objData.address.address">
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
                        <div class="name-title"> {{$i('nearest_station')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right Nearest p-y-15">
                        <div class="row mb-2" v-for="(e,i) in objData.address.stations" :key="i">
                            <div class="col-4">
                                <div class="group-rule-text">
                                    <div class="name-title w-100">
                                        <el-select v-model="e.stationId" :placeholder="$i('Station')">
                                            <el-option v-for="st in listStation" :key="st.id" :label="st.name + ' - ' + st.trainLineName" :value="st.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="group-rule-text">
                                    <div class="name-title w-100">
                                        <el-select v-model="e.stationId" disabled :placeholder="$i('SEARCH_trainLine')">
                                            <el-option v-for="st in listStation" :key="st.id" :label="st.trainLineName" :value="st.id">
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
                        <div class="name-title">{{$i('cms_status_residence')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="box-row rule">
                            <div class="text-normal w-100">
                                <div class="row">
                                    <div class="col-4">
                                        <el-select class="group-select__ha" v-model="objData.memberCard.residentTypeId" remote filterable clearable :placeholder="$i('cms_status_residence')">
                                            <el-option v-for="v in residentType" :key="v.id" :label="v.name" :value="v.id">
                                            </el-option>
                                        </el-select>
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
                        <div class="name-title">{{$i('cms_residence_card_number')}}</div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                        <div class="box-row rule">
                            <div class="text-normal w-100">
                                <input type="text" class="input-text__ha" value="DU12334545EA" v-model="objData.memberCard.cardCode">
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
                <div class="name-title">{{$i('residence_card_expire_date')}}</div>
                </div>
            </div>
            <div class="col-9">
                <div class="content-candidate-right p-y-15">
                <div class="box-row rule">
                    <div class="text-normal text-bold">
                    <el-date-picker
                        v-model="objData.memberCard.cardDate"
                        type="date"
                        class="width-date"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        :placeholder="$i('residence_card_expire_date')">
                    </el-date-picker>
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
                    <div class="name-title"> {{$i('cms_residence_card_photos')}}</div>
                </div>
            </div>
            <div class="col-9">
                <div class="content-candidate-right p-y-15">
                    <div class="group-img-CMND">
                        <div class="img-thumb">
                            <UploadImage v-model="objData.memberCard.cardImage1" type="avatar" class="m-auto" />
                        </div>
                        <div class="img-thumb">
                            <UploadImage v-model="objData.memberCard.cardImage2" type="avatar" class="m-auto" />
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </div>
      </div>
    <div class="group-btn-footer__ha">
        <div class="list-btn__ha">
            <div class="item-btn">
                <a href="javascript:;" class="text-links btn-confirm" @click="confirm"> {{$i('Confirm')}} </a>
            </div>
            <div class="item-btn">
                <a href="javascript:;" class="text-links btn-next" @click="nextTab"> {{$i('cms_next')}} </a>
            </div>
            <div class="item-btn">
                <a href="javascript:;" @click="$router.push('/candidatemember')" class="text-links btn-cancels">
                    {{$i('Cancel')}} </a>
            </div>
        </div>
    </div>
    <el-dialog :visible.sync="changePass" width="30%">
        <div class="row ">
            <div class="col-12">
                <div class="mb-2 text-font-20 text-center"> {{$i('cms_employer_change_passWord')}}</div>
            </div>
            <div class="col-12" :class="{'is-invalid has-danger': $v.updatePassCandidate.newPass.$dirty && $v.updatePassCandidate.newPass.$invalid}">
                {{$i('cms_employer_create_password')}}
                <el-input type="password" class="change_password" value="" v-model="updatePassCandidate.newPass" @input="$v.updatePassCandidate.newPass.$touch()"></el-input>
            </div>
            <div class="col-12" :class="{'is-invalid has-danger': $v.updatePassCandidate.confirmPass.$dirty && $v.updatePassCandidate.confirmPass.$invalid}">
                {{$i('cms_employer_create_confirm_password ')}}
                <el-input type="password" class="change_password" value="" v-model="updatePassCandidate.confirmPass" @input="$v.updatePassCandidate.confirmPass.$touch()"></el-input>
            </div>
        </div>
        <div class="row display-flex mt-5">
            <div class="col-12">
                <div class=" list-btn__ha text-center">
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-27ACCE" @click="changePassWord">
                                            {{$i('cms_execute')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-cancel" @click="changePass = false">
                                            {{$i('Cancel')}} </a>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
} from 'vuex'
import {
    required,
    email,
    sameAs
} from 'vuelidate/lib/validators'
const mustBeMobile = function(value) {
    return this.formatMobile(value)
} 
const mustBeNotText = function(value) {
    return this.formatText(value)
} 

export default {
    name: "basic-info",
    props: ['value'],
    validations: {
        objData: {
            mobile: {
                mustBeMobile, mustBeNotText
            },
            password: {
                required,
            },
            confirmPassword: {
                required, sameAs: sameAs(function() {
                    return this.objData.password;
                }) 
            },
        },
        updatePassCandidate: {
            newPass: {
                required,
            },
            confirmPass: {
                sameAs: sameAs('newPass')
            }
        }
    },
    data() {
        return {
            changePass: false,
            updatePassCandidate: {
                newPass: null,
                confirmPass: null,
            },
            objData: {
                address: {},
                memberCard: {},
                mobile: null
            },
            loading: false,
            loadZipcode: false,
            loadStation: false,
            listZipCode: [],
            listDistrict: [],
            listStation: [],
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
        }
    },
    components: {
        selectLocation: () => import('../../_common/selectLocation'),
        UploadImage: () => import('../../_common/upload')
    },
    watch: {
        'value'(value) {
            this.objData = value || {};
        },
        'objData.address.provinceId'() {
            this.getDataDistrict();
            this.getDataStation();
        },
        'objData.address.zipCode'(value) {
            if (value == -1) {
                this.objData.address.districtId = null;
                this.objData.address.provinceId = null;
                this.objData.address.townName = null;
            } else {
                setTimeout(() => {
                    this.listZipCode.forEach(e => {
                        if (e.zipCode == this.objData.address.zipCode) {
                            this.objData.address.districtId = e.districtId;
                            this.objData.address.townName = e.townName;
                            if (this.objData.address.provinceId == e.provinceId) this.getDataStation();
                            else this.objData.address.provinceId = e.provinceId;
                        }
                    });
                }, 100);
            }

        }
    },
    computed: {
        ...mapGetters(['japaneseCertification', 'residentType', 'province'])
    },
    methods: {
        ...mapActions(['getListZipCode', 'searchListDistrict',
            'searchListStation', 'getAllTag','updatePass'
        ]),
        confirm() {
            if (!this.$route.params.id) {
                let invalid = this.$v.objData.$invalid;
                    if (invalid) {
                        this.$v.objData.$touch();
                        this.validate = true
                        this.$message(this.$i('cms_job_post_enter_required_fields'), 'warning');
                        return;
                    }
                    else{
                        this.$emit('confirmTab')
                    }
            } else {
                this.$emit('confirmTab')
            }
        },
        revertStations() {
            this.objData.address.stations = [{
                stationId: null,
                description: '',
            }]
        },
        nextTab() {
            if (!this.$route.params.id) {
                let invalid = this.$v.objData.$invalid;
                    if (invalid) {
                        this.$v.objData.$touch();
                        this.validate = true
                        this.$message(this.$i('cms_job_post_enter_required_fields'), 'warning');
                        return;
                    }
                    else{
                        this.$emit('nextTab')
                    }
            } else {
                this.$emit('nextTab')
            }
            
        },
        remoteZipcode(query) {
            setTimeout(() => {
                this.getZipCode(query);
            }, 200);
        },
        getZipCode(code) {
            this.$forceUpdate()
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
        changePassWord() {
            let invalid = this.$v.updatePassCandidate.$invalid;
            if (invalid) {
                this.$v.updatePassCandidate.$touch();
                this.validate = true
                this.$message(this.$i('cms_employer_check_required'), 'warning');
                return;
            } else {
                let objConfirm = {
                    memberId: this.$route.params.id,
                    password: this.updatePassCandidate.newPass
                }
                this.updatePass(objConfirm)
                .then(res => {
                    this.$message(this.$i('Successful'));
                    this.changePass = false
                    })
                .catch(err => {
                    this.$message(this.$i(err.message),'error');;
                })
            }
                
        },
        getDataStation() {
            let dataSearch = Object.assign({}, this.objDataLocation);
            dataSearch.provinceId = this.objData.address.provinceId || -1;
            dataSearch.zipCode = this.objData.address.zipCode || -1;
            dataSearch.pageSize = 99
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
            dataSearch.provinceId = this.objData.address.provinceId || -1;
            this.searchListDistrict(dataSearch)
                .then((respon) => {
                    this.listDistrict = respon.data
                })
                .catch(err => {
                    this.$error(err.message);
                })
        },
        getData() {
            this.getZipCode();
        },
        addStation() {
            this.objData.address.stations.push({
                stationId: null,
                description: '',
            })
        },
        removeStation(index) {
            this.objData.address.stations.splice(index, 1);
        }
    },
    mounted() {
        this.objData = this.value || {};
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
.pointer {cursor: pointer;}
</style>
