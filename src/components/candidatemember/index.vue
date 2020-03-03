<template>
  <div class="template w-100 bg-white position-relative">
    <div class="d-flex align-items-center template-title ">
      <i class="fas fa-bars mr-20"></i>
      <p class="m-0">{{$i('cms_candidate_list')}}</p>
    </div>
    <div class="panel-head-fill__ha mt-4 mx-4">
      <div class="group-chosen-candidate">
      </div>
      <div class="group-btn-add">
        <button type="button" class="btn btn-add-candidate" @click="create">{{$i('cms_add_new_candidate')}}</button>
      </div>
    </div>
<!--    <section class="group-content-candidate__ha">-->
    <div class="template-content">
      <div class="group-panelhead-candidate-list">
        <div class="row mb-3">
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <input type="text" class="input-text__ha" :placeholder="$i('cms_candidate_name')"
                       v-model="objData.name">
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <input type="text" class="input-text__ha" :placeholder="$i('katakanaName_cms')"
                       v-model="objData.katakana">
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <el-select class="group-select__ha"
                           clearable
                           v-model="objData.gender"
                           :placeholder="$i('gender')"
                >
                  <el-option
                    v-for="v in listGender"
                    :key="v.id"
                    :label="$i(v.name)"
                    :value="v.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <el-input type="number" :placeholder="$i('phone_number')" v-model="objData.phone"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <el-date-picker
                  v-model="objData.birthDate"
                  type="date"
                  class="width-date"
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                  :placeholder="$i('birthday')">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <el-select
                  remote
                  clearable
                  v-model="objData.provinceId"
                  :placeholder="$i('Province')">
                  <el-option
                    v-for="pro in province"
                    :key="pro.id"
                    :label="pro.name"
                    :value="pro.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <el-select v-model="objData.districtId"
                           :placeholder="$i('District')"
                           remote
                           clearable>
                  <el-option v-for="item in listDistricts" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <el-select
                  remote
                  clearable
                  multiple
                  v-model="objData.stationIds"
                  :placeholder="$i('cms_job_post_input_station')">
                  <el-option
                    v-for="st in listStations"
                    :key="st.id"
                    :label="st.name"
                    :value="st.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <el-select class="group-select__ha"
                           clearable
                           multiple
                           v-model="objData.japaneseSkill"
                           :placeholder="$i('JapaneseCertification')"
                >
                  <el-option
                    v-for="jp in japaneseCertification"
                    :key="jp.id"
                    :label="jp.name"
                    :value="jp.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <el-select class="group-select__ha"
                           v-model="objData.trainLine"
                           :placeholder="$i('SEARCH_trainLine')"
                           disabled="disabled"
                >
                  <el-option value="-1" label="--Select--"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="group-rule-text">
              <div class="name-title w-100">
                <el-select class="group-select__ha"
                           v-model="objData.resident"
                           remote
                           clearable
                           :placeholder="$i('cms_status_residence')"
                >
                  <el-option
                    v-for="v in residentType"
                    :key="v.id"
                    :label="v.name"
                    :value="v.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="group-btn-search">
          <button class="btn bg-orange btn-search fix-btn-search" type="button" @click="searchCandidate">{{$i('Search')}}
            <i :class="loading ? 'text-white':'text-orange'" class="fa fa-spinner fa-spin"></i>
          </button>
        </div>
      </div>
      <div class="group-panlebody-candidate-list">
        <div class="panel-head-fill__ha mb-4">
          <div class="group-chosen-candidate">
          </div>
          <div class="list-fillter-candidate">
            <div class="list-fillter">
              <div class="item-fillter" :class="{ 'active': vuexTab.checktab === true}">
                <a href="javascript:;" class="btn-fill" @click="gettab()">{{$i('cms_job_post_view_status')}}</a>
              </div>
              <div class="item-fillter" :class="{ 'active': vuexTab.checktab === false}">
                <a href="javascript:;" class="btn-fill" @click="gettab()">{{$i('viewAll')}}</a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="vuexTab.checktab" class="row">
          <div class="col-12">
            <input class=" text-bold text-white btn-list-tab" v-for="(e,i) in listTab" :key="i" @click="clickTab(i)"
                   type="button" :value="$i(e.label)" :class="{ 'active': e.status == 'active'}"/>
          </div>
        </div>
        <div class="panel-body-fill__ha">
          <div class="group-table-list-candidate__ha">
            <div class="table-responsive">
              <table v-if="candidateMemberList" class="table table-hover table-bordered table-applied-jobs fixed-table">
                <thead>
                  <tr>
                  <th class="text-bold text-nowrap fixed-left-row" >
                    <div class="group-total-increase__ha">
                      <div class="text fixed-left-row">{{$i('cms_candidate_name')}}</div>
                    </div>
                    <div class="form-search-header">
                      <input type="text" class="search-detail" v-model="searchName" :placeholder="$i('Search')">
                    </div>
                  </th>
                  <th class="text-bold text-nowrap">{{$i('katakanaName_cms')}}
                    <div class="form-search-header">
                      <input type="text" class="search-detail" v-model="searchkatakanaName" :placeholder="$i('Search')">
                    </div>
                  </th>
                  <th class="text-bold text-nowrap">{{$i('gender')}}</th>
                  <th class="text-bold text-nowrap">{{$i('phone_number')}}
                    <div class="form-search-header">
                      <input type="text" class="search-detail" v-model="searchPhone" :placeholder="$i('Search')">
                    </div>
                  </th>
                  <th class="text-bold text-nowrap">
                    <div class="group-total-increase__ha">
                      <div class="text">{{$i('birthday')}}</div>
                      <div class="group-increase__ha">
                        <span><i class="fas fa-chevron-up" @click="downDate"></i></span>
                        <span><i class="fas fa-chevron-down" @click="upDate"></i></span>
                      </div>
                    </div>
                  </th>
                  <th class="text-bold text-nowrap">{{$i('cms_applicant_candidate_station')}}
                    <div class="form-search-header">
                      <input type="text" class="search-detail" v-model="searchStation" :placeholder="$i('Search')">
                    </div>
                  </th>
                  <th class="text-bold text-nowrap">{{$i('Zipcode')}}
                    <div class="form-search-header">
                      <input type="text" class="search-detail" v-model="searchZipCode" :placeholder="$i('Search')">
                    </div>
                  </th>
                  <th class="text-bold text-nowrap">{{$i('cms_japaneseSkill')}}
                    <div class="">
                      <el-select class="form-search-checkbox-header" v-model="searchJpSkill" clearable :placeholder="$i('Search')">
                        <el-option
                          v-for="jp in japaneseCertification"
                          :key="jp.id"
                          :label="jp.name"
                          :value="jp.id">
                        </el-option>
                      </el-select>
                    </div>
                  </th>
                  <th class="text-bold text-nowrap"> {{$i('cms_status_residence')}}
                    <div class="">
                      <el-select class="form-search-checkbox-header" v-model="searchResidentType" clearable :placeholder="$i('Search')">
                        <el-option
                          v-for="v in residentType"
                          :key="v.id"
                          :label="v.name"
                          :value="v.id">
                        </el-option>
                      </el-select>
                    </div>
                  </th>
                  <th class="text-bold text-nowrap">{{$i('Status')}}
                    <div v-if="!vuexTab.checktab">
                      <el-select class="form-search-checkbox-header" v-model="searchStatus" clearable :placeholder="$i('Search')">
                        <el-option
                          v-for="v in listTab"
                          :key="v.id"
                          :label="$i(v.label)"
                          :value="v.id">
                        </el-option>
                      </el-select>
                    </div>
                  </th>
                  <th class="text-bold text-nowrap fixed-right-row">{{ $i('cms_job_post_action') }}</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if="checkKeyword" v-for="(e,i) in listSearch" :key="i">
                    <td class="name-vi fixed-left-row" >
                      <div class="width-250 td-nowrap"  :title="e.name">
                        <a href="javascript:;" @click="redirect(e.id)" >{{e.name}}</a>
                      </div>
                    </td>
                    <td class="name-katakana">
                      <div class="width-250 td-nowrap"  :title="e.katakanaName">
                        <a href="javascript:;" @click="redirect(e.id)" >{{e.katakanaName}}</a>
                      </div>
                    </td>
                    <td class="gender">
                      <div class=" width-150 td-nowrap" v-for="v in listGender" :key="v.id" v-if="v.id==e.gender">
                        <a href="javascript:;" @click="redirect(e.id)" >{{$i(v.name)}}</a>
                      </div>
                    </td>
                    <td class="phone-number width-250 td-nowrap" :title="e.mobile">
                      <div class=" width-150 td-nowrap">
                        <a href="javascript:;" @click="redirect(e.id)" >{{$i(e.mobile)}}</a>
                      </div>
                    </td>
                    <td class="birth-date">
                      <div class=" width-350 td-nowrap text-center">
                        <a href="javascript:;" @click="redirect(e.id)" >{{formatDate(e.birthday)}}</a>
                      </div>
                    </td>
                    <td class="station" >
                      <div class="width-250 td-nowrap" >
                        <div v-if="e.address && e.address.stations && e.address.stations.length">
                          <div v-for="(v,a) in e.address.stations" :key="a">
                            <a href="javascript:;" @click="redirect(e.id)" > {{v.trainStationName}} - {{v.trainLineName}}</a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="zip-code	">
                      <div v-if="e.address && e.address.zipCode">
                        <a href="javascript:;" @click="redirect(e.id)" >{{e.address.zipCode}}</a>
                      </div>
                    </td>
                    <td class="japanese-skill	">
                      <div class=" width-120 td-nowrap text-center">
                        <a href="javascript:;" @click="redirect(e.id)" >{{e.japaneseSkillName}}</a>
                      </div>
                    </td>
                    <td class="residence-status">
                      <div class=" width-100 td-nowrap text-center" v-for="i in residentType" :key="i.id"
                          v-if="i.id == e.residentTypeId" :title="$i(i.name)">
                        <a href="javascript:;" @click="redirect(e.id)" >{{$i(i.name)}}</a>
                      </div>
                    </td>
                    <td class="profile-status text-not-verified">
                      <div>
                        <div class=" width-150 text-center td-nowrap" v-for="i in listTab" :key="i.id"
                            v-if="i.id == e.isAvailable" :class="i.class">
                          <a href="javascript:;" @click="redirect(e.id)" >{{$i(i.label)}}</a>
                        </div>
                      </div>
                    </td>
                    <td class="btn-action fixed-right-row">
                        <div class="width-120 nowrap-row">
                          <button class="btn text-white bg-purple" @click="edit(e.id)">
                            <i class="fa fas fa-edit"></i>
                          </button>
                        </div>
                    </td>
                  </tr>
                  <tr v-if="!checkKeyword" v-for="(e,i) in candidateMemberList" :key="i">
                    <td class="name-vi fixed-left-row" >
                      <div class="width-250 td-nowrap"  :title="e.name">
                        <a href="javascript:;" @click="redirect(e.id)" >{{e.name}}</a>
                      </div>
                    </td>
                    <td class="name-katakana">
                      <div class="width-250 td-nowrap"  :title="e.katakanaName">
                        <a href="javascript:;" @click="redirect(e.id)" >{{e.katakanaName}}</a>
                      </div>
                    </td>
                    <td class="gender">
                      <div class=" width-150 td-nowrap" v-for="v in listGender" :key="v.id" v-if="v.id==e.gender">
                        <a href="javascript:;" @click="redirect(e.id)" >{{$i(v.name)}}</a>
                      </div>
                    </td>
                    <td class="phone-number width-250 td-nowrap" :title="e.mobile">
                      <div class=" width-150 td-nowrap">
                        <a href="javascript:;" @click="redirect(e.id)" >{{$i(e.mobile)}}</a>
                      </div>
                    </td>
                    <td class="birth-date">
                      <div class=" width-350 td-nowrap text-center">
                        <a href="javascript:;" @click="redirect(e.id)" >{{formatDate(e.birthday)}}</a>
                      </div>
                    </td>
                    <td class="station" >
                      <div class="width-250 td-nowrap" >
                        <div v-if="e.address && e.address.stations && e.address.stations.length">
                          <div v-for="(v,a) in e.address.stations" :key="a">
                            <a href="javascript:;" @click="redirect(e.id)" > {{v.trainStationName}} - {{v.trainLineName}}</a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="zip-code	">
                      <div v-if="e.address && e.address.zipCode">
                        <a href="javascript:;" @click="redirect(e.id)" >{{e.address.zipCode}}</a>
                      </div>
                    </td>
                    <td class="japanese-skill	">
                      <div class=" width-120 td-nowrap text-center">
                        <a href="javascript:;" @click="redirect(e.id)" >{{e.japaneseSkillName}}</a>
                      </div>
                    </td>
                    <td class="residence-status">
                      <div class=" width-100 td-nowrap text-center" v-for="i in residentType" :key="i.id"
                          v-if="i.id == e.residentTypeId" :title="$i(i.name)">
                        <a href="javascript:;" @click="redirect(e.id)" >{{$i(i.name)}}</a>
                      </div>
                    </td>
                    <td class="profile-status text-not-verified">
                      <div>
                        <div class=" width-150 text-center td-nowrap" v-for="i in listTab" :key="i.id"
                            v-if="i.id == e.isAvailable" :class="i.class">
                          <a href="javascript:;" @click="redirect(e.id)" >{{$i(i.label)}}</a>
                        </div>
                      </div>
                    </td>
                    <td class="btn-action fixed-right-row">
                        <div class="width-120 nowrap-row">
                          <button class="btn text-white bg-purple" @click="edit(e.id)">
                            <i class="fa fas fa-edit"></i>
                          </button>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <pager :total="candidateMemberCount" :pageIndex="objData.pageIndex" :pageSize="objData.pageSize"
                 @change="pageChange"/>
        </div>
      </div>
<!--    </section>-->
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {CandidateInfoAvailable, Gender} from '../../types/enum'

  export default {
    data() {
      return {
        loading: false,
        listDistricts: [],
        listStations: [],
        listTrainLines: [],
        listGender: Gender,
        changeStatus: null,
        listTab: [
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

        /*  search in page  */
        checkKeyword: false,
        searchkatakanaName: '',
        searchName: '',
        searchPhone: '',
        searchStation: '',
        searchZipCode: '',
        searchJpSkill: null,
        searchResidentType: null,
        searchStatus: null,
        listSearch: [],
        vuexTab: {
          checktab: true,
          isAvailable: CandidateInfoAvailable.AVAILABEL,
        },
        objData: {},
        objLocation: {
          pageIndex: 1,
          pageSize: 99,
          provinceId: -1
        },
      }
    },
    watch: {
      /* search ID  in page*/
      'searchkatakanaName'(value) {
        this.searchName = ''
        this.searchPhone = ''
        this.searchZipCode = ''
        this.searchStation = ''
        this.searchJpSkill = null
        this.searchStatus = null
        this.searchResidentType = null
        if (value) this.checkKeyword = true
        else this.checkKeyword = false

        this.filterId(value, this.candidateMemberList, 'obj','katakanaName')
      },
      'searchJpSkill'(value) {
        this.searchkatakanaName = ''
        this.searchPhone = ''
        this.searchZipCode = ''
        this.searchStation = ''
        this.searchName = ''
        this.searchStatus = null
        this.searchResidentType = null
        if (value) this.checkKeyword = true
        else this.checkKeyword = false

        this.filterCheckbox(value, this.candidateMemberList, 'obj', 'japaneseSkillId')
      },
      'searchStatus'(value) {
        this.searchkatakanaName = ''
        this.searchPhone = ''
        this.searchZipCode = ''
        this.searchStation = ''
        this.searchJpSkill = null
        this.searchName = ''
        this.searchResidentType = null
        if (value != null) this.checkKeyword = true
        else this.checkKeyword = false

        this.filterCheckbox(value, this.candidateMemberList, 'obj', 'isAvailable')
      },
      'searchResidentType'(value) {
        this.searchkatakanaName = ''
        this.searchPhone = ''
        this.searchZipCode = ''
        this.searchStation = ''
        this.searchName = ''
        this.searchJpSkill = null
        this.searchStatus = null
        if (value) this.checkKeyword = true
        else this.checkKeyword = false

        this.filterCheckbox(value, this.candidateMemberList, 'obj', 'residentTypeId')
      },
      'searchName'(value) {
        this.searchkatakanaName = ''
        this.searchPhone = ''
        this.searchZipCode = ''
        this.searchStation = ''
        this.searchJpSkill = null
        this.searchStatus = null
        this.searchResidentType = null
        if (value) this.checkKeyword = true
        else this.checkKeyword = false

        this.filterId(value, this.candidateMemberList, 'obj', 'name')
      },
      'searchZipCode'(value) {
        this.searchkatakanaName = ''
        this.searchPhone = ''
        this.searchName = ''
        this.searchStation = ''
        this.searchJpSkill = null
        this.searchStatus = null
        this.searchResidentType = null
        if (value) this.checkKeyword = true
        else this.checkKeyword = false

        this.filterId(value, this.candidateMemberList, 'obj', 'zipCode')
      },
      'searchStation' (value) {
        this.searchkatakanaName = ''
        this.searchPhone = ''
        this.searchName = ''
        this.searchZipCode = ''
        this.searchJpSkill = null
        this.searchStatus = null
        this.searchResidentType = null
        if(value) this.checkKeyword = true
        else this.checkKeyword = false
        this.filterId(value, this.candidateMemberList, 'array', 'stations')
      },
      'searchPhone'(value) {
        this.searchZipCode = ''
        this.searchName = ''
        this.searchkatakanaName = ''
        this.searchStation = ''
        this.searchJpSkill = null
        this.searchStatus = null
        this.searchResidentType = null
        if (value) this.checkKeyword = true
        else this.checkKeyword = false

        this.filterId(value, this.candidateMemberList, 'obj', 'mobile')
      },
      'objData.provinceId': function (value) {
        if (value) {
          this.objLocation.provinceId = value;
          this.objData.districtId = null;
          this.objData.stationId = [];
          this.getDistrict();
          this.getStation();
        } else {
          this.objLocation.provinceId = -1;
          this.getDistrict();
          this.getStation();
        }

      },
    },
    computed: {
      ...mapGetters(['candidateMemberList', 'candidateMemberCount', 'province', 'japaneseCertification', 'residentType', 'objSearchCandidate', 'tab'])
    },
    methods: {
      ...mapActions(['updateStatusCandidateIds', 'getListCandidateMember', 'searchListDistrict', 'searchListStation', 'saveSearchCandidate', 'saveTab']),
      getList(index) {
        if (index) {
          this.objData.pageIndex = index;
        }
        this.loading = true;
        this.checkAll = false
        let listSearch = Object.assign({}, this.objData);
        listSearch.isAvailable = this.vuexTab.checktab ? this.vuexTab.isAvailable : -1;
        listSearch.stationIds = (listSearch.stationIds && listSearch.stationIds.length) ? listSearch.stationIds.join(',') : null 
        listSearch.japaneseSkill = (listSearch.japaneseSkill && listSearch.japaneseSkill.length) ? listSearch.japaneseSkill.join(',') : null 
        this.getListCandidateMember(listSearch)
          .then(() => {
            this.candidateMemberList.map(e => {
              e.stations = e.address ? e.address.stations : []
              e.zipCode = e.address ? e.address.zipCode : null
            })
            this.loading = false;
            this.searchPhone = ''
            this.searchName = ''
            this.searchkatakanaName = ''
          })
          .catch(err => {
            this.loading = false;
            this.$error(err.message);
          })
      },
      searchCandidate() {
        this.objData.isAvailable = this.vuexTab.checktab ? this.vuexTab.isAvailable : -1;
        this.objData.name = this.objData.name ? this.removeSpace(this.objData.name) : null 
        this.objData.gender = this.objData.gender ? this.objData.gender : null 
        this.objData.provinceId = this.objData.provinceId == -1 ? null : this.objData.provinceId
        this.objData.districtId = this.objData.districtId == -1 ? null : this.objData.districtId
        this.objData.katakana = this.objData.katakana ? this.removeSpace(this.objData.katakana) : null
        this.objData.phone = this.objData.phone ? this.removeSpace(this.objData.phone) : null
        this.objData.japaneseSkill = (this.objData.japaneseSkill && this.objData.japaneseSkill.length) ? this.objData.japaneseSkill : []
        this.objData.stationIds = (this.objData.stationIds && this.objData.stationIds.length) ? this.objData.stationIds : [] 
        this.objData.birthDate = this.objData.birthDate ? this.objData.birthDate : null ;
        this.saveSearchCandidate(this.objData)
        this.getList(1)
      },
      removeSpace(str) {
        if (str) {
            return str.trim();
        }
      },
      filterCheckbox(needle, heystack, type, key) {
        var query = needle;
        let array = [];
        if(type == 'obj') {
          heystack.filter(function (item) {
            if (item[key] == query) array.push(item);
          })
        }
        this.listSearch = [...array];
      },
      
      filterId(needle, heystack, type, key) {
        var query = needle;
        let array = [];
        if(type == 'obj') {
          heystack.filter(function (item) {
            if (item[key] && item[key].indexOf(query) >= 0) array.push(item);
          })
        }
        else {
          heystack.filter(function (item) {
            if(item[key].length) {
              item[key].filter(function (e) {
                if (e.trainStationName.indexOf(query) >= 0) array.push(item);
              })
            }
          })
        }
        this.listSearch = [...array];

      },

      /* change tab */
      gettab() {
        this.vuexTab.checktab = !this.vuexTab.checktab
        this.getList(1)
        this.checkAll = false
        this.checkedIndex = []
      },
      clickTab(item) {
        this.listTab.map(e => {
          e.status = 'deactive'
        })
        this.listTab[item].status = 'active'
        this.vuexTab.isAvailable = this.listTab[item].id
        this.getList(1)
        this.checkAll = false
        this.checkedIndex = []
      },
      filterIsAvailable(id) {
        this.listTab.map(e => {
          e.status = 'deactive'
        })
        this.listTab.find(e => e.id == id).status = 'active'
      },

      getDistrict() {
        this.searchListDistrict(this.objLocation)
          .then((res) => {
            this.listDistricts = res.data
          }).catch((error) => {
          this.$error(error.message);
        })
      },
      getStation() {
        this.searchListStation(this.objLocation)
          .then((res) => {
            this.listStations = res.data;
          }).catch((error) => {
          this.$error(error.message);
        })
      },
      
      compareDownDate(a, b) {
        const genreA = a.birthday;
        const genreB = b.birthday;

        let comparison = 0;
        if (genreA < genreB) {
          comparison = 1;
        } else if (genreA > genreB) {
          comparison = -1;
        }
        return comparison;
      },
      compareUpDate(a, b) {
        const genreA = a.birthday;
        const genreB = b.birthday;

        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      },

      downDate() {
        this.candidateMemberList.sort(this.compareDownDate);
      },
      upDate() {
        this.candidateMemberList.sort(this.compareUpDate);
      },
      
      changeStatusIds(id) {
        if (!this.checkedIndex || !this.checkedIndex.length) {
          this.$message(this.$i('You_have_not_selected_candidate'), 'error');
        } else if (this.changeStatus == null) {
          this.$message(this.$i('LabelErrorEmptyStatus'), 'error');
        } else {
          this.$confirm(this.$i('DoYouWantToChangeStatus')).then(() => {
            let loading = this.$loading.show();
            let obj = {
              candidateIds: this.checkedIndex,
              isAvailable: this.changeStatus
            }
            this.updateStatusCandidateIds(obj).then((res) => {
              loading.hide();
              if (res.success) {
                this.$message(this.$i('Successful'));
              }
              this.checkedIndex = []
              this.getList(1);
            }).catch(err => {
              this.$error(err.messages);
              loading.hide();
            })
          });
        }

      },
      
      pageChange(pageNum) {
        this.$set(this.objData, 'pageIndex', pageNum);
        this.getList();
      },
      /*   router detail candidate */
      redirect(id) {
        return this.$router.push('/candidatemember/detail/' + id);
      },
      /*   router edit candidate */
      edit(id) {
        return this.$router.push('/candidatemember/edit/' + id);
      },
      /*   router create candidate */
      create(id) {
        return this.$router.push('/candidatemember/create');
      }
    },
    mounted() {
      this.objData = {...this.objSearchCandidate}
      this.vuexTab = this.tab
      this.filterIsAvailable(this.vuexTab.isAvailable)
      // this.clickTab(this.vuexTab)
      this.getList();
      this.getDistrict();
      this.getStation();
      
    }
  }
</script>

<style scoped>
  .fix-btn-search {
    padding: 0 20px !important;
  }
  .table td a {
    color: #222328;
  }
</style>