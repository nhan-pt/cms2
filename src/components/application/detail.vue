<template>
  <section class="group-content-candidate__ha" id="thu__cms__form">
    <div class="d-flex align-items-center template-title ">
      <i class="fas fa-bars mr-20"></i>
      <p class="m-0">{{$i('cms_application_details')}}</p>
    </div>
    <div class="template-content">
      <div class="row mb-40">
        <div class="col-8">
          <h5 class="mb-4"></h5>
          <div class="btn-group-3 mb-2">
            <div class="mr-auto displaynone" :class="{displayshow: checkShowAction()}">
              <input type="submit"
                     class="btn-second bg-31b86b text-white border-0 text-center mr-10"
                     @click="updateStatus(PostApplyData.HIRED)"
                     :value="$i('cms_applicant_hire')">
              <input type="submit"
                     class="btn-second bg-e45656 text-white border-0 mr-10"
                     name="submit"
                     @click="updateStatus(PostApplyData.REJECT)"
                     :value="$i('cms_applicant_reject ')">
              <input type="submit"
                     v-if="objGeneral.status!= PostApplyData.INTERVIEWING"
                     class="btn-second bg-darkgreen text-white border-0 text-center"
                     @click="updateStatus(PostApplyData.INTERVIEWING)"
                     :value="$i('cms_post_job_proceed_interview')">
            </div>
          </div>
        </div>
        <div class="col-4 ">
          <div class="display-flex">
            <h5 class="mb-4 text-bold">{{$i('Status')}}: </h5>
            <h5 class="mb-4 text-bold" v-for="e in listStatus" v-if="e.status == objGeneral.status">{{$i(e.label)}}
            </h5>
          </div>
          <table class="table table-borderless table-status-interview">
            <tbody>
            <tr>
              <td class="text-bold">
                {{$i('Job_No')}}:
              </td>
              <td>
                {{objGeneral.employerPostId}}
              </td>
            </tr>
            <tr>
              <td class="text-bold">
                {{$i('Application_No')}}:
              </td>
              <td>
                {{objGeneral.id}}
              </td>
            </tr>
            <tr>
              <td class="text-bold">
                {{$i('cms_applied_date')}}:
              </td>
              <td>
               {{formatDate(objGeneral.createdDate)}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <section class="group-tab-candidate__ha" id="tab-candidate__ha">
        <div class="scroll-x">
          <ul class="nav nav-tabs panel-head__ha">
            <li v-for="(tab, key) in listTab">
              <a data-toggle="tab"
                 href="#"
                 :key="key"
                 class="text-bold"
                 @click="clickTab(key)"
                 :class="{ 'active': tab.css == 'active'}">{{$i(tab.label)}}</a>
            </li>
          </ul>
        </div>
      </section>
      <div class="tab-content ">
<!--  application-details  tab     -->
        <div id="application-details" v-if="currentTab.tabId==1"  class="tab-pane fade show active">
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
                        <a href="" title=""
                           class="btn-general__ha color-orange">{{$i('cms_applicant_check_detail')}}
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
                        <a href="" title=""
                           class="btn-general__ha color-orange">{{$i('cms_make_a_phone_call')}}</a>
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
                        <a href="" title=""
                           class="btn-general__ha color-orange">{{$i('cms_applicant_send_email')}}</a>
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
                          <div class="name-value"></div>
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
                        <img :src="objCandidate.cardImage1"
                             class="img-cover">
                      </div>
                      <div class="img-thumb">
                        <img  :src="objCandidate.cardImage2"
                             class="img-cover">
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
                <div
                  class="card-header d-flex justify-content-between bg-orange text-white">
                  <div>
                    {{$i('cms_application_shift ')}}
                  </div>
                  <div>
                    <i class="fas fa-edit cursor-edit" @click="checkShift=!checkShift"></i>
                  </div>
                </div>
                <div  v-if="!checkShift" class="card-body">
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
                <div
                  class="card-header d-flex justify-content-between bg-orange text-white">
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
                          <el-date-picker
                            v-model="e.interviewDate"
                            type="date"
                            class="width-date"
                            :placeholder="$i('interviewDate')">
                          </el-date-picker>
                        </div>
                        <div class="name-title mr-3">
                          <el-time-select
                            :placeholder="$i('start_time')"
                            v-model="e.startHour"
                            :picker-options="{
                              start: '06:00',
                              step: '00:15',
                              end: '22:00'
                            }">
                          </el-time-select>
                        </div>
                        <div class="mr-3">{{$i('cms_to')}}</div>
                        <div class="name-title mr-3">
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
                          {{objEmployerPost.shopName}}
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
                <div class="item-comment__ha">
                  <div class="name-user-comment">Hang Dang</div>
                  <div class="name-intro-comment">Bạn Lộc này do Quân giưới thiệu
                    nhé, mình đã update thông tin phái trên</div>
                </div>
                <div class="item-comment__ha">
                  <div class="name-user-comment">Quan Tran</div>
                  <div class="name-intro-comment">Cám ơn Hằng, anh có hỏi bạn ấy
                    về lịch bạn ấy di làm được, anh thêm shift ngày thứ 6
                    6:30~11:30 vào rồi nhé</div>
                </div>
              </div>
              <div class="group-enter-text">
                <input type="text" class="input-text"
                       placeholder="Enter your new comment here...">
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
    <div class=" template-footer">
      <div class="btn-group-3 mr-4">
        <div class="ml-auto displaynone" :class="{displayshow: checkShowAction()}">
          <input type="submit"
                 class="btn-second bg-31b86b text-white border-0 text-center mr-10"
                 @click="updateStatus(PostApplyData.HIRED)"
                 :value="$i('cms_applicant_hire')">
          <input type="submit"
                 class="btn-second bg-e45656 text-white border-0 mr-10"
                 name="submit"
                 @click="updateStatus(PostApplyData.REJECT)"
                 :value="$i('cms_applicant_reject ')">
          <input type="submit"
                 v-if="objGeneral.status!= PostApplyData.INTERVIEWING"
                 class="btn-second bg-darkgreen text-white border-0 text-center"
                 @click="updateStatus(PostApplyData.INTERVIEWING)"
                 :value="$i('cms_post_job_proceed_interview')">
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex';
  import {PostApply} from '../../types/enum';
  
  export default {
      data() {
          return {
              objCandidate: {},
              objGeneral: {},
              objEmployerPost: {},
              objSchedules: {},
              objShiftJob: {},
              PostApplyData:PostApply,
              listStatus: [
                  {
                      status: 5,
                      label: 'pendding_update_info'
                  },
                  {
                      status: 6,
                      label: 'waiting_confirm'
                  },
                  {
                      status: 7,
                      label: 'Interview_setup'
                  },
                  {
                      status: 10,
                      label: 'Applied'
                  },
                  {
                      status: 11,
                      label: 'Hide'
                  },
                  {
                      status: 12,
                      label: 'web_rejected'
                  }
              ],
              listTab: [
                  {
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
              if(value) {
                  this.checkListSchedule()
              }
          }
      },
      methods: {
          ...mapActions(['getDetailApply', 'updateStatusApply', 'saveShiftApply', 'saveScheduleApply' ]),

          checkListSchedule() {
              if(this.objSchedules && this.objSchedules.length) {
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
              if(item == 2) {
                  this.$message(this.$i('function_under_development'), 'error');
              }else {
                  this.listTab.map(e => { e.css = 'deactive'})
                  this.listTab[item].css = 'active'
                  this.currentTab = this.listTab[item]
              }
              
          },
  // save shift affter tick checkbox
          saveShift() {
              let dataSave = {
                  shiftobInPostIds: [...this.checkListShift],
                  candidateId: this.$route.query.candidateId,
                  employerPostId: this.$route.query.employerPostId
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
                  employerPostId: this.$route.query.employerPostId,
                  memberId: this.$route.query.candidateId,
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
              if(status == PostApply.REJECT) confirm = 'DoYouWantToReject'
              if(status == PostApply.INTERVIEWING) confirm = 'DoYouWantToInterview'
              
              this.$confirm(this.$i(confirm)).then(() => {
                  let dataUpdate = {
                      application: {
                          employerPostId: this.$route.query.employerPostId,
                          candidateId: this.$route.query.candidateId
                      },
                      status: status
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
          
          getList() {
              let queryData = {
                  employerPostId: this.$route.query.employerPostId,
                  candidateId: this.$route.query.candidateId
              }
              let loading = this.$loading.show();
              this.getDetailApply(queryData)
                  .then((respon) => {
                      loading.hide();
                      this.objGeneral = respon.data
                      this.objCandidate = this.objGeneral.candidate
                      this.objEmployerPost = this.objGeneral.employerPost
                      this.objSchedules = this.objGeneral.interviewSchedules
                      this.objShiftJob = this.objGeneral.applyShiftJobInPosts
                      this.checkListShift = this.objShiftJob.map(e => e.shiftJobInPostId.toString())
                      this.objEmployerPost.hiringDates = this.objEmployerPost.hiringDates ? this.objEmployerPost.hiringDates.map(e => e.name).join(', ') : ''
                  })
                  .catch(err => {
                      loading.hide();
                      this.$error(err.message);
                  })
          },
          
          checkShowAction(){
            return this.objGeneral.status!= PostApply.HIRED && this.objGeneral.status!=PostApply.REJECT
          }
      },
      mounted() {
          this.getList();
          this.currentTab = {...this.listTab[0]}
      }
  }
</script>
<style scoped>
  .table td, .table th {
    border: none !important;
    padding: 5px;
  }
  .cursor-edit {cursor: pointer;}
  .content-candidate-right . row + .row {
    margin-bottom: 0.5rem;
  }
  .displaynone {
    display: none;
  }
  .displayshow {
    display: block !important;
  }
</style>