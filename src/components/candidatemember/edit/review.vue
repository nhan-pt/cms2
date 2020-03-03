<template>
  <section class="group-content-candidate__ha p-0">
    <section class="group-tab-candidate__ha " id="tab-candidate__ha">
      <div class="scroll-x">
        <ul class="nav nav-tabs panel-head__ha">
          <li v-for="(e,i) in listTab" :key="i" :class="{ 'active': e.status == 'active'}" @click="clickTab(e.id)">
            <a data-toggle="tab" href="javascript:;">{{$i(e.label)}}</a>
          </li>
        </ul>
      </div>
      
      <div class="tab-content panel-body__ha">
        <div id="tab-candidate-1" class="tab-pane fade show active" v-if="currentTab==1">
          <div class="group-basicInfo-candidate border-frame">
            <div class="group-row">
              <div class="row">
                <div class="col-12">
                  <div class="heading-2 text-bold p-15 text-right"><i
                    class="fas fa-edit" @click="editTab(1)"></i></div>
                </div>
              </div>
            </div>
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
                      <div class="group-title text-bold">{{$i('cms_alphabet')}}
                      </div>
                      <div class="group-value" v-if="objData.fullName">{{objData.fullName}}</div>
                    </div>
                    <div class="box-row rule">
                      <div class="group-title text-bold"> {{$i('katakanaName_cms')}}
                      </div>
                      <div class="group-value" v-if="objData.katakanaName"> {{objData.katakanaName}}</div>
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
                      <div class="text-normal">{{formatDate(objData.birthday)}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="group-row">
              <div class="row">
                <div class="col-3 border-right__ha">
                  <div class="content-candidate-left p-15">
                    <div class="name-title">{{$i('phone_number')}}</div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule justify-content-between">
                      <div class="text-normal" v-if="objData.mobile">{{objData.mobile}}</div>
                      <div class="group-btn__ha p-x-15">
                        <a href="javascript:;" title=""
                           class="btn-general__ha color-orange"> {{$i('cms_make_a_phone_call')}}</a>
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
                    <div class="name-title">{{$i('cms_applicant_email_address')}}</div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule justify-content-between">
                      <div class="text-normal">{{objData.email}}</div>
                      <div class="group-btn__ha p-x-15">
                        <a href="" title=""
                           class="btn-general__ha color-orange">
                          Send an email </a>
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
                    <div class="name-title">{{$i('cms_other_contact')}}</div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule">
                      <div class="group-title"> LINE ID</div>
                      <div class="group-value">{{objData.lineUserId}}</div>
                    </div>
                    <div class="box-row rule">
                      <div class="group-title"> {{$i('web_FacebookUrl')}}</div>
                      <div class="group-value"> {{objData.facebookUrl}}</div>
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
                          <div class="name-value" v-if="objData.address && objData.address.zipCode">{{objData.address.zipCode}}</div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{ $i('prefectures') }}</div>
                          <div class="name-value" v-if="objData.address && objData.address.provinceId">
                            <div v-for="(e,i) in province" :key="e.id+i" v-if="e.id==objData.address.provinceId">{{e.name}}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('city')}}</div>
                          <div class="name-value"v-if="objData.address && objData.address.districtId">{{dataDistrict(objData.address.districtId)}}</div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Village')}}</div>
                          <div class="name-value" v-if="objData.address && objData.address.townName">{{objData.address.townName}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="row ">
                      <div class="col-12">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Address')}}
                          </div>
                          <div class="name-value" v-if="objData.address && objData.address.address">{{objData.address.address}}</div>
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
                    <div class="name-title">{{$i('nearest_station')}}</div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right Nearest p-y-15" v-if="objData.address && objData.address.stations && objData.address.stations.length">
                   <div class="row mb-2" v-for="(e,i) in objData.address.stations" :key="i">
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title" v-if="e.stationId && dataStation(e.stationId)">{{dataStation(e.stationId).name}}
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title"  v-if="e.stationId && dataStation(e.stationId)">{{dataStation(e.stationId).trainLineName}}
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title" v-if="e.description">{{e.description}}
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
                      <div class="text-normal text-bold" v-if="objData.memberCard && objData.memberCard.residentTypeId">
                        <div v-for="e in residentType" :key="e.id" v-if="objData.memberCard.residentTypeId == e.id">
                          {{e.name}}
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
                      <div class="text-normal text-bold" v-if="objData.memberCard && objData.memberCard.cardCode">
                        {{objData.memberCard.cardCode}}
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
                    <div class="name-title">{{$i('cms_applied_date')}}</div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule">
                      <div class="text-normal text-bold" v-if="objData.memberCard && objData.memberCard.cardDate"> {{formatDate(objData.memberCard.cardDate)}}
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
                    <div class="name-title">{{$i('cms_residence_card_photos')}}
                    </div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="group-img-CMND">
                      <div class="img-thumb">
                        <img v-if="objData.memberCard && objData.memberCard.cardImage1" :src="objData.memberCard.cardImage1"
                             alt="" class="img-cover">
                      </div>
                      <div class="img-thumb">
                        <img v-if="objData.memberCard && objData.memberCard.cardImage2" :src="objData.memberCard.cardImage2"
                             alt="" class="img-cover">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentTab==2" id="tab-candidate-2" class="tab-pane fade show active">
          <div class="group-basicInfo-candidate border-frame" v-if="objData.candidateSchool">
            <div class="group-row">
              <div class="row">
                <div class="col-12">
                  <div class="heading-2 text-bold p-15 text-right"><i
                    class="fas fa-edit" @click="editTab(2)"></i></div>
                </div>
              </div>
            </div>
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
                      <div class="texts" v-if="objData.candidateSchool && objData.candidateSchool.name">{{objData.candidateSchool.name}}</div>
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
                          <div class="name-value" v-if="objData.candidateSchool && objData.candidateSchool.address && objData.candidateSchool.address.zipCode">{{objData.candidateSchool.address.zipCode}}</div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{ $i('prefectures') }}</div>
                          <div class="name-value" v-if="objData.candidateSchool && objData.candidateSchool.address && objData.candidateSchool.address.provinceId">
                            <div v-for="e in province" :key="e.id"
                                 v-if="e.id==objData.candidateSchool.address.provinceId">{{e.name}}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('city')}}</div>
                          <div class="name-value" v-if="objData.candidateSchool && objData.candidateSchool.address && objData.candidateSchool.address.districtId">{{dataDistrict(objData.candidateSchool.address.districtId)}}</div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Village')}}</div>
                          <div class="name-value" v-if="objData.candidateSchool && objData.candidateSchool.address && objData.candidateSchool.address.townName">{{objData.candidateSchool.address.townName}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="row ">
                      <div class="col-12">
                        <div class="group-rule-text">
                          <div class="name-title">{{$i('Address')}}
                          </div>
                          <div class="name-value" v-if="objData.candidateSchool && objData.candidateSchool.address &&objData.candidateSchool.address.address">{{objData.candidateSchool.address.address}}</div>
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
                  <div class="content-candidate-right Nearest p-y-15" v-if="objData.candidateSchool.address && objData.candidateSchool.address.stations && objData.candidateSchool.address.stations.length">
                    <div class="row mb-2" v-for="(e,i) in objData.candidateSchool.address.stations" :key="i">
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title" v-if="e.stationId && dataStationSchool(e.stationId)">{{dataStationSchool(e.stationId).name}}
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title" v-if="e.stationId && dataStationSchool(e.stationId)">{{dataStationSchool(e.stationId).trainLineName}}
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="group-rule-text">
                          <div class="name-title">{{e.description}}
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
                    <div class="name-title"> {{$i('cms_school_time')}}</div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="content-candidate-right p-y-15">
                    <div class="box-row rule">
                      <div class="texts">{{objData.candidateSchool.schoolTime}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentTab==3" id="tab-candidate-3" class="tab-pane fade show active">
          <div class="group-basicInfo-candidate border-frame">
            <div class="total-education">
              <div class="group-row">
                <div class="row">
                  <div class="col-12">
                    <div class="heading-2 text-bold p-15 text-right"><i
                      class="fas fa-edit" @click="editTab(3)"></i></div>
                  </div>
                </div>
              </div>
              <div class="group-row">
                <div class="row">
                  <div class="col-12">
                    <div class="heading-3 text-bold p-15">{{$i('LanguageLevel')}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="group-row">
                <div class="row">
                  <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                      <div class="name-title"> {{$i('native_language')}}</div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="box-row rule" v-if="objData.candidateLanguage && objData.candidateLanguage.memberLanguageId">
                        <div class="texts" 
                             v-for="(e,i) in memberLanguage"
                             :key="i"
                             v-if="objData.candidateLanguage.memberLanguageId==e.id"> {{e.name}}
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
                      <div class="name-title">{{$i('japanese_level')}}</div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="box-row rule" v-if="objData.candidateLanguage && objData.candidateLanguage.japaneseCertificationId">
                        <div class="texts" v-for="(e,i) in japaneseCertification"
                             v-if="objData.candidateLanguage.japaneseCertificationId==e.id"> {{e.name}}
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
                      <div class="name-title"> {{$i('cms_english_level')}}</div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="box-row rule" v-if="objData.candidateLanguage && objData.candidateLanguage.languageLevelId">
                        <div class="texts" 
                             v-for="(e,i) in languageLevel"
                             :key="i"
                             v-if="objData.candidateLanguage.languageLevelId==e.id"> {{e.name}}
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
                      <div class="name-title">{{$i('other_language')}}</div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="box-row rule">
                        <div class="texts" v-if="otherLanguage && otherLanguage.length"> {{otherLanguage}}</div>
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
                    <div class="heading-3 text-bold p-15">{{$i('cms_academic_records')}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="group-row" v-if="objData.learningHistorys && objData.learningHistorys.length"
                   v-for="(e,i) in objData.learningHistorys" :key="i">
                <div class="row">
                  <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                      <div class="name-title">
                        {{e.title}}
                      </div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="group-elementary ">
                        <div class="box-row">
                          <div class="title-text"> {{$i('cms_school_name')}} :
                          </div>
                          <div class="value-title">{{e.name}}
                          </div>
                        </div>
                        <div class="box-row">
                          <div class="title-text"> {{$i('cms_enroll')}} :</div>
                          <div class="value-title">{{formatDate(e.startDate)}}</div>
                        </div>
                        <div class="box-row">
                          <div class="title-text"> {{$i('cms_graduate')}} :
                          </div>
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
                    <div class="heading-3 text-bold p-15">{{$i('cms_work_records')}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="group-row" v-if="objData.workingHistorys && objData.workingHistorys.length"
                   v-for="(e,i) in objData.workingHistorys" :key="i">
                <div class="row">
                  <div class="col-3 border-right__ha">
                    <div class="content-candidate-left p-15">
                      <div class="name-title">{{e.title}}</div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="content-candidate-right p-y-15">
                      <div class="group-elementary ">
                        <div class="box-row ">
                          <div class="title-text"> {{$i('cms_name_working')}} :
                          </div>
                          <div class="value-title">{{e.name}}</div>
                        </div>
                        <div class="box-row ">
                          <div class="title-text"> {{$i('start_time')}} :
                          </div>
                          <div class="value-title"> {{formatDate(e.startDate)}}</div>
                        </div>
                        <div class="box-row ">
                          <div class="title-text"> {{$i('end_time')}} :
                          </div>
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
        <div v-if="currentTab==4" id="tab-candidate-4" class="tab-pane fade show active">
          <div class="group-basicInfo-candidate border-frame">
            <div class="group-row">
              <div class="row">
                <div class="col-12">
                  <div class="heading-2 text-bold p-15 text-right"><i
                    class="fas fa-edit" @click="editTab(4)"></i></div>
                </div>
              </div>
            </div>
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
        <div v-if="currentTab==5" id="tab-candidate-5" class="tab-pane fade show active">
          <div class="group-basicInfo-candidate border-frame">
            <div class="group-row">
              <div class="row">
                <div class="col-12">
                  <div class="heading-2 text-bold p-15 text-right"><i
                    class="fas fa-edit" @click="editTab(5)"></i></div>
                </div>
              </div>
            </div>
            <div class="group-workDesires__ha group-introduction-video">
              <div class="content-introduction-video">
                <video width="100%" height="100%" controls v-if="objData.video">
                  <source :src="objData.video" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="group-btn-footer__ha">
        <div class="list-btn__ha">
          <div class="item-btn">
            <a href="javascript:;" class="text-links btn-save" @click="save"> {{$i('Save')}}  </a>
          </div>
          <div class="item-btn">
            <a href="javascript:;" @click="$router.push('/candidatemember')" class="text-links btn-cancels">
              {{$i('Cancel')}} </a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import {mapActions, mapGetters,} from 'vuex'

  export default {
    name: "review",
    props: ['value'],
    data() {
      return {
        objData: {},
        currentTab: 1,
        otherLanguage: [],
        listRegime: [],
        listStationSchool: [],
        listStation: [],
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
            label: 'cms_education',
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
          }
        ],
      }
    },
    computed: {
      ...mapGetters(['district', 'japaneseCertification', 'residentType', 'province', 'memberLanguage', 'memberLanguage', 'regime', 'languageLevel']),

    },
    watch: {
      'currentTab'(value) {
        if(value==2 && !this.listStationSchool.length) this.getDataStation(2)
      },
    },
    methods: {
      ...mapActions(['searchListStation']),
      getDataStation(tab) {
        let dataSearch = {};
        dataSearch.pageSize = 9999;
        if(tab==2) {
          if(this.objData.candidateSchool.address.provinceId || this.objData.candidateSchool.address.zipCode){
            dataSearch.provinceId = this.objData.candidateSchool.address.provinceId || -1;
            dataSearch.zipCode = this.objData.candidateSchool.address.zipCode || -1;
          }
          this.searchListStation(dataSearch)
            .then((res) => {
              this.listStationSchool = res.data
            })
            .catch(err => {
              this.$error(err.message);
            })
        }
        if(tab==1) {
          if(this.objData.address.provinceId || this.objData.address.zipCode){
            dataSearch.provinceId = this.objData.address.provinceId || -1;
            dataSearch.zipCode = this.objData.address.zipCode || -1;
          }
          this.searchListStation(dataSearch)
            .then((res) => {
              this.listStation = res.data
            })
            .catch(err => {
              this.$error(err.message);
            })
        }
        
        
        
      },
      save() {
        this.$emit('save')
      },
      editTab(tab) {
        this.$emit('tab', tab)
      },
      dataDistrict(id) {
        let text = ''
        if (!id) return;
        this.district.find(e => {
          if(e.id == id) text = e.name
        })
        return text
      },
      dataStationSchool(id) {
        if (!id) return;
        return this.listStationSchool.find(e => e.id == id)
      },
      dataStation(id) {
        if (!id) return;
        return this.listStation.find(e => e.id == id)
      },
      clickTab(item) {
        this.listTab.map(e => {
          e.status = 'deactive'
          if (e.id != item) return;
          else {
            e.status = 'active'
            this.currentTab = e.id
          }
        })
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      getRegime() {
        this.listRegime = [...this.regime]
        this.listRegime.map(e => e.status = 'deactive')
        this.objData.regime.map(e => {
          this.listRegime.map(i => {
            if (i.id == e) i.status = 'active'
          })
        })
      },
      getData() {
        this.memberLanguage.map(e => {
          this.objData.candidateLanguage.otherLanguage.map(i => {
            if (i == e.id) this.otherLanguage.push(e.name)
          })
        })
        this.otherLanguage = this.otherLanguage.length ? this.otherLanguage.join(', ') : null
        this.getRegime();

      }
    },
    mounted() {
      this.objData = this.value || {}
      this.getData()
      this.getDataStation(1)
    }
  }
</script>

<style scoped>
  .fas.fa-edit {
    cursor: pointer;
  }
</style>