<template>
    <div class="" v-if="this.objCreateBranch">
            <section class="group-content-candidate__ha">
                <div class="d-flex align-items-center template-title " >
                    <i class="fas fa-bars mr-20"></i>
                    <p class="m-0">{{$i('cms_employer_creat_or_edit')}}</p>
                </div>
                <div class="group-btn-header__ha my-4">
                    <div class="list-btn__ha">
                        <div class="item-btn">
                            <a href="javascript:;" class="text-links btn__confirm" @click="confirm"> {{$i('cms_employer_create_confirm ')}} </a>
                        </div>
                        <div class="item-btn">
                            <a href="javascript:;" class="text-links btn__cancel" @click="cancel"> {{$i('Cancel')}} </a>
                        </div>
                    </div>
                </div>
                <div class="company__details my-4">
                    <div class="tab-container mb-4">
                        <div class="group-basicInfo-candidate border-frame border__top">
                            <div class="group-row">
                                <div class="row">
                                    <div class="col-3 border-right__ha">
                                        <div class="content__job-detail__
                                                    left p-15">
                                            <div class="required__block mb-3">
                                                <div class="name-title">{{$i('cms_employer_list_employer')}}</div>
                                                <div class="required__mark">{{$i('Required')}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="content-candidate-right p-y-15">
                                            <div class="box-row rule justify-content-between">
                                                <div class="text-normal w-100" :class="{'is-invalid has-danger': $v.objCreateBranch.employerId.$dirty && $v.objCreateBranch.employerId.$invalid}">
                                                    <el-select class="w-100" 
                                                        v-model="objCreateBranch.employerId" 
                                                        clearable
                                                        filterable 
                                                        :loading="loadEmployer"
                                                        :placeholder="$i('Select')" 
                                                        @input="$v.objCreateBranch.employerId.$touch()"
                                                        :remote-method="remoteEmployer" 
                                                        remote>
                                                        <el-option v-for="(e,i) in listEmployer"  
                                                            :key="e.code + i" 
                                                            :label="e.companyName" 
                                                            :value="e.id" 
                                                            :title="$i('cms_employer_list_employer') + ': ' + e.companyName + ' \n' + $i('cms_email_branch') + ': ' + e.email + ' \n' + $i('cms_employer_create_tel') + ': ' + e.mobile">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="group-row">
                                <div class="row">
                                    <div class="col-3 border-right__ha">
                                        <div class="content__job-detail__
                                                    left p-15">
                                            <div class="required__block mb-3">
                                                <div class="name-title">{{$i('cms_name_branch')}}</div>
                                                <div class="required__mark">{{$i('Required')}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="content-candidate-right p-y-15">
                                            <div class="box-row rule justify-content-between">
                                                <div class="text-normal w-100" :class="{'is-invalid has-danger': $v.objCreateBranch.name.$dirty && $v.objCreateBranch.name.$invalid}">
                                                    <input type="text" 
                                                        class="input-text__ha" 
                                                        v-model="objCreateBranch.name"
                                                        @input="$v.objCreateBranch.name.$touch()"
                                                        placeholder="Marugame Seimen Takadanobaba">
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
                                            <div class="box-row rule justify-content-between ">
                                                <div class="d-flex w-100">
                                                    <div class="overflow-auto">
                                                        <div class="upload-block">
                                                        <Upload :employerPostImages="images" @emitImg="getImg" type="avatar" />
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
                                        <div class="content__job-detail__left p-15">
                                            <div class="required__block mb-3">
                                                <div class="name-title">{{$i('employer_job_post_detail_location')}}</div>
                                                <div class="required__mark">{{$i('Required')}}</div>
                                            </div>
                                            <div class="checkbox__wrapper">
                                                <label class="checkbox-item m-0" :title="!sameLocation.zipCode ? $i('cms_update_employer_info'):''" :class="!sameLocation.zipCode ? 'check-disabled': ''">
                                                    {{$i('cms_same_address')}}
                                                    <input type="checkbox" v-model="objCreateBranch.sameAddress" :disabled="!sameLocation.zipCode" @change="getSameAddress">
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-9" v-if="objCreateBranch.address">
                                        <Address 
                                            v-model="objCreateBranch.address" 
                                            :validate="validate" 
                                            :sameAddress="objCreateBranch.sameAddress"
                                            @getStation="getDataStation" 
                                            @revertStation="revertStations"/> 
                                        <div class="content__job-detail__right p-y-15">
                                            <div class="row ">
                                                <div class="col-6">
                                                    <div class="group-rule-text">
                                                        <div class="name-title">{{$i('cms_employer_create_tel')}}</div>
                                                        <div class="name-value w-100" :class="{'is-invalid has-danger': $v.objCreateBranch.mobile.$dirty && $v.objCreateBranch.mobile.$invalid}">
                                                            <el-input 
                                                                type='text'
                                                                :disabled="objCreateBranch.sameAddress" 
                                                                placeholder="##-####-####"
                                                                @input="$v.objCreateBranch.mobile.$touch()"
                                                                v-model="objCreateBranch.mobile">
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="group-rule-text">
                                                        <div class="name-title">{{$i('cms_employer_create_fax')}}</div>
                                                        <div class="name-value w-100" :class="{'is-invalid has-danger': $v.objCreateBranch.fax.$dirty && $v.objCreateBranch.fax.$invalid}">
                                                            <el-input
                                                                type='text'
                                                                :disabled="objCreateBranch.sameAddress" 
                                                                @input="$v.objCreateBranch.fax.$touch()"
                                                                placeholder="##-####-####"
                                                                v-model="objCreateBranch.fax">
                                                            </el-input>
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
                                            <div class="required__block mb-3">
                                                <div class="name-title">{{$i('employer_dashboard_nearest_station_table_2')}}</div>
                                                <div class="required__mark">{{$i('Required')}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="content-candidate-right p-y-15" v-if="objCreateBranch.address">
                                            <div class="box-row rule justify-content-between">
                                                <div class="content-candidate-right Nearest p-y-15 w-100">
                                                    <div class="row mb-2" v-for="(e,i) in objCreateBranch.address.stations" :key="i" :class="{'is-invalid has-danger': $v.objCreateBranch.address.stations.$each[i].$dirty && $v.objCreateBranch.address.stations.$each[i].$invalid}">
                                                        <div class="col-11">
                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <div class="group-rule-text">
                                                                        <div class="name-title w-100">
                                                                            <el-select v-model="e.stationId"
                                                                                    filterable remote clearable reserve-keyword
                                                                                    :remote-method="remoteStation"
                                                                                    :placeholder="$i('Station')">
                                                                                <el-option
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
                                                                                        collapse-tags
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
                                                                <div class="col-4">
                                                                    <div class="group-rule-text">
                                                                        <div class="name-title w-100">
                                                                            <input type="number" :placeholder="$i('WalkingMinute')" class="form-control" v-model="e.description">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-1">
                                                            <div>
                                                                <div v-if="i!=0" @click="removeStation(i)" class="minus__wrapper">
                                                                    <i class="fas fa-2x fa-minus-circle ml-auto"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ml-3">
                                                    <i class="fas fa-2x fa-plus-circle" @click="addStation()"></i>
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
                                            <div class="required__block mb-3">
                                                <div class="name-title">{{$i('cms_email_branch')}}</div>
                                                <div class="required__mark">{{$i('Required')}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-9">
                                        <div class="content-candidate-right p-y-15">
                                            <div class="box-row rule justify-content-between">
                                                <div class="text-normal w-100" :class="{'is-invalid has-danger': $v.objCreateBranch.email.$dirty && $v.objCreateBranch.email.$invalid}">
                                                    <input type="text" 
                                                        class="input-text__ha" 
                                                        v-model="objCreateBranch.email" 
                                                        @input="$v.objCreateBranch.email.$touch()"
                                                        placeholder="contact@laboro.jp">
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
                                        <div class="content-candidate-right p-y-15" :class="{'is-invalid has-danger': $v.objCreateBranch.description.$dirty && $v.objCreateBranch.description.$invalid}">
                                            <tiny-mce :height="450" v-model="objCreateBranch.description" @input="$v.objCreateBranch.description.$touch()" @change="objCreateBranch.description = $event"></tiny-mce>
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
                                            <div class="box-row rule justify-content-between">
                                                <div class="row">
                                                    <div class="col-12 d-flex flex-wrap">
                                                        <div class="content-candidate-right p-y-15">
                                                            <div class="box-row rule justify-content-between">
                                                                <div class="row">
                                                                    <div class="col-12 mb-3">
                                                                        <label class="checkbox-item m-0">
                                                                            {{$i('employer_24_hours_open')}}
                                                                            <input type="checkbox" v-model="objCreateBranch.openFullDay">
                                                                            <span class="checkmark"></span>
                                                                        </label>
                                                                    </div>
                                                                    <div class="col-12 mb-3">
                                                                        <label class="checkbox-item m-0">
                                                                            {{$i('employer_always_open')}}
                                                                            <input type="checkbox" v-model="objCreateBranch.allDayOpen" name="">
                                                                            <span class="checkmark"></span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex align-items-center w-100 checkbox-show-text mb-4">
                                                                <div class="">
                                                                    <div class="group-rule-text">
                                                                    <div class=" w-100">
                                                                        <el-time-select
                                                                        :disabled="objCreateBranch.openFullDay"
                                                                        :placeholder="$i('start_time')"
                                                                        v-model="objCreateBranch.openTime"
                                                                        value-format="HH:mm:ss"
                                                                        format="HH:mm:ss"
                                                                        :picker-options="{
                                                                            start: '06:00',
                                                                            step: '00:15',
                                                                            end: '23:45',
                                                                        
                                                                        }">
                                                                        </el-time-select>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                <div class="px-5"> {{$i('employer_to_time')}}
                                                                </div>
                                                                <div class="">
                                                                    <div class="group-rule-text">
                                                                    <div class=" w-100">
                                                                        <el-time-select
                                                                        :placeholder="$i('end_time')"
                                                                        :disabled="objCreateBranch.openFullDay"
                                                                        v-model="objCreateBranch.closeTime"
                                                                        value-format="HH:mm:ss"
                                                                        format="HH:mm:ss"
                                                                        :picker-options="{
                                                                            start: '06:00',
                                                                            step: '00:15',
                                                                            end: '24:00',
                                                                            minTime: objCreateBranch.openTime
                                                                        }">
                                                                        </el-time-select>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                                <div class="row w-100 checkbox-show-text checkbox-wh-20">   
                                                                <div class="col-2"> {{$i('employer_regular_holiday')}}
                                                                </div>
                                                                <div class="col-10 d-flex flex-wrap">
                                                                    <el-checkbox-group v-model="dayoffIds" @change="checkedDateChange" :disabled="objCreateBranch.allDayOpen">
                                                                    <el-checkbox v-for="(e,i) in dateWeeks" :label="e.id" :key="i">{{e.name}}</el-checkbox>
                                                                    </el-checkbox-group>
                                                                </div>
                                                                </div>
                                                                <div class="row w-100 checkbox-show-text checkbox-wh-20">
                                                                <div class="col-2">
                                                                </div>
                                                                <div class="col-10 d-flex flex-wrap">
                                                                    <el-checkbox v-model="objCreateBranch.publicHoliday" :disabled="objCreateBranch.allDayOpen">{{$i('cms_public_holiday')}}
                                                                    </el-checkbox>
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
                                                        <div class="col-6">
                                                            <select type="text" class="input-text__ha" v-model="objCreateBranch.section"> 
                                                                <option v-for="e in listSection"
                                                                    :key= e.id
                                                                    :value="e.id">
                                                                    {{$i(e.name)}}
                                                                </option>
                                                            </select>
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
                <div class="group-btn-header__ha my-4">
                    <div class="list-btn__ha">
                        <div class="item-btn">
                            <a href="javascript:;" class="text-links btn__confirm" @click="confirm"> {{$i('cms_employer_create_confirm ')}} </a>
                        </div>
                        <div class="item-btn">
                            <a href="javascript:;" class="text-links btn__cancel" @click="cancel"> {{$i('Cancel')}} </a>
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
    import {
        required,
        minLength,
        maxLength,
        email
        } from 'vuelidate/lib/validators'
    import {BranchSection} from '../../../types/enum'
    const mustBeMobile = function(value) {
        return this.formatMobile(value)
    } 
    const mustBeNotText = function(value) {
        return this.formatText(value)
    } 

    export default {
        name:'form-branch',
        props: {
            value: {
                type: Object
            },
        },
        validations: {
            objCreateBranch: {
                employerId: {
                    required
                },
                name: {
                    required,  maxLength: maxLength(500) 
                },
                email: {
                    required, email, maxLength: maxLength(200),
                },
                mobile: {
                    required, mustBeMobile, mustBeNotText
                },
                fax: {
                    required, mustBeMobile, mustBeNotText
                },
                description: {
                    maxLength: maxLength(500)
                },
                address: {
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
                        required, maxLength: maxLength(500)
                    },
                    stations: {
                        minLength: minLength(1),
                        required,
                        $each: {
                            stationId: {
                                required
                            },
                            description: {
                                required, maxLength: maxLength(500),
                            },
                        }
                    },
                }
            }
        },
        data() {
            return {
                images2: [],
                images: [],
                objDataCds: {
                    pageIndex: 1,
                    pageSize: 9999
                },
                dayoffIds:[],
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
                loadEmployer: false,
                loadZipcode: false,
                sameLocation: {
                    zipCode: null,
                    provinceId: null,
                    districtId: null,
                    townName: null,
                    address: null,
                    mobile: null,
                    fax: null,
                },
                listEmployer: [],
                listStation: [],
                validate: false,
                loadStation: false,
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
        
        components: {
            Upload: () => import('../../_common/compress-file'),
            Address: () => import('../../_shared/address')
        },
        computed: {
            ...mapGetters(['province', 'dateWeeks']),
        },
        
        watch: {
            'sameLocation.zipCode' (newValue, oldValue) {
                if(newValue && oldValue) this.objCreateBranch.sameAddress = false
            },
            'objCreateBranch.employerId' (value) {
                if(value) {
                    this.getDetailEmployer()
                }else {
                    this.reverSameLocation()
                }
            },
            'objCreateBranch.sameAddress'(value) {
                if(value) { 
                    this.getAddress()
                }
            },
            'dayoffIds': {
                handler: function (value) {
                this.objCreateBranch.dayoffIds = [...value];
                this.$emit('input', this.objCreateBranch)
                },
                deep: true,
            },

            'images2': {
                handler: function (value) {
                    this.objCreateBranch.images = [...value];
                    this.$emit('input', this.objCreateBranch)
                },
                deep: true,
            },
            'objCreateBranch.allDayOpen'(value) {
                if(value) {
                    setTimeout(() => {
                        this.checkAllDate(true)
                        this.objCreateBranch.publicHoliday = true
                    },200)
                }
            },
            'objCreateBranch.openFullDay'(value) {
                if(value) {
                    this.objCreateBranch.openTime = null;
                    this.objCreateBranch.closeTime = null;
                }
            }
        },
        methods: {
            ...mapActions([ 'searchListStation', 'getMiniEmployer', 'getDetailEmployerMember']),
            getDetailEmployer() {
                this.getDetailEmployerMember({
                        id: this.objCreateBranch.employerId
                    })
                    .then(res => {
                        this.objCreateBranch.companyName = res.data.companyName ? res.data.companyName : null
                        if(res.data && res.data.address) {
                            this.sameLocation.zipCode = res.data.address.zipCode
                            this.sameLocation.provinceId = res.data.address.provinceId
                            this.sameLocation.districtId = res.data.address.districtId
                            this.sameLocation.townName = res.data.address.townName
                            this.sameLocation.address = res.data.address.address
                            this.sameLocation.mobile = res.data.mobile
                            this.sameLocation.fax = res.data.fax
                            if(this.objCreateBranch.sameAddress && this.$route.params.id) {
                                this.getAddress()
                            }
                        } else {
                            this.objCreateBranch.sameAddress = false
                            this.reverSameLocation()
                        }
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            },
            reverSameLocation() {
                    this.sameLocation.zipCode = null;
                    this.sameLocation.provinceId = null;
                    this.sameLocation.districtId = null;
                    this.sameLocation.address = null;
                    this.sameLocation.townName = null;
                    this.sameLocation.mobile = null;
                    this.sameLocation.fax = null;
            },
            getAddress() {
                this.objCreateBranch.address.zipCode = this.sameLocation.zipCode
                this.objCreateBranch.address.address = this.sameLocation.address
                this.objCreateBranch.address.provinceId = this.sameLocation.provinceId
                this.objCreateBranch.address.districtId = this.sameLocation.districtId
                this.objCreateBranch.address.townName = this.sameLocation.townName
                this.objCreateBranch.fax = this.sameLocation.fax
                this.objCreateBranch.mobile = this.sameLocation.mobile
            }, 
            getSameAddress(value) {
                if(this.objCreateBranch.sameAddress) this.revertStations();
            },
            checkAllDate(val) {
                this.dayoffIds = val ? this.dateWeeks.map(e => e.id) : []; 
                this.isIndeterminate = false;
            },
            checkedDateChange(value) {
                let checkedCount = value.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.dateWeeks.length;  
            },
            getListEmployer(keyword, id) {
                let obj = {}
                if(keyword) obj.searchKeyword = keyword.trim()
                if(id) obj.employerId = id 
                obj.pageSize = 20
                this.getMiniEmployer(obj)
                    .then((res) => {
                        this.loadEmployer = false
                        this.listEmployer = res.data;
                        let index = 1
                        this.listEmployer.map(e => {
                            e.code = index
                            index++
                        })
                    })
                    .catch(err => {
                        this.loadEmployer = false
                        this.$error(err.message);
                    })
            },
            remoteEmployer(query) {
                this.objCreateBranch.queryEmployer = query
                this.loadEmployer = true
                setTimeout(() => {
                    this.getListEmployer(query, null);
                }, 200);
            },
            getImg(value) {
                this.images2 = value
            },
            // get station
            addStation() {
                this.objCreateBranch.address.stations.push({
                    stationId:null,
                    description:'',
                })
                this.$forceUpdate()
            },
            removeStation(index) {
                this.objCreateBranch.address.stations.splice(index, 1);
            },
            revertStations() {
                this.objCreateBranch.address.stations = [{
                stationId: null,
                description:'',
                }]
            },
            remoteStation() {
                this.loadStation = true;
            },
            getDataStation() {
                let dataSearch = Object.assign({}, this.objDataLocation);
                dataSearch.provinceId = this.objCreateBranch.address.provinceId;
                dataSearch.zipCode = this.objCreateBranch.address.zipCode;
                if(!dataSearch.provinceId && !dataSearch.zipCode) dataSearch.pageSize = 999
                this.searchListStation(dataSearch)
                    .then((res) => {
                        this.listStation = res.data
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
            },

            cancel() {
                return this.$router.push('/branch');
            },
            getData() {
                this.getListEmployer(null, this.objCreateBranch.employerId)
            },

            confirm() {
                let invalid = this.$v.$invalid;
                if (invalid) {
                    this.$v.$touch();
                    this.validate = true
                    window.scroll({top: 150, left: 0, behavior: 'smooth' });
                   
                    
                    return;
                }
                else{
                    this.$emit('tab', 2)
                }
            },

        },
        mounted() {
            this.objCreateBranch = this.value || {}
            this.dayoffIds = [...this.objCreateBranch.dayoffIds];
            this.images = [...this.objCreateBranch.images]
            this.getData()
        }
    }
</script>

<style scoped>
    .input-text__ha::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .check-disabled, .check-disabled .checkmark, input:disabled {
        background-color: #F5F7FA;
        border-color: #E4E7ED;
        color: #C0C4CC;
        cursor: not-allowed !important;
    }
</style>
