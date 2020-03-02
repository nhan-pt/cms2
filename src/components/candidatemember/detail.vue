<template>
  <div class="template w-100 bg-white position-relative">
    <div class="d-flex align-items-center template-title ">
      <i class="fas fa-bars mr-20"></i>
      <p class="m-0">{{$i('cms_candidate_details')}}</p>
    </div>
    <section v-if="candidateMemberDetail" class="group-content-candidate__ha">
    <div class="panelhead-candidate__ha_back">
      <p class="backward" @click="back">{{$i('Cancel')}}</p>
    </div>
    <section class="panelhead-candidate__ha">
      <div class="group-panel-head">
        <div class="row">
          <div class="col-lg-9 col-md-8">
            <div class="group-media">
              <div class="img-thumb">
                <img :src="candidateMemberDetail.avatar" alt="" class="img-cover">
              </div>
              <div class="info">
                <div class="group-intro-client">
                  <div class="box-name">
                    <div class="group-name-client">
                      <span class="name-method">{{$i('full_name')}} :</span>
                      <span class="value-method name">{{candidateMemberDetail.fullName}}</span>
                    </div>
                    <div class="group-btn__ha">
                      <a href="javascript:;" title=""
                         class="btn-general__ha color-orange"
                         v-for="e in listIsAvailable"
                         :key="e.id"
                         v-if="e.id==candidateMemberDetail.isAvailable"
                         @click="checkIsAvailable(e.id)"> {{$i(e.label)}}</a>
                    </div>
                  </div>
                  <div class="group-name-client">
                    <span class="name-method">{{$i('cms_status_residence')}} :</span>
                    <span class="value-method text"> {{candidateMemberDetail.residentTypeName}}</span>
                  </div>
                  <div class="group-name-client">
                    <span class="name-method" > {{$i('gender')}}: </span>
                    <span class="value-method text" v-for="e in listGender" :key="e.id" v-if="e.id==candidateMemberDetail.gender">{{$i(e.name)}}</span>
                  </div>
                  <div class="group-name-client">
                    <span class="name-method">{{$i('cms_nationality')}} :</span>
                    <span class="value-method text"> {{candidateMemberDetail.nationalName}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4">
            <div class="group-social-candidate">
              <div class="heading-2 name-number">{{$i('cms_candidate_number')}} : {{candidateMemberDetail.id}}</div>
              <div class="group-contact-social">
                <div class="list">
                  <div class="item"><a href="javascript:;"><i class="fas fa-phone"></i></a></div>
                  <div class="item"><a href="javascript:;"><i class="fas fa-envelope"></i></a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="group-tab-candidate__ha" id="tab-candidate__ha">
      <div class="scroll-x">
        <ul class="nav nav-tabs panel-head__ha">
          <li  v-for="(e,i) in listTab" :class="{ 'active': e.status == 'active'}"><a href="javascript:;" @click="clickTab(i)">{{$i(e.label)}}</a>
          </li>
          
        </ul>
      </div>
      
      <div class="tab-content panel-body__ha">
        <div id="tab-candidate-1" class="tab-pane fade active show" v-if="tabActive==1">
          <div class="group-basicInfo-candidate border-frame">
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
                      <div class="group-value">{{candidateMemberDetail.fullName}}</div>
                    </div>
                    <div class="box-row rule">
                      <div class="group-title text-bold"> {{$i('katakanaName_cms')}} </div>
                      <div class="group-value">{{candidateMemberDetail.katakanaName}} </div>
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
                      <div class="text-normal">{{formatDate(candidateMemberDetail.birthday)}}</div>
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
                      <div class="text-normal">{{candidateMemberDetail.mobile}}</div>
                      <div class="group-btn__ha p-x-15">
                        <a href="javascript:;" title=""
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
                    <div class="name-title"> {{$i('cms_applicant_email_address')}}  </div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule justify-content-between">
                      <div class="text-normal"> {{candidateMemberDetail.contactEmail}} </div>
                      <div class="group-btn__ha p-x-15">
                        <a href="javascript:;" title=""
                           class="btn-general__ha color-orange">{{$i('cms_applicant_send_email')}} </a>
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
                      <div class="group-value">{{candidateMemberDetail.lineUserId}}</div>
                    </div>
                    <div class="box-row rule">
                      <div class="group-title"> {{$i('web_FacebookUrl')}} </div>
                      <div class="group-value"> {{candidateMemberDetail.facebookUrl}} </div>
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
                    <div class="row mb-2">
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Zipcode')}}</div>
                          <div class="name-value" v-if="candidateMemberDetail.address && candidateMemberDetail.address.zipCode">{{candidateMemberDetail.address.zipCode}} </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{ $i('prefectures') }}</div>
                          <div class="name-value" v-if="candidateMemberDetail.address && candidateMemberDetail.address.provinceName">{{candidateMemberDetail.address.provinceName}} </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('city')}}</div>
                          <div class="name-value" v-if="candidateMemberDetail.address && candidateMemberDetail.address.districtName">{{candidateMemberDetail.address.districtName}} </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Village')}}</div>
                          <div class="name-value">{{candidateMemberDetail.address && candidateMemberDetail.address.townName}} </div>
                        </div>
                      </div>
                    </div>
                    <div class="row ">
                      <div class="col-12">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Address')}}</div>
                          <div class="name-value" v-if="candidateMemberDetail.address && candidateMemberDetail.address.address">{{candidateMemberDetail.address.address}} </div>
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
                  <div class="content-candidate-right Nearest p-y-15" v-if="candidateMemberDetail.address && candidateMemberDetail.address.stations && candidateMemberDetail.address.stations.length">
                    <div class="row mb-2" v-for="(e,i) in candidateMemberDetail.address.stations" :key="i">
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title" v-if="e.trainStationName">{{e.trainStationName}}
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title"  v-if="e.trainLineName">{{e.trainLineName}}
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title">{{e.description}} {{$i('cms_minutes_walk')}}
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
                    <div class="name-title">{{$i('cms_status_residence')}}</div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule">
                      <div class="text-normal text-bold">{{candidateMemberDetail.residentTypeName}}</div>
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
                      <div class="text-normal text-bold">{{candidateMemberDetail.cardCode}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="group-row">
              <div class="row">
                <div class="col-3 border-right__ha">
                  <div class="content-candidate-left p-15">
                    <div class="name-title"> {{$i('residence_card_expire_date')}}</div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule">
                      <div class="text-normal text-bold">{{formatDate(candidateMemberDetail.cardDate)}} </div>
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
                        <img :src="candidateMemberDetail.cardImage1" alt=""
                             class="img-cover">
                      </div>
                      <div class="img-thumb">
                        <img :src="candidateMemberDetail.cardImage2" alt=""
                             class="img-cover">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tab-candidate-2" class="tab-pane fade active show" v-if="tabActive==2">
          <div class="group-basicInfo-candidate border-frame">
            <div class="group-row">
              <div class="row">
                <div class="col-3 border-right__ha">
                  <div class="content-candidate-left p-15">
                    <div class="name-title">{{$i('cms_school_name')}} </div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule">
                      <div class="texts" v-if="candidateMemberDetail.school.name">{{candidateMemberDetail.school.name}}</div>
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
                    <div class="row mb-2">
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Zipcode')}}</div>
                          <div class="name-value" v-if="candidateMemberDetail.school.address && candidateMemberDetail.school.address.zipCode">{{candidateMemberDetail.school.address.zipCode}}</div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{ $i('prefectures') }}</div>
                          <div class="name-value" v-if="candidateMemberDetail.school.address &&candidateMemberDetail.school.address.provinceName">{{candidateMemberDetail.school.address.provinceName}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('city')}}</div>
                          <div class="name-value" v-if="candidateMemberDetail.school.address &&candidateMemberDetail.school.address.districtName">{{candidateMemberDetail.school.address.districtName}}</div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Village')}}</div>
                          <div class="name-value" v-if="candidateMemberDetail.school.address &&candidateMemberDetail.school.address.townName">{{candidateMemberDetail.school.address.townName}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="row ">
                      <div class="col-12">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Address')}}</div>
                          <div class="name-value" v-if="candidateMemberDetail.school.address &&candidateMemberDetail.school.address.address">{{candidateMemberDetail.school.address.address}}</div>
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
                  <div class="content-candidate-right Nearest p-y-15" v-if="candidateMemberDetail.school.address.stations && candidateMemberDetail.school.address.stations.length">
                    <div class="row mb-2" v-for="(e,i) in candidateMemberDetail.school.address.stations" :key="i">
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title" v-if="e.trainStationName">{{e.trainStationName}}
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title"  v-if="e.trainLineName">{{e.trainLineName}}
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title" v-if="e.description">{{e.description}} {{$i('cms_minutes_walk')}}
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
                    <div class="name-title"> {{$i('cms_school_time')}} </div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule">
                      <div class="texts">{{candidateMemberDetail.school.schoolTime}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tab-candidate-3" class="tab-pane fade active show" v-if="tabActive==3">
          <div class="group-basicInfo-candidate border-frame">
            <div class="total-education">
              <div class="group-row">
                <div class="row">
                  <div class="col-12">
                    <div class="heading-3 text-bold p-15">{{$i('LanguageLevel')}}</div>
                  </div>
                </div>
              </div>
              <div class="group-row">
                <div class="row">
                  <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                      <div class="name-title">{{$i('native_language')}} </div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="box-row rule">
                        <div class="texts"> {{candidateMemberDetail.nationalName}} </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="group-row">
                <div class="row">
                  <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                      <div class="name-title"> {{$i('japanese_level')}} </div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="box-row rule">
                        <div class="texts"> {{candidateMemberDetail.japaneseCertificationName}} </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="group-row">
                <div class="row">
                  <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                      <div class="name-title"> {{$i('cms_english_level')}} </div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="box-row rule">
                        <div class="texts"> {{candidateMemberDetail.languageLevelName}} </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="group-row">
                <div class="row">
                  <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                      <div class="name-title"> {{$i('other_language')}}</div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="box-row rule">
                        <div class="texts"> {{dataOtherLanguage}} </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="total-education">
              <div class="group-row">
                <div class="row">
                  <div class="col-12">
                    <div class="heading-3 text-bold p-15">{{$i('cms_academic_records')}}</div>
                  </div>
                </div>
              </div>
              <div class="group-row" v-for="(e,i) in candidateMemberDetail.learningHistory" :key="i">
                <div class="row">
                  <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                      <div class="name-title"> {{getLearningCategoryName(e.learningCategoryId)}}  </div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="group-elementary ">
                        <div class="box-row">
                          <div class="title-text"> {{$i('cms_school_name')}} : </div>
                          <div class="value-title">{{e.name}}
                          </div>
                        </div>
                        <div class="box-row">
                          <div class="title-text"> {{$i('cms_enroll')}} : </div>
                          <div class="value-title">{{formatDate(e.startDate)}}</div>
                        </div>
                        <div class="box-row">
                          <div class="title-text"> {{$i('cms_graduate')}} : </div>
                          <div class="value-title">{{formatDate(e.endDate)}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="total-education">
              <div class="group-row">
                <div class="row">
                  <div class="col-12">
                    <div class="heading-3 text-bold p-15">{{$i('cms_work_records')}}</div>
                  </div>
                </div>
              </div>
              <div class="group-row" v-for="(e,i) in candidateMemberDetail.workingHistory" :key="i">
                <div class="row">
                  <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                      <div class="name-title">{{getWorkingCategoryName(e.workingCategoryId)}} </div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="group-elementary ">
                        <div class="box-row">
                          <div class="title-text"> {{$i('cms_name_working')}} : </div>
                          <div class="value-title">{{e.name}}
                          </div>
                        </div>
                        <div class="box-row">
                          <div class="title-text"> {{$i('start_time')}} : </div>
                          <div class="value-title">{{formatDate(e.startDate)}}</div>
                        </div>
                        <div class="box-row">
                          <div class="title-text"> {{$i('end_time')}} : </div>
                          <div class="value-title">{{formatDate(e.endDate)}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tab-candidate-4" class="tab-pane fade active show" v-if="tabActive==4">
          <div class="group-basicInfo-candidate border-frame">
            <div class="group-workDesires__ha">
              <div class="list-workDesires__ha">
                <div class="item-workDesires__ha">
                  <div class="row">
                    <div class="col-md-3 col-6" v-for="(e,i) in listRegime" :key="e.id + i">
                      <label class="label-checkbox__ha">{{e.name}}
                        <input type="checkbox" :checked="e.status == 'active' ? true:false " disabled>
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tab-candidate-5" class="tab-pane fade active show" v-if="tabActive==5">
          <div class="group-basicInfo-candidate border-frame">
            <div class="group-workDesires__ha group-introduction-video">
              <div class="content-introduction-video">
                <video v-if="candidateMemberDetail.video" width="100%" height="400px" controls>
                  <source :src="candidateMemberDetail.video" type="video/mp4">
                </video>
                
              </div>
            </div>
          </div>
        </div>
        <div id="tab-candidate-6" class="tab-pane fade active show" v-if="tabActive==6">
          <div class="content-applied-jobs">
            <div class="table-responsive">
              <table class="table table-bordered table-applied-jobs">
                <thead>
                <tr>
                  <th class="text-bold text-nowrap">ID</th>
                  <th class="text-bold text-nowrap">
                    <div class="group-total-increase__ha">
                      <div class="text">{{ $i('cms_applied_date') }}</div>
                      <div class="group-increase__ha">
                        <span><i class="fas fa-chevron-up" @click="downDate"></i></span>
                        <span><i class="fas fa-chevron-down" @click="upDate"></i></span>
                      </div>
                    </div>
                  </th>
                  <th class="text-bold text-nowrap">{{$i('cms_apply_status')}}</th>
                  <th class="text-bold text-nowrap">{{ $i('cms_job_post_input_search_location') }}</th>
                  <th class="text-bold text-nowrap">{{ $i('cms_workplace_near_station') }}</th>
                  <th class="text-bold text-nowrap">{{ $i('cms_job_post_title') }}</th>
                  <th class="text-bold text-nowrap">
                    <div class="group-total-increase__ha">
                      <div class="text">{{ $i('cms_post_job_salary') }}</div>
                      <div class="group-increase__ha">
                        <span><i class="fas fa-chevron-up" @click="upSalary"></i></span>
                        <span><i class="fas fa-chevron-down" @click="downSalary"></i></span>
                      </div>
                    </div>
                  </th>
                  <th class="text-bold text-nowrap">{{ $i('cms_recruitment_shift') }}</th>
                  <th class="text-bold text-nowrap">{{ $i('cms_interview_schedule') }}
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(e,i) in listApply" :key="i">
                  <td>{{e.id}}</td>
                  <td> {{formatDate(e.createdDate)}}</td>
                  <td>
                    <div v-for="(s,v) in listStatusJobPost" :key="v + s.status">
                      <a href="javascript:;" class="btn-general-status"  v-if="s.status == e.status"  :class="s.class">{{$i(s.label)}}</a>
                    </div>
                  </td>
                  <td>{{e.location}}</td>
                  <td>
                    <div v-for="(s,v) in e.nearStation" :key="v">
                      {{s.stationName}} - {{s.trainLineName}}
                    </div>
                  </td>
                  <td>
                    <div class=" width-350 td-nowrap" :title="e.title">{{e.title}}</div>
                  </td>
                  <td>
                    <div class="salary text-nowrap">{{formatPrice(e.salary)}}</div>
                  </td>
                  <td>
                    <div v-for="(s,v) in e.applyShiftJobInPosts" :key="v">
                      {{s.name}} {{s.startWorking}}-{{s.endWorking}}
                    </div>
                  </td>
                  <td>
                    <div v-for="(s,v) in e.interviewSchedules" :key="v">
                      {{formatDate(s.interviewDate)}}  {{formatShift(s.startHour)}} - {{formatShift(s.endHour)}}
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="tab-candidate-7" class="tab-pane show active show" v-if="tabActive==7">
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
    </section>
    <el-dialog :visible.sync="dialogIsAvailable" width="30%">
      <div class="row display-flex">
        <div class="col-12">
          <div class="mb-2 text-font-20 text">Chosen candidate</div>
          <div class=" group-select">
            <el-select class="group-select__ha"
                       v-model="changeStatus"
                       :placeholder="$i('cms_status')"
            >
              <el-option
                v-for="v in listChangeAvailable"
                :key="v.id"
                :label="$i(v.label)"
                :value="v.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row display-flex mt-5">
        <div class="col-12 text-right">
          <div class=" list-btn__ha">
            <div class="item-btn">
              <input class="btn text-bold width-120 text-white btn-list-view bg-27ACCE"
                     type="button"
                     @click="changeStatusId"
                     :value="$i('cms_execute')"/>
            </div>
            <div class="item-btn">
              <input class="btn text-bold width-120 text-white btn-list-view bg-b5bbc8"
                     type="button"
                     @click="dialogIsAvailable = false"
                     :value="$i('Cancel')"/>
            </div>
        </div>
        </div>
      </div>
    </el-dialog>
  </section>
  </div>
</template>

<script>
  import {mapGetters, mapActions }from 'vuex';
  import _ from 'lodash';
  import {CandidateInfoAvailable, PostApply, Gender} from '../../types/enum'
  export default {
    data() {
      return {
        tabActive: 1,
        changeStatus: null,
        listRegime: [],
        dialogIsAvailable: false,
        listIsAvailable: [
          {
            id: CandidateInfoAvailable.AVAILABEL,
            label: 'cms_candidate_isavailabel_available',
            status: 'active',
            class: 'btn__pill__green'
          },
          {
            id: CandidateInfoAvailable.UNAVAILABEL,
            label: 'cms_candidate_isavailabel_unavailable',
            status: 'deactive',
            class: 'btn__pill__red'
          },
          {
            id: CandidateInfoAvailable.PENDDINGUPDATEINFO,
            label: 'cms_candidate_isavailabel_pendding_update',
            status: 'deactive',
            class: 'btn__pill__orange'
          },
          {
            id: CandidateInfoAvailable.WAITINGCONFIRM,
            label: 'cms_candidate_isavailabel_waiting_confirm',
            status: 'deactive',
            class: 'btn__pill__grey'
          }
        ],
        listStatusJobPost: [
          {
            status: PostApply.APPLIED,
            label: 'Applied',
            class: 'btn__color__green'
          },
          {
            status: PostApply.INTERVIEWING,
            label: 'Interview_setup',
            class: 'btn__color__green'
          },
          {
            status: PostApply.HIRED,
            label: 'Hired',
            class: 'btn__color__grey'
          },
          {
            status: PostApply.REJECT,
            label: 'cms_applicant_reject ',
            class: 'btn__color__red'
          },
          {
            status: PostApply.PENDDINGUPDATEINFO,
            label: 'pendding_update_info',
            class: 'btn__color__orange'
          },
          {
            status: PostApply.WAITINGCONFIRM,
            label: 'waiting_confirm',
            class: 'btn__color__orange'
          },
          {
            status: PostApply.HIDE,
            label: 'Hide',
            class: 'deactive'
          }
        ],
        listGender: Gender,
        listTab: [
          {
            id: 1,
            label: 'basic_information',
            status: 'active',
          },
          {
            id: 2,
            label: 'cms_school',
            status: 'deactive',
          },
          {
            id: 3,
            label: 'language_skills',
            status: 'deactive',
          },
          {
            id: 4,
            label: 'cms_work_desires',
            status: 'deactive',
          },
          {
            id: 5,
            label: 'cms_self_introduction_video',
            status: 'deactive',
          },
          {
            id: 6,
            label: 'cms_candidate_applied_job',
            status: 'deactive',
          },
          {
            id: 7,
            label: 'cms_comment',
            status: 'deactive',
          }
        ],
        memberLanguageNames: [],
        dataOtherLanguage: [],
        dialogShowImage: false,
        imageShow: '',
        resource: {},
        listApply: []
      }
    },
    computed: {
      ...mapGetters(['workingCategory', 'learningCategory', 'candidateMemberDetail', 'regime', 'memberLanguage']),
      listChangeAvailable() {
        return this.listIsAvailable.filter(e => e.id == 1 || e.id == 4)
      }
    },
    watch: {
      'tabActive'(value) {
        if(value==6 && !this.listApply.length) this.getListApply()
      },
    },
    methods: {
      ...mapActions(['getDetailCandidateMember', 'confirmCandidateProfile', 'getListApplicationPost', 'updateStatusCandidateIds']),
      getListApply(orderBy = 'CREATEDDATE', orderType='DESC') {
        let data = {
          candidateId : this.$route.params.id,
          orderBy : orderBy,
          orderType : orderType,
          pageSize : 1000
        }
        this.getListApplicationPost(data)
          .then((response) => {
            this.listApply = response.data
            this.listApply.map(e => {
              e.nearStation = e.employerPost.stations
              e.salary = e.employerPost.salary
              e.title = e.employerPost.title
              e.location = e.employerPost.shopName
            })
          })
          .catch(err => {
            this.$error(err.message);
          })
      },
      checkIsAvailable(id) {
        if(id == 1 || id == 4) this.dialogIsAvailable = true
      },
      changeStatusId() {
        if(!this.changeStatus) {
          this.$message(this.$i('Choose isAvailable!'),'error');
        }else {
          this.$confirm(this.$i('DoYouWantToChangeStatus')).then(() => {
            let obj = {
              id: this.$route.params.id,
              isAvailable: this.changeStatus
            }
            this.confirmCandidateProfile(obj).then((res) => {
              if (res.success) {
                this.$message(this.$i('Successful'));
              }
              this.dialogIsAvailable = false
              this.getDetail();
            }).catch(err => {
              this.$error(err.messages);
            })
          });
        }
      },
      compareUp(a, b) {
        const genreA = a.salary;
        const genreB = b.salary;

        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      },
      compareDown(a, b) {
        const genreA = a.salary;
        const genreB = b.salary;

        let comparison = 0;
        if (genreA < genreB) {
          comparison = 1;
        } else if (genreA > genreB) {
          comparison = -1;
        }
        return comparison;
      },
      compareDownDate(a, b) {
        const genreA = a.createdDate;
        const genreB = b.createdDate;

        let comparison = 0;
        if (genreA < genreB) {
          comparison = 1;
        } else if (genreA > genreB) {
          comparison = -1;
        }
        return comparison;
      },
      compareUpDate(a, b) {
        const genreA = a.createdDate;
        const genreB = b.createdDate;

        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      },
      upSalary() {
        this.listApply.sort(this.compareUp);
      },
      downSalary() {
        this.listApply.sort(this.compareDown);
      },
      downDate() {
        this.listApply.sort(this.compareDownDate);
      },
      upDate() {
        this.listApply.sort(this.compareUpDate);
      },
      getWorkingCategoryName (id) {
        if(!id) return ''
        let text  = this.workingCategory.find(e => e.id == id) ? this.workingCategory.find(e => e.id == id).name : ''
        return text
      },
      getLearningCategoryName (id) {
        if(!id) return ''
        let text = this.learningCategory.find(e => e.id == id) ? this.learningCategory.find(e => e.id == id).name : ''
        return text
      },
      getDetail() {
        let loading = this.$loading.show();
        this.getDetailCandidateMember({
            id: this.$route.params.id
          })
          .then((data) => {
            loading.hide();
              this.changeStatus = (this.candidateMemberDetail.isAvailable == 1 || this.candidateMemberDetail.isAvailable == 4) ? this.candidateMemberDetail.isAvailable : null
              this.listRegime = [...this.regime]
              this.listRegime.map(e => e.status = 'deactive')
              this.candidateMemberDetail.regime.map(e =>
              {
                  this.listRegime.map(i =>{
                      if(i.id == e.id) i.status = 'active'
                  })
              })
              this.dataOtherLanguage = []
              if(this.candidateMemberDetail.otherLanguage)
              {
                this.candidateMemberDetail.otherLanguage.split(",").map(e =>
                {
                  this.memberLanguage.map(i => {
                    if (i.id !== parseInt(e)) return
                    else this.dataOtherLanguage.push(i.name)
                  })
                })
              }
              this.dataOtherLanguage = this.dataOtherLanguage.length ? this.dataOtherLanguage.join(', ') : null
              if(!this.candidateMemberDetail.school){
                this.candidateMemberDetail.school ={
                  name: '',
                  description: '',
                  schoolTime: '',
                  address: {
                    zipCode: null,
                    provinceId: null,
                    districtId: null,
                    townName: '',
                    provinceId: '',
                    address: '',
                    stations: [{
                      stationId: null,
                      description: '',
                    }],
                  }
                }
              }
            
          })
          .catch(err => {
            loading.hide();
            this.$error(err.message);
          })
      },
      back() {
        return this.$router.push('/candidatemember');
      },
      clickTab(item) {
          if(item == 6) {
              this.$message(this.$i('function_under_development'), 'error');
          }else {
              this.listTab.map(e => { e.status = 'deactive'})
              this.listTab[item].status = 'active'
              this.tabActive = this.listTab[item].id
          }
          
      },
  
      cancel() {
        this.candidateMemberDetail.isAvailable = !this.candidateMemberDetail.isAvailable
      },
  
      handleShowImage(imageLink) {
        this.dialogShowImage = true;
        this.imageShow = imageLink;
      },
  
      getCandidateAvailabel(status) {
        switch (status) {
          case CandidateInfoAvailable.WAITINGCONFIRM:
            return 'cms_candidate_isavailabel_waiting_confirm';
            break;
          case CandidateInfoAvailable.PENDDINGUPDATEINFO:
            return 'cms_candidate_isavailabel_pendding_update';
            break;
          case CandidateInfoAvailable.AVAILABEL:
            return 'cms_candidate_isavailabel_available';
            break;
          case CandidateInfoAvailable.UNAVAILABEL:
            return 'cms_candidate_isavailabel_unavailable';
            break;
          default:
            return 'cms_candidate_isavailabel_unavailable';
            break;
  
        }
      },
    },
    mounted() {
      this.getDetail();
    },
  }
</script>

<style scoped>
.content-info {
  display: block;
  font-weight: normal;
}
.text-font-20 {
  font-size: 20px;
}
.bg-b5bbc8 {
  background: #b5bbc8;
}
.title-info {
  font-weight: 600;
}
</style>
