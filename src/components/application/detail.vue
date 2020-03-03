<template>
<section class="group-content-candidate__ha" id="thu__cms__form">
    <div class="d-flex align-items-center template-title ">
        <i class="fas fa-bars mr-20"></i>
        <p class="m-0">{{$i('cms_application_details')}}</p>
    </div>
    <div class="row">
        <div class="col-12 text-right">
            <a href="javascript:;" @click="back">{{$i('Cancel')}}</a>
        </div>
    </div>
    <div class="template-content">
        <div class="row">
            <div class="col-lg-12 col-md-12 mb-2">
                <div class="list-btn__ha text-left displaynone " :class="{displayshow: checkStatus}" v-if="!this.objGeneral.leavedDate && this.objGeneral.status != PostApplyData.REJECT">
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-green" @click="clickAfterHired(PostApplyData.HIRED)"> {{$i('employer_list_apply_use')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-red" @click="updateStatus(PostApplyData.REJECT)"> {{$i('employer_list_apply_not_used')}} </a>
                    </div>
                    <div class="item-btn" v-if="objGeneral.status!= PostApplyData.INTERVIEWING">
                        <a href="javascript:;" class="text-links bg-darkgreen" @click="changeInterview = true">{{$i('employer_list_apply_process_to_interview')}} </a>
                    </div>
                </div>
                <div class="list-btn__ha text-left displaynone " :class="{displayshow: checkStatus==false}" v-if="!this.objGeneral.leavedDate && this.objGeneral.status != PostApplyData.REJECT">
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-green" @click="clickAfterHired(PostApplyData.DECLINE)"> {{$i('employer_application_decline')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-red" @click="clickAfterHired(PostApplyData.QUIT)"> {{$i('employer_application_quit')}}</a>
                    </div>
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-darkgreen" @click="clickAfterHired(PostApplyData.FIRED)">{{$i('employer_application_fired')}} </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-12 text-right">
                <div class="table-infor-date-wrapper text-bold">
                    <div class="row-table">
                        <h5 class="mb-4 text-bold">{{$i('Status')}}: </h5>
                        <h5 class="mb-4 text-bold" v-for="e in listPostApply" v-if="e.status == objGeneral.status"> {{$i(e.label)}}</h5>
                        
                    </div>
                    
                    <div class="row-table">
                        <div class="p-0 " style="padding:1rem;">
                            {{$i('Job_No')}}:
                        </div>
                         <div class="px-3 width-100 text-left">
                            {{objGeneral.employerPostId}}
                        </div>
                        <div class="px-3">
                            {{$i('cms_application_interview_schedule')}}:
                        </div>
                        <div class="px-3">
                            <div class="text-normal-interview" v-if="objGeneral.confirmInterviewDate">
                                <div>
                                    {{formatDate(objGeneral.confirmInterviewDate.interviewDate)}}
                                </div>
                                <div class="table-time-interview">
                                    {{formatShift(objGeneral.confirmInterviewDate.startHour)}} ~ {{formatShift(objGeneral.confirmInterviewDate.endHour)}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-table">
                        <div class="p-0" style="padding:1rem;">
                            {{$i('Application_No')}}:
                        </div>
                         <div class="px-3 width-100 text-left">
                            {{objGeneral.id}}
                        </div>
                        <div class="px-3">
                            {{$i('cms_applicant_start_date_work ')}}:
                        </div>
                        <div class="px-3">
                            {{formatDate(objGeneral.startedWorkDate)}}
                        </div>
                    </div>
                    <div class="row-table">
                        <div class="p-0" style="padding:1rem;">
                            {{$i('cms_applied_date')}}:
                        </div>
                         <div class="px-3 width-100 text-left">
                            {{formatDate(objGeneral.createdDate)}}
                        </div>
                        <div class="px-3">
                            {{$i('cms_applicant_end_date_work')}}:
                        </div>
                        <div class="px-3">
                            {{formatDate(objGeneral.leavedDate)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="group-tab-candidate__ha" id="tab-candidate__ha">
            <div class="scroll-x">
                <ul class="nav nav-tabs panel-head__ha">
                    <li v-for="(tab, key) in listTab">
                        <a data-toggle="tab" href="#" :key="key" class="text-bold" @click="clickTab(key)" :class="{ 'active': tab.css == 'active'}">{{$i(tab.label)}}</a>
                    </li>
                </ul>
            </div>
        </section>
        <div class="tab-content-application">
            <!--  application-details  tab     -->
            <div id="application-details" v-if="currentTab.tabId==1" class="tab-pane fade show active">
                <div class="group-basicInfo-candidate border-frame mb-4">
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title text-bold">{{$i('cms_applicant_no')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule justify-content-between">
                                        <div class="text-normal"> {{objGeneral.id}} </div>
                                        <div class="group-btn__ha p-x-15">
                                            <a href="#" @click="$router.push(`/candidatemember/detail/${objCandidate.id}`)" class="btn-general__ha color-orange">{{$i('cms_applicant_check_detail')}}
                                            </a>
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
                                    <div class="name-title">{{$i('cms_applicant_full_name')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="group-title text-bold">{{$i('cms_alphabet')}}</div>
                                        <div class="group-value">{{objCandidate.fullName}}</div>
                                    </div>
                                    <div class="box-row rule">
                                        <div class="group-title text-bold"> {{$i('katakanaName_cms')}} </div>
                                        <div class="group-value">{{objCandidate.katakanaName}}</div>
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
                                        <div class="text-normal">{{formatDate(objCandidate.birthday)}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('Cellphone')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule justify-content-between">
                                        <div class="text-normal">{{objCandidate.mobile}}</div>
                                        <div class="group-btn__ha p-x-15">
                                            <a href="" @click="$message($i('function_under_development'), 'warning');" title="" class="btn-general__ha color-orange">{{$i('cms_make_a_phone_call')}}</a>
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
                                    <div class="name-title"> {{$i('cms_applicant_email_address')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule justify-content-between">
                                        <div class="text-normal"> {{objCandidate.contactEmail}} </div>
                                        <div class="group-btn__ha p-x-15">
                                            <a href="" @click="$message($i('function_under_development'), 'warning');" title="" class="btn-general__ha color-orange">{{$i('cms_applicant_send_email')}}</a>
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
                                        <div class="group-title"> LINE ID </div>
                                        <div class="group-value">{{objCandidate.lineUserId}}</div>
                                    </div>
                                    <div class="box-row rule">
                                        <div class="group-title"> {{$i('web_FacebookUrl')}} </div>
                                        <div class="group-value"> {{objCandidate.facebookUrl}} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_home_address')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{ $i('Zipcode') }}:</div>
                                                <div class="name-value">{{objCandidate.address? objCandidate.address.zipCode :''}}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{ $i('prefectures') }}:</div>
                                                <div class="name-value">{{objCandidate.address? objCandidate.address.provinceName : ''}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_city_ward')}}:</div>
                                                <div class="name-value">{{objCandidate.address? objCandidate.address.districtName: ''}}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Village')}}:</div>
                                                <div class="name-value">{{objCandidate.address? objCandidate.address.townName: ''}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-12">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Address')}}:</div>
                                                <div class="name-value"> {{objCandidate.address? objCandidate.address.address :''}}</div>
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
                                    <div class="name-title"> {{$i('cms_job_post_nearest_station')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="text-normal text-bold">{{objCandidate.stationName}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{ $i('cms_status_residence') }}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="text-normal text-bold">{{objCandidate.residentTypeName}}</div>
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
                                        <div class="text-normal text-bold">{{objCandidate.cardCode}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_applicant_residence_card_expire_date')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="text-normal text-bold">{{formatDate(objCandidate.cardDate)}} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_residence_card_photos')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="group-img-CMND">
                                        <div class="img-thumb">
                                            <img :src="objCandidate.cardImage1" class="img-cover">
                                        </div>
                                        <div class="img-thumb">
                                            <img :src="objCandidate.cardImage2" class="img-cover">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="row mb-80">
                    <div class="col-6 d-flex">
                        <div class="card schedule-card">
                            <div class="card-header d-flex justify-content-between bg-orange text-white">
                                <div>
                                    {{$i('cms_application_shift ')}}
                                </div>
                                <div>
                                    <i class="fas fa-edit cursor-edit" @click="checkShift=!checkShift"></i>
                                </div>
                            </div>
                            <div v-if="!checkShift" class="card-body">
                                <div class="row" v-for="e in objShiftJob">
                                    <div class="col-4">
                                        <div class="group-rule-text">
                                            <div class="name-title">{{e.name}}</div>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div class="group-rule-text">
                                            <div class="name-value mr-20">{{formatShift(e.startWorking)}}</div>
                                            <div class="name-value mr-20">{{$i('cms_to')}}</div>
                                            <div class="name-value">{{formatShift(e.endWorking)}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="checkShift" class="card-body">
                                <div class="row" v-for="e in objEmployerPost.shiftJobInPosts" :key="e.id">
                                    <div class="col-4">
                                        <div class="group-rule-text">
                                            <el-checkbox-group v-model="checkListShift">
                                                <el-checkbox :label="e.id" class="name-title"> {{e.name}} </el-checkbox>
                                            </el-checkbox-group>

                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div class="group-rule-text">
                                            <div class="name-value mr-20">{{formatShift(e.startWorking)}}</div>
                                            <div class="name-value mr-20">{{$i('cms_to')}}</div>
                                            <div class="name-value">{{formatShift(e.endWorking)}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <button class="bg-orange text-white btn-save" @click="saveShift">
                                        {{$i('Save')}}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 d-flex">
                        <div class="card schedule-card">
                            <div class="card-header d-flex justify-content-between bg-orange text-white">
                                <div>
                                    {{$i('cms_applicant_interview_schedule')}}
                                </div>
                                <div>
                                    <i class="fas fa-edit cursor-edit" @click="checkSchedule=!checkSchedule"></i>
                                </div>
                            </div>
                            <div v-if="!checkSchedule" class="card-body">
                                <div class="row" v-for="e in objSchedules">
                                    <div class="col-4">
                                        <div class="group-rule-text">
                                            <div class="name-title">{{formatDate(e.interviewDate)}}</div>

                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div class="group-rule-text">
                                            <div class="name-value mr-20">{{formatShift(e.startHour)}}</div>
                                            <div class="name-value mr-20">{{$i('cms_to')}}</div>
                                            <div class="name-value">{{formatShift(e.endHour)}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="checkSchedule" class="card-body">
                                <div class="row mb-2" v-for="(e,i) in listSchedule" :key="i">
                                    <div class="col-12">
                                        <div class="d-flex text-item-center justify-content-between">
                                            <div class="mr-3">
                                                <el-date-picker v-model="e.interviewDate" type="date" class="width-date" :placeholder="$i('interviewDate')">
                                                </el-date-picker>
                                            </div>
                                            <div class="name-title mr-3">
                                                <el-time-select :placeholder="$i('start_time')" v-model="e.startHour" :picker-options="{
                                                    start: '06:00',
                                                    step: '00:15',
                                                    end: '22:00'
                                                    }">
                                                </el-time-select>
                                            </div>
                                            <div class="mr-3">{{$i('cms_to')}}</div>
                                            <div class="name-title mr-3">
                                                <el-time-select :placeholder="$i('end_time')" v-model="e.endHour" :picker-options="{
                                                    start: '06:00',
                                                    step: '00:15',
                                                    end: '22:00',
                                                    minTime: e.startHour
                                                    }">
                                                </el-time-select>

                                            </div>
                                            <div class="">
                                                <div @click="removeSchedule(i)">
                                                    <i class="fas fa-2x fa-minus-circle"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <i class="fas fa-2x fa-plus-circle" @click="addSchedule()"></i>
                                </div>
                                <div class="text-center mt-4">
                                    <button class="bg-orange text-white btn-save" @click="saveSchedule">
                                        {{$i('Save')}}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--  job-details  tab     -->
            <div id="job-details" v-if="currentTab.tabId==2" class="tab-pane fade show active">
                <div class="group-basicInfo-candidate border-frame mb-4">
                    <div class="row">
                        <div class="col">
                            <div class="section-title  p-10-15 group-row text-bold">
                                {{$i('cms_job_post_basic_info')}}
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_job_post_title')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="text-normal">
                                            {{objEmployerPost.title}}
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
                                    <div class="name-title">{{$i('cms_job_post_input_search_location')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="col-12 pl-0">
                                            <div class="text-normal">
                                                {{objEmployerPost.branchName}}
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
                                    <div class="name-title mb-2"> {{$i('cms_job_post_creat_work_place')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Zipcode')}}:</div>
                                                <div class="name-value">{{objEmployerPost.zipCode}}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{ $i('prefectures') }}:</div>
                                                <div class="name-value">{{objEmployerPost.provinceName}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_city_ward')}}:</div>
                                                <div class="name-value">{{objEmployerPost.districtName}}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Village')}}:</div>
                                                <div class="name-value">{{objEmployerPost.townName}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-12">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Address')}}:</div>
                                                <div class="name-value">{{objEmployerPost.address}}</div>
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
                                    <div class="name-title"> {{$i('cms_job_post_nearest_station')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right Nearest p-y-15">
                                    <div class="row" v-for="(e,i) in objEmployerPost.stations" :key="i">
                                        <div class="col-2">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{e.stationName}}</div>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{e.trainLineName}}</div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="group-rule-text">
                                                <div class="name-title" v-if="e.description">{{e.description}} {{$i('cms_minutes_walk')}}</div>
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
                                    <div class="name-title">{{$i('cms_required_applicant_jp')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="text-normal">{{objEmployerPost.japaneseCertificationName}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_recruitment_shift')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="row" v-for="(e,i) in objEmployerPost.shiftJobInPosts" :key="i">
                                        <div class="col-4">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{e.name}}</div>
                                            </div>
                                        </div>
                                        <div class="col-8">
                                            <div class="group-rule-text">
                                                <div class="name-value mr-20">{{formatShift(e.startWorking)}}</div>
                                                <div class="name-value mr-20">{{$i('cms_to')}}</div>
                                                <div class="name-values">{{formatShift(e.endWorking)}}</div>
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
                                    <div class="name-title">{{$i('cms_applied_days')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="text-normal">
                                            <span>{{objEmployerPost.hiringDates}}</span>
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
                                    <div class="name-title">{{$i('cms_working_day')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="text-normal">
                                            {{objEmployerPost.workingDayName}}
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
                                    <div class="name-title">{{$i('cms_working_hour_per_day')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="text-normal" v-if="objEmployerPost.workingHourPerDay">
                                            <span>{{objEmployerPost.workingHourPerDay}} {{$i('hourOrMore')}}</span>
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
                                    <div class="name-title">{{$i('cms_post_job_salary')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="col-3 pl-0">
                                            {{objEmployerPost.salaryTypeName}}
                                        </div>
                                        <div class="col-9">
                                            <span>
                                                {{formatPrice(objEmployerPost.salary)}} {{$i('yenOrMore')}}
                                            </span>
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
                                    <div class="name-title">{{$i('cms_post_job_payment_method')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="col-4 pl-0">
                                            {{objEmployerPost.paymentMethodName}}
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
                                    <div class="name-title">{{$i('cms_transportation_expense')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="col-4 pl-0">
                                            {{formatPrice(objEmployerPost.moneyForMove)}} {{$i('yenOrMore')}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="section-title  p-10-15 group-row text-bold">
                                {{$i('cms_job_post_detail_interview_setting')}}
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title mb-2"> {{$i('cms_job_post_interview_place_creat')}} </div>
                                    <div class="checkbox__wrapper">
                                    </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Zipcode')}}:</div>
                                                <div class="name-value"></div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{ $i('prefectures') }}:</div>
                                                <div class="name-value"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_city_ward')}}:</div>
                                                <div class="name-value"></div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Village')}}:</div>
                                                <div class="name-value"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-12">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('Address')}}:</div>
                                                <div class="name-value"></div>
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
                                    <div class="name-title"> {{$i('cms_job_post_nearest_station')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right Nearest p-y-15">
                                    <div class="row" v-for="e in objEmployerPost.stations">
                                        <div class="col-4">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{e.stationName}}</div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{e.trainLineName}}</div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{e.description}}</div>
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
                                    <div class="name-title"> {{$i('cms_interview_schedule')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="row" v-for="e in objEmployerPost.postInterviewScheduleSuggest">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{e.name}}</div>
                                                <div class="name-value">{{formatShift(e.startHour)}}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_to')}}</div>
                                                <div class="name-value">{{formatShift(e.endHour)}}</div>
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
                                    <div class="name-title">
                                        {{$i('cms_interview_note')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="text-normal">
                                            <pre>{{objEmployerPost.interviewNote}}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--  memo tab     -->
           <div id="memo" v-if="currentTab.tabId==3" class="tab-pane fade show active">
                <div class="group-basicInfo-candidate border-frame">
                    <div class="group-comment group-workDesires__ha">
                        <div class="content-comment">
                            <div class="item-comment__ha" v-for="i in listComment" :key='i.id'>
                                <div class="name-user-comment">
                                    <img class="avarta_comment" :src="i.creater.avatar" />
                                    {{i.creater.companyName}}</div>
                                <div class="name-intro-comment">{{i.content}}</div>
                            </div>
                        </div>
                        <!-- <div class="group-enter-text">
                            <input type="text" class="input-text" placeholder="Enter your new comment here...">
                        </div> -->
                    </div>
                </div>
            </div>
            <pager :total="totalRow" :pageIndex="objGetComment.pageIndex" :pageSize="objGetComment.pageSize" @change="pageChange" />
        </div>
        </div>
    </div>
    <div class="template-footer-application" v-if="!this.objGeneral.leavedDate && this.objGeneral.status != PostApplyData.REJECT">
        <div class="row mb-4">
            <div class="col-lg-12 col-md-12 mb-2">
                <div class="list-btn__ha text-right displaynone " :class="{displayshow: checkStatus}" v-if="!this.objGeneral.leavedDate && this.objGeneral.status != PostApplyData.REJECT">
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-green" @click="clickAfterHired(PostApplyData.HIRED)"> {{$i('employer_list_apply_use')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-red" @click="updateStatus(PostApplyData.REJECT)"> {{$i('employer_list_apply_not_used')}} </a>
                    </div>
                    <div class="item-btn" v-if="objGeneral.status!= PostApplyData.INTERVIEWING">
                        <a href="javascript:;" class="text-links bg-darkgreen" @click="changeInterview = true">{{$i('employer_list_apply_process_to_interview')}} </a>
                    </div>
                </div>
                <div class="list-btn__ha text-right displaynone " :class="{displayshow: checkStatus==false}" v-if="!this.objGeneral.leavedDate && this.objGeneral.status != PostApplyData.REJECT">
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-green" @click="clickAfterHired(PostApplyData.DECLINE)"> {{$i('employer_application_decline')}} </a>
                    </div>
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-red" @click="clickAfterHired(PostApplyData.QUIT)"> {{$i('employer_application_quit')}}</a>
                    </div>
                    <div class="item-btn">
                        <a href="javascript:;" class="text-links bg-darkgreen" @click="clickAfterHired(PostApplyData.FIRED)">{{$i('employer_application_fired')}} </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog 
        :title="$i('cms_application_interview_schedule')" 
        :visible.sync="changeInterview" width="50%" 
        :before-close="closePopUpInterview"
        :close-on-click-modal="false"
        :destroy-on-close="true"
        center>
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-12 mx-auto">

                    <div class="form-body">
                        <div class="border-blue mb-40">
                            <hr>
                            <div class="row">
                                <div class="col-4" :class="{'is-invalid has-danger': $v.interview.interviewScheduleDate.$dirty && $v.interview.interviewScheduleDate.$invalid}">
                                    <el-date-picker v-model="interview.interviewScheduleDate" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" :placeholder="$i('cms_application_datepicker')" :picker-options="pickerOptions" @input="$v.interview.interviewScheduleDate.$touch()">
                                    </el-date-picker>
                                </div>
                                <div class="col-3" :class="{'is-invalid has-danger': $v.interview.startHour.$dirty && $v.interview.startHour.$invalid}">
                                    <el-time-select v-model="interview.startHour" @input="$v.interview.startHour.$touch()" value-format="HH:mm" format="HH:mm" :picker-options="{
                                                format: 'HH:mm',
                                                start: '6:00',
                                                step: '00:15',
                                                end: '22:00',
                                            }" :placeholder="$i('cms_applicant_apply_time')">
                                    </el-time-select>
                                </div>
                                <div class="col-2 interview_to">
                                    {{$i('cms_to')}}
                                </div>
                                <div class="col-3" :class="{'is-invalid has-danger': $v.interview.endHour.$dirty && $v.interview.endHour.$invalid}">
                                    <el-time-select v-model="interview.endHour" @input="$v.interview.endHour.$touch()" value-format="HH:mm" format="HH:mm" :picker-options="{
                                                format: 'HH:mm',
                                                start: '6:00',
                                                step: '00:15',
                                                end: '22:00',
                                                minTime: interview.startHour
                                            }" :placeholder="$i('cms_applicant_apply_time')">
                                    </el-time-select>
                                </div>
                            </div>
                        </div>
                        <div class="row display-flex mt-5">
                            <div class="col-12">
                                <div class=" list-btn__ha">
                                    <div class="item-btn">
                                        <a href="javascript:;" class="text-links bg-27ACCE" @click="saveInterviewSchedule(PostApplyData.INTERVIEWING)">
                                            {{$i('cms_execute')}} </a>
                                    </div>
                                    <div class="item-btn">
                                        <a href="javascript:;" class="text-links bg-cancel" @click="closePopUpInterview">
                                            {{$i('Cancel')}} </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
    <el-dialog :title="$i('cms_applicant_setting_work')" 
        :visible.sync="changeHired" width="30%" 
        :before-close="closePopUp"
        :close-on-click-modal="false"
        :destroy-on-close="true"
        center>
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-12 mx-auto">
                    <div class="form-body container mt-4">
                        <div class="border-blue mb-40">
                            <div class="row">
                                <div class="col-4 align-self-center" v-if="checkStatus">
                                    {{$i('cms_applicant_start_date_work ')}}:
                                </div>
                                <div class="col-4 align-self-center" v-else>
                                    <div v-if="afterHired == PostApplyData.DECLINE">
                                        {{$i('cms_applicant_end_date_work')}}:
                                    </div>
                                    <div v-if="afterHired == PostApplyData.FIRED">
                                        {{$i('cms_applicant_end_date_work')}}:
                                    </div>
                                    <div v-if="afterHired == PostApplyData.QUIT">
                                        {{$i('cms_applicant_end_date_work')}}:
                                    </div>
                                </div>
                                <div class="col-8">
                                    <el-date-picker v-model="hiredOrQuit.date" :class="{'is-invalid has-danger': $v.hiredOrQuit.date.$dirty && $v.hiredOrQuit.date.$invalid}" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" :picker-options="pickerHiredDate" @input="$v.hiredOrQuit.date.$touch()" :placeholder="checkStatus ? $i('cms_applicant_start_date_work ') : $i('cms_applicant_end_date_work')" >
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-4">
                                </div>
                                <div class="col-8">
                                    <label class="checkbox-item m-0" :class="!checkStatus ? 'check-disabled': ''">
                                        {{$i('cms_charged')}}
                                        <input type="checkbox" v-model="hiredOrQuit.isGenerateTransaction" :disabled="!checkStatus">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="row display-flex mt-5">
                            <div class="col-12">
                                <div class=" list-btn__ha">
                                    <div class="item-btn">
                                        <a href="javascript:;" class="text-links bg-27ACCE" @click="saveHiredOrQuit()">
                                            {{$i('cms_execute')}} </a>
                                    </div>
                                    <div class="item-btn">
                                        <a href="javascript:;" class="text-links bg-cancel" @click="closePopUp()">
                                            {{$i('Cancel')}} </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</section>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import {
    PostApply
} from '../../types/enum';
import {
    required,
} from 'vuelidate/lib/validators'
export default {
    validations: {
        interview: {
            interviewScheduleDate: {
                required
            },
            startHour: {
                required
            },
            endHour: {
                required
            },
        },
        hiredOrQuit: {
            date: {
                required
            },
        }
    },
    data() {
        return {
            checkStatus: null,
            totalRow: null,
            listComment: null,
            objGetComment: {
                id: null,
                pageIndex: 1,
                pageSize: 20,

            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < (Date.now() - 3600 * 1000 * 24);
                },
            },
            pickerHiredDate: {
                disabledDate: this.disabledDateStartWork
            },
            changeInterview: null,
            changeHired: null,
            afterHired:null,
            hiredOrQuit: {
                isGenerateTransaction: true,
                date: null
            },
            interview: {
                interviewScheduleDate: null,
                startHour: null,
                endHour: null,
            },
            objCandidate: {},
            objGeneral: {},
            objEmployerPost: {},
            objSchedules: {},
            objShiftJob: {},
            PostApplyData: PostApply,
            listTab: [{
                    tabId: 1,
                    label: 'cms_application_details',
                    css: 'active'
                },
                {
                    tabId: 2,
                    label: 'detail_job_post',
                    css: 'deactive'
                },
                {
                    tabId: 3,
                    label: 'Memo',
                    css: 'deactive'
                }
            ],
            currentTab: {},
            checkShift: false,
            checkSchedule: false,
            checkListShift: [],
            listSchedule: [],
            objDataCds: {
                pageIndex: 1,
                pageSize: 999
            },
            listShiftJobTimeStart: [],
            listShiftJobTimeEnd: [],
        }
    },
    watch: {
        'checkSchedule'(value) {
            if (value) {
                this.checkListSchedule()
            }
        }
    },
    computed: {
        ...mapGetters(['listPostApply']),
    },
    methods: {
        ...mapActions(['getDetailApply', 'updateStatusApply', 'hiredOrQuitApply', 'saveShiftApply', 'saveScheduleApply','addInterviewSchedule','getCommentEmployer','interviewApply']),
        
        disabledDateStartWork(time) {
            return time.getTime() < Date.parse(this.objGeneral.startedWorkDate)
        },
        back() {
            return this.$router.push('/application');
        },
         pageChange(pageNum) {
            this.$set(this.objGetComment, 'pageIndex', pageNum);
            this.getCommentEmployers();
        },
        closePopUp() {
            this.changeHired = false
            this.hiredOrQuit.isGenerateTransaction = false
            this.hiredOrQuit.date = null
            this.hiredOrQuit.leavedDate = null
        },
        closePopUpInterview() {
            this.changeInterview = false
            this.interview.interviewScheduleDate = null
            this.interview.startHour = null
            this.interview.endHour = null
        },
        checkListSchedule() {
            if (this.objSchedules && this.objSchedules.length) {
                this.objSchedules.map(e => {
                    e.startHour = e.startHour ? e.startHour.substr(0, 5) : null,
                    e.endHour = e.endHour ? e.endHour.substr(0, 5) : null
                })
                this.listSchedule = [...this.objSchedules]
            }
        },
        addSchedule() {
            this.listSchedule.push({
                interviewDate: null,
                startHour: null,
                endHour: null
            })
        },
        removeSchedule(index) {
            this.listSchedule.splice(index, 1);
        },

        // change tab
        clickTab(item) {
            this.listTab.map(e => {
                e.css = 'deactive'
            })
            this.listTab[item].css = 'active'
            this.currentTab = this.listTab[item]
            if(this.currentTab.tabId == 3) this.getCommentEmployers()
        },
        // save shift affter tick checkbox
        saveShift() {
            let dataSave = {
                shiftobInPostIds: [...this.checkListShift],
                candidateId: this.objGeneral.memberId,
                employerPostId: this.objGeneral.employerPostId
            };
            this.saveShiftApply(dataSave).then((res) => {
                if (res.success) {
                    this.$message(this.$i('Successful'));
                }
                this.checkShift = !this.checkShift;
                this.getList();
            }).catch(err => {
                this.$message(err.message, 'error');
            })
        },
        // save shift affter tick checkbox
        saveSchedule() {
            let dataSave = {
                employerPostId: this.objGeneral.employerPostId,
                memberId: this.objGeneral.memberId,
                interviewSchedules: [...this.listSchedule]
            };
            this.saveScheduleApply(dataSave)
                .then((res) => {
                    this.getList();
                    if (res.success) {
                        this.$message(this.$i('Successful'));
                    }
                    this.checkSchedule = !this.checkSchedule;
                }).catch(err => {
                    this.$message(err.message, 'error');
                })
        },
        // update status apply
        updateStatus(status) {
            let confirm = 'DoYouWantToHide'
            if (status == PostApply.REJECT) confirm = 'DoYouWantToReject'
            if (status == PostApply.INTERVIEWING) confirm = 'DoYouWantToInterview'

            this.$confirm(this.$i(confirm)).then(() => {
                let dataUpdate = {
                    id:this.objGeneral.id,
                    startedWorkDate:null,
	                leavedDate:null,
	                status:status,
	                isGenerateTransaction:false
                };
                this.updateStatusApply(dataUpdate).then((res) => {
                    this.getList();
                    if (res.success) {
                        this.$message(this.$i('Successful'));
                    }
                }).catch(err => {
                    this.$message(err.message, 'error');
                })
            });
        },
        saveHiredOrQuit() {
            let invalid = this.$v.hiredOrQuit.$invalid;
            if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'),'warning');
                return;

            }else {
                let data = {
                    id: this.objGeneral.id,
                    status: this.afterHired,
                    isGenerateTransaction: this.hiredOrQuit.isGenerateTransaction
                };
                let confirm = 'cms_DoYouWantToHired'
                if(this.afterHired == PostApply.HIRED) {
                    data.startedWorkDate = this.hiredOrQuit.date
                }

                if(this.afterHired == PostApply.DECLINE) {
                    confirm = 'cms_DoYouWantToDecline'
                    data.leavedDate = this.hiredOrQuit.date
                }

                if(this.afterHired == PostApply.QUIT) {
                    confirm = 'cms_DoYouWantToQuit'
                    data.leavedDate = this.hiredOrQuit.date
                }

                if(this.afterHired == PostApply.FIRED) {
                    confirm = 'cms_DoYouWantToFired'
                    data.leavedDate = this.hiredOrQuit.date
                }
                
                this.$confirm(this.$i(confirm)).then(() => {
                    this.changeHired = false
                    this.hiredOrQuitApply(data).then(res => {
                        this.getList();
                        this.$message(this.$i('Successful'));
                    }).catch(err => {
                        this.$message(this.$i('Error'));
                    })
                });
            }
        },
        saveInterviewSchedule(status) {
            if (status == PostApply.INTERVIEWING) confirm = 'DoYouWantToInterview'
            let invalid = this.$v.interview.$invalid;
            if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'),'warning');
                return;

            }
            let dataInterViewSchedule = {
                applyId: this.objGeneral.id,
                interviewDate: this.interview.interviewScheduleDate,
                startHour: this.interview.startHour,
                endHour: this.interview.endHour
            };
            this.$confirm(this.$i(confirm)).then(() => {
                 let dataUpdate = {
                        id:this.objGeneral.id,
                    	startedWorkDate:null,
	                    leavedDate:null,
	                    status:status,
	                    isGenerateTransaction:false
                };
                this.changeInterview =false
                this.interviewApply(dataUpdate).then(res => {
                    this.addInterviewSchedule(dataInterViewSchedule).then(res => {
                        this.changeInterview =false
                        this.getList();
                        if(res.success){
                            this.$message(this.$i('Successful'));
                        }
                    }).catch(err => {
                        this.$message(this.$i('Error'));
                    })
                }).catch(err => {
                    this.$message(this.$i('Error'));
                })
            });

            // this.getDetail();
            // if (res.success) {
            //     this.$alert(this.$i('Successful'));
        },
        getList() {
            let queryData = {
                applicationId: this.$route.query.id
            }
            let loading = this.$loading.show();
            this.getDetailApply(queryData)
                .then((respon) => {
                    loading.hide();
                    this.objGeneral = respon.data
                    this.objCandidate = respon.data.candidate
                    this.objEmployerPost = respon.data.employerPost
                    this.objSchedules = respon.data.interviewSchedules
                    this.objShiftJob = respon.data.applyShiftJobInPosts
                    this.checkListShift = this.objShiftJob.map(e => e.shiftJobInPostId.toString())
                    this.objEmployerPost.hiringDates = this.objEmployerPost.hiringDates ? this.objEmployerPost.hiringDates.map(e => e.name).join(', ') : ''
                    this.checkStatus = respon.data.status != this.PostApplyData.REJECT && respon.data.status != this.PostApplyData.HIRED ? true : false
                    this.changeHired = false
                    this.hiredOrQuit.isGenerateTransaction = true
                    this.hiredOrQuit.date = null
                    this.hiredOrQuit.leavedDate = null
                })
                .catch(err => {
                    loading.hide();
                    this.$error(err.message);
                })
        },

        checkShowAction() {
            return this.objGeneral.status != PostApply.HIRED && this.objGeneral.status != PostApply.REJECT
        },

        clickAfterHired(status) {
            this.afterHired = status
            this.hiredOrQuit.isGenerateTransaction = (this.afterHired == this.PostApplyData.HIRED || this.afterHired == this.PostApplyData.DECLINE || this.afterHired == this.PostApplyData.QUIT) ? true : false
            this.changeHired = true
        },
        
        //get Comment employer
        getCommentEmployers() {
            this.objGetComment.id = this.objGeneral.id,
                this.getCommentEmployer(this.objGetComment)
                .then((respon) => {
                    this.listComment = respon.data
                    this.totalRow = respon.totalRow;
                })
                .catch(err => {
                    this.$error(err.message);
                })
        }
    },
    mounted() {
        this.getList();
        this.currentTab = {
            ...this.listTab[0]
        }
    }
}
</script>

<style scoped>
.table td,
.table th {
    border: none !important;
    padding: 5px;
}

.cursor-edit {
    cursor: pointer;
}

.content-candidate-right . row+.row {
    margin-bottom: 0.5rem;
}

.displaynone {
    display: none;
}

.displayshow {
    display: block !important;
}
.interview_to {
    text-align: center;
    margin-top: 10px;
}

.text-normal-interview {
    display: flex
}

.table-time-interview {
    margin-left: 20px
}
.avarta_comment {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.check-disabled, .check-disabled .checkmark, input:disabled {
    background-color: #F5F7FA;
    border-color: #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed !important;
}

</style>
