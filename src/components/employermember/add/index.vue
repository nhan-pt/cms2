<template>
<div class="" v-if="this.objectData">
        <section class="group-content-candidate__ha">
            <div class="d-flex align-items-center template-title ">
                <i class="fas fa-bars mr-20"></i>
                <p class="m-0">{{$i('cms_employer_creat_or_edit')}}</p>
            </div>
            <div class="group-btn-header__ha">
                <div class="list-btn__ha">
                    <div class="item-btn">
                        <a href="#" class="text-links btn__confirm" @click="confirm"> {{$i('cms_employer_create_confirm ')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="#" class="text-links btn__clear" @click="resetFilters"> {{$i('cms_employer_list_clear')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="#" class="text-links btn__cancel" @click="cancel"> {{$i('cms_employer_create_cancel')}} </a>
                    </div>
                </div>
            </div>
            <section class="panelhead-candidate__ha d-flex align-items-center">
                <div class="heading-1 name-title-page__ha mr-10 "> {{$i('cms_employer_create_company_logo')}} </div>
                <div class="heading-1 name-title-page__ha">
                    <UploadImage v-model="objectData.avatar" type="avatar" class="image" />
                </div>
            </section>
            <div class="company__details mb-4">
                <div class="panelhead-candidate__ha">
                    <div class="heading-1 name-title-page__ha"> {{$i('cms_employer_create_company_detail')}} </div>
                </div>
                <div class="employer__content">
                    <div class="group-basicInfo-candidate border-frame border__top">
                        <div class="group-row">
                            <div class="row">
                                <div class="col-3 border-right__ha">
                                    <div class="content-candidate-left p-15">
                                        <div class="required__block">
                                            <div class="name-title">{{$i('cms_employer_create_company_name')}}</div>
                                            <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule justify-content-between">
                                            <div class="text-normal w-100" :class="{'is-invalid has-danger': $v.objectData.companyName.$dirty && $v.objectData.companyName.$invalid}">
                                                    <el-input type="text"  placeholder="" v-model="objectData.companyName" @input="$v.objectData.companyName.$touch()"></el-input>
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
                                        <div class="name-title">{{$i('cms_employer_create_Catch_Phrase')}}</div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule justify-content-between">
                                            <div class="text-normal w-100">
                                                <input type="text" class="input-text__ha" v-model="objectData.catchPhrase">
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
                                        <div class="name-title">{{$i('cms_employer_create_PR')}}</div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule justify-content-between">
                                            <div class="text-normal w-100">
                                                <tiny-mce :height="450" @change="objectData.publicRelation = $event" v-model="objectData.publicRelation"></tiny-mce>
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
                                        <div class="name-title">{{$i('cms_employer_create_photo')}}</div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <Upload :employerPostImages="employerPostImages" @emitImg="getImg" type="avatar" />
                                </div>
                            </div>
                        </div>
                        <div class="group-row">
                            <div class="row">
                                <div class="col-3 border-right__ha">
                                    <div class="content-candidate-left p-15">
                                        <div class="name-title"> {{$i('cms_employer_create_Company_introduction')}} </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="">
                                            <tiny-mce :height="450" @change="objectData.companyIntrodution = $event" v-model="objectData.companyIntrodution"></tiny-mce>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="company__introduction">
                <div class="panelhead-candidate__ha">
                    <div class="heading-1 name-title-page__ha"> {{$i('cms_employer_create_Company_introduction')}}</div>
                </div>
                <div class="employer__content">
                    <div class="group-basicInfo-candidate border-frame border__top">
                        <div class="group-row">
                            <div class="row">
                                <div class="col-3 border-right__ha">
                                    <div class="content__job-detail__
                                                            left p-15">
                                        <div class="required__block">
                                            <div class="name-title">{{$i('cms_employer_create_location')}}</div>
                                            <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content__job-detail__right p-y-15">
                                        <div class="row mb-3">
                                            <div class="col-6">
                                                <div class="group-rule-text">
                                                    <div class="name-title">{{$i('cms_employer_create_zipcode')}}</div>
                                                    <div class="name-value w-100 d-flex align-items-center" :class="{'is-invalid has-danger': $v.objectData.address.zipCode.$dirty && $v.objectData.address.zipCode.$invalid}">
                                                            <el-select v-model="objectData.address.zipCode" @input="$v.objectData.address.zipCode.$touch()" filterable :placeholder="$i('Select')" :remote-method="remoteZipcode" remote>
                                                                <el-option value="-1" :label="$i('Select')"></el-option>
                                                                <el-option v-for="objData in listZipCode" :key="objData.id" :label="objData.zipCode + ' - ' + objData.districtName + ' - ' + objData.townName" :value="objData.zipCode">
                                                                </el-option>
                                                            </el-select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="group-rule-text">
                                                    <div class="name-title">{{$i('cms_employer_create_prefecture')}}</div>
                                                    <div class="name-value w-100" :class="{'is-invalid has-danger': $v.objectData.address.provinceId.$dirty && $v.objectData.address.provinceId.$invalid}">
                                                            <el-select v-model="objectData.address.provinceId" filterable @input="$v.objectData.address.provinceId.$touch()" :placeholder="$i('Select')" remote>
                                                                <el-option value="-1" :label="$i('Select')"></el-option>
                                                                <el-option v-for="objData in listProvinces" :key="objData.id" :label="objData.name" :value="objData.id">
                                                                </el-option>
                                                            </el-select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-6">
                                                <div class="group-rule-text">
                                                    <div class="name-title">{{$i('cms_employer_create_city')}}</div>
                                                    <div class="name-value w-100" :class="{'is-invalid has-danger': $v.objectData.address.districtId.$dirty && $v.objectData.address.districtId.$invalid}">
                                                            <el-select v-model="objectData.address.districtId" filterable @input="$v.objectData.address.districtId.$touch()" :placeholder="$i('Select')" remote>
                                                                <el-option value="-1" :label="$i('Select')"></el-option>
                                                                <el-option v-for="objData in listDistrict" :key="objData.id" :label="objData.name" :value="objData.id">
                                                                </el-option>
                                                            </el-select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="group-rule-text">
                                                    <div class="name-title">{{$i('cms_employer_create_town')}}</div>
                                                    <div class="name-value w-100">
                                                        <el-input type="text" class="" value="Takada" v-model="objectData.address.townName"></el-input>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-12">
                                                <div class="group-rule-text">
                                                    <div class="name-title">{{$i('cms_employer_create_detail_address')}}</div>
                                                    <div class="name-value w-100" :class="{'is-invalid has-danger': $v.objectData.address.address.$dirty && $v.objectData.address.address.$invalid}">
                                                            <el-input type="text" class="" @input="$v.objectData.address.address.$touch()" value="3 Chome 14-21 Noguchi Bld 2F" v-model="objectData.address.address"></el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row ">
                                            <div class="col-6">
                                                <div class="group-rule-text">
                                                    <div class="name-title">{{$i('cms_employer_create_tel')}}</div>
                                                    <div class="name-value w-100" :class="{'is-invalid has-danger': $v.objectData.mobile.$dirty && $v.objectData.mobile.$invalid}">
                                                            <el-input type="number" class="" v-model="objectData.mobile" @input="$v.objectData.mobile.$touch()"></el-input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="group-rule-text">
                                                    <div class="name-title">{{$i('cms_employer_create_fax')}}</div>
                                                    <div class="name-value w-100" :class="{'is-invalid has-danger': $v.objectData.fax.$dirty && $v.objectData.fax.$invalid}">
                                                            <el-input type="number" class="" v-model="objectData.fax" @input="$v.objectData.fax.$touch()"></el-input>
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
                                        <div class="name-title"> {{$i('cms_employer_create_Established')}} </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col-6">
                                                    <div class="texts w-100">
                                                        <el-input type="number" class="" value="2018" v-model="objectData.established"></el-input>
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
                                        <div class="name-title"> {{$i('cms_employer_list_capital')}} </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col-6">
                                                    <div class="texts w-100">
                                                        <input type="text" class="input-text__ha" name="capital" v-model="objectData.capital" v-bind="money" />
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
                                        <div class="name-title">{{$i('cms_employer_create_Revenue')}} </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col-6">
                                                    <div class="texts w-100">
                                                        <input type="text" class="input-text__ha" name="revenue" v-model="objectData.revenue" v-bind="money" />
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
                                        <div class="name-title"> {{$i('cms_employer_create_public_or_private')}} </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col-6">
                                                    <div class="texts w-100">
                                                        <el-select v-model="objectData.section" collapse-tags class="input-search-2 input-chosen" :placeholder="$i('cms_job_post_non_publish')">
                                                            <el-option v-for="e in listSection" :value="e.id" :key="e.id" :label="$i(e.label)"></el-option>
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
                                        <div class="name-title">{{$i('cms_employer_list_Status')}} </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col-6">
                                                    <div class="texts w-100">
                                                        <el-select v-model="objectData.status" collapse-tags class="input-search-2 input-chosen" :placeholder="$i('cms_job_post_non_publish')">
                                                            <el-option v-for="e in listStatus" :value="e.id" :key="e.id" :label="$i(e.label)"></el-option>
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
                                        <div class="name-title">{{$i('cms_employer_create_Representative')}}</div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col-6">
                                                    <div class="texts w-100">
                                                        <input type="text" class="input-text__ha" value="Noguchi Yusuke" v-model="objectData.representative">
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
                                        <div class="name-title"> {{$i('cms_employer_create_employees_number')}} </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col-6">
                                                    <div class="texts w-100">
                                                        <input type="number" class="input-text__ha" value="1000 people" placeholder="0" v-model="objectData.totalEmployee">
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
                                    <div class="content__job-detail__
                                                                left p-15">
                                        <div class="required__block">
                                            <div class="name-title">{{$i('cms_employer_create_service_area')}}</div>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content__job-detail__right p-y-15">
                                        <tiny-mce :height="450" @change="objectData.serviceArea = $event" v-model="objectData.serviceArea"></tiny-mce>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="group-row">
                            <div class="row">
                                <div class="col-3 border-right__ha">
                                    <div class="content__job-detail__
                                                                left p-15">
                                        <div class="required__block">
                                            <div class="name-title">{{$i('cms_employer_create_business_description ')}}</div>
                                            <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content__job-detail__right p-y-15" :class="{'is-invalid has-danger': $v.objectData.businessDescription.$dirty && $v.objectData.businessDescription.$invalid}">
                                        <tiny-mce :height="450" v-model="objectData.businessDescription" @change="objectData.businessDescription = $event" @input="$v.objectData.businessDescription.$touch()"></tiny-mce>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="group-row">
                            <div class="row">
                                <div class="col-3 border-right__ha">
                                    <div class="content-candidate-left p-15">
                                        <div class="name-title">{{$i('cms_employer_company_website')}}</div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col">
                                                    <div class="texts w-100">
                                                        <input type="url" class="input-text__ha" value="contact@laboro.jp" v-model="objectData.companyWebsite">
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
                                        <div class="required__block">
                                            <div class="name-title">{{$i('cms_employer_create_detail_address')}}</div>
                                            <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col">
                                                    <div class="texts w-100" :class="{'is-invalid has-danger': $v.objectData.email.$dirty && $v.objectData.email.$invalid}">
                                                            <el-input type="email" class="" value="" v-model="objectData.email" @input="$v.objectData.email.$touch()"></el-input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="group-row" v-if="!this.$route.params.id">
                            <div class="row">
                                <div class="col-3 border-right__ha">
                                    <div class="content-candidate-left p-15">
                                        <div class="required__block">
                                            <div class="name-title">{{$i('cms_employer_create_password')}}</div>
                                            <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col">
                                                    <div class="texts w-100" :class="{'is-invalid has-danger': $v.objectData.password.$dirty && $v.objectData.password.$invalid}">
                                                            <el-input type="password" class="" value="" v-model="objectData.password" @input="$v.objectData.password.$touch()"></el-input>
                                                    </div>
                                                </div>
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
                                        <div class="required__block">
                                            <div class="name-title">{{$i('cms_employer_create_password')}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col">
                                                    <div class="texts w-100 text_changePassword" @click="changePass = true">
                                                        {{$i('cms_employer_change_passWord')}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="group-row" v-if="!this.$route.params.id">
                            <div class="row">
                                <div class="col-3 border-right__ha">
                                    <div class="content-candidate-left p-15">
                                        <div class="required__block">
                                            <div class="name-title">{{$i('cms_employer_create_confirm_password ')}}</div>
                                            <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <div class="content-candidate-right p-y-15">
                                        <div class="box-row rule">
                                            <div class="row w-100">
                                                <div class="col">
                                                    <div class="texts w-100">
                                                        <input type="password" class="input-text__ha" v-model="confirmPassword">
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
            <div class="group-btn-footer__ha">
                <div class="list-btn__ha">
                    <div class="item-btn">
                        <a href="#" class="text-links btn__confirm" @click="confirm"> {{$i('cms_employer_create_confirm ')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="#" class="text-links btn__clear" @click="resetFilters"> {{$i('cms_employer_list_clear')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="#" class="text-links btn__cancel" @click="cancel"> {{$i('cms_employer_create_cancel')}} </a>
                    </div>
                </div>
            </div>
            <el-dialog :visible.sync="changePass" width="30%">
               <changePassWord v-model="objDataPass" @close="changePass=false" @changePass="changePassWord"></changePassWord>
            </el-dialog>
        </section>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    Money
} from 'v-money';
import {
    required,
    email,
    sameAs
} from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import Vue from 'vue'
import {
    EmployerSection,
    EmployerStatus
} from '../../../types/enum'
import changePassWord from '../modal/changepassword'
Vue.use(Vuelidate)
const mustBeMobile = function(value) {
    return this.formatMobile(value)
} 
const mustBeNotText = function(value) {
    return this.formatText(value)
} 
const isEdit = function(value) {
    if(this.$route.params.id){
        return true;
    }
    else{
        if(value){
            return true
        }
    }
    return false
} 
export default {
    data() {
        return {
            objDataPass:{
                newPass: null,
                confirmPass: null,
            },     
            changePass: false,
            money: {
                decimal: ',',
                thousands: '.',
                precision: 0,
                masked: false
            },
            employerPostImages: [],
            employerImages: [],
            checkDescription: false,
            rules: {},
            confirmPassword: "",
            objDataCds: {
                pageIndex: 1,
                pageSize: 9999
            },
            listSection: [{
                    id: EmployerSection.PUBLIC,
                    label: 'cms_employer_list_public',
                    status: 'public',
                    class: 'btn__pill__green'
                },
                {
                    id: EmployerSection.PRIVATE,
                    label: 'cms_employer_list_private',
                    status: 'private',
                    class: 'btn__pill__red'
                },

            ],
            listStatus: [{
                    id: EmployerStatus.UNCONFIRM,
                    label: 'cms_employer_list_unconfirm',
                    status: 'UNCONFIRM',
                    class: 'btn__pill__green'
                },
                {
                    id: EmployerStatus.ACTIVE,
                    label: 'cms_employer_list_active',
                    status: 'ACTIVE',
                    class: 'btn__pill__red'
                },

            ],
            listDistrict: [],
            listProvinces: [],
            listZipCode: [],
            objData: {},
            objDataLocation: {
                zipCode: -1,
                provinceId: -1,
                pageIndex: 1,
                pageSize: 9999,
                status: 1,
            },

            objectData: {
                address: {}
            },

        }

    },
    props: {
        detail: {
            type: Object
        },
        onTabClick: {
            type: Function
        },
        value: {
            type: Object
        },

    },
    validations: {
        objectData:{
            companyName:{
                required
            },
            businessDescription:{
                required
            },
            mobile:{
                required,mustBeMobile,mustBeNotText
            },
            fax:{
                required,mustBeMobile,mustBeNotText
            },
            email:{
                required,
                email
            },
            password:{
                // required,
                isEdit
            },
            address:{
                provinceId:{
                    required
                },
                districtId:{
                    required
                },
                zipCode:{
                    required
                },
                address:{
                    required
                }
            },
        }
    },
    components: {
        Money,
        UploadImage: () => import('../../_common/upload'),
        Upload: () => import('../../_common/compress-file'),
        changePassWord
    },
    watch: {
        'employerPostImages'(value) {
            this.objectData.images = [...value];
        },

        'employerImages': {
            handler: function (value) {
                this.objectData.images = [...value];
                this.$emit('input', this.objectData)
            },
            deep: true,
        },
        'value'(value) {
            this.objectData = value || {};
        },
        'objectData.address.provinceId'() {
            this.getDataDistrict();

        },
        'objectData.address.districtId'() {

        },
        'objectData.address.zipCode'(value) {
            if (value == -1) {
                this.objectData.address.districtId = null;
                this.objectData.address.provinceId = null;
                this.objectData.address.townName = null;
            } else {
                setTimeout(() => {
                    this.listZipCode.forEach(e => {
                        if (e.zipCode == this.objectData.address.zipCode) {
                            this.objectData.address.districtId = null;
                            this.objectData.address.districtId = e.districtId;
                            this.objectData.address.provinceId = e.provinceId;
                            this.objectData.address.townName = e.townName;
                        }
                    });
                }, 200);
            }

        }
    },
    methods: {
        ...mapActions(['getListZipCode', 'getListProvince', 'searchListDistrict', 'updatePass']),
        getImg(value) {
            this.employerImages = value
        },
        //get list zipcode
        getListZipCodes() {

            this.getListZipCode()
                .then((respon) => {
                    this.listZipCode = respon.data
                    var index = 1
                    this.listZipCode.map(e => {
                        e.id = index
                        index++
                    })
                }).catch((error) => {
                    this.$error(error.message);
                })
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
        //get list distric 
        getDataDistrict() {
            let dataSearch = Object.assign({}, this.objDataLocation);
            dataSearch.provinceId = this.objData.provinceId;
            this.searchListDistrict(dataSearch)
                .then((respon) => {
                    this.listDistrict = respon.data

                })
                .catch(err => {
                    this.$error(err.message);
                })
        },
        //get list province
        getDataProvince() {
            this.getListProvince(this.objDataCds)
                .then((respon) => {
                    this.listProvinces = respon.data;
                })
                .catch(err => {
                    this.$error(err.message);
                })
        },
        cancel() {

            return this.$router.push('/employermember');

        },
        getData() {
            this.getDataProvince();
            this.getListZipCodes();
            this.getDataDistrict();
            this.getZipCode();

        },

        confirm() {
             let invalid = this.$v.$invalid;
                if (invalid) {
                    this.$v.$touch();
                    this.$message(this.$i('cms_job_post_enter_required_fields'), 'warning');
                    return;
                }
                if (!this.$route.params.id) {
                    if (this.objectData.password === this.confirmPassword) {
                        this.$emit('create', this.objectData)
                        this.onTabClick(2)
                    } else {
                        this.$error(this.$i('cms_employer_create_check_email'));
                    }
                } else {
                    this.$emit('create', this.objectData)
                    this.onTabClick(2)
                }
        },
        resetFilters() {
            this.$emit('resetFilters');

        },
          changePassWord() {
            let invalid = this.$v.$invalid;
            if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'), 'warning');
                return;
            }
            if (this.newPass === this.confirmPass) {
                let objConfirm = {
                    memberId: this.$route.params.id,
                    password: this.objDataPass.newPass
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
                }
    },
    created() {

    },
    mounted() {
        this.getData();
        if (this.value.address === null) {
            this.value.address = {
                zipCode: null,
                districtId: null,
                provinceId: null,
                townName: null
            }
        }
        this.objectData = this.value || {};
        this.employerPostImages = [...this.objectData.images]
        this.employerImages = [...this.objectData.images]

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

.text_changePassword {
    cursor: pointer;
}
</style>
