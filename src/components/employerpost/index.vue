<template>
  <div class="template w-100 bg-white position-relative">
    <div class="d-flex align-items-center template-title ">
      <i class="fas fa-bars mr-20"></i>
      <p class="m-0">{{$i('cms_job_post_job_post_search')}}</p>
    </div>
    <div class="template-content">
      <div class="row">
        <div class="col-12">
          <label class="form-checkbox">
            <input type="checkbox" class="inactive-appli" name="vehicle1" value="Bike" v-model="inactive">
            <span>{{$i('cms_hide_inactive_apply')}}</span>
          </label>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-6 col-lg-3 col-12">
          <el-select 
            v-model="objData.memberId"
            remote
            clearable 
            filterable 
            :remote-method="remoteMethod" 
            :placeholder="$i('cms_employer_list_employer')">
            <el-option v-for="item in listMember" :key="item.id" :label="item.companyName" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-6 col-lg-3 col-12">
          <input class="form-control input-search-2" :placeholder="$i('cms_job_post_input_search_location')" v-model="objData.shopName">
        </div>
        <div class="col-md-6 col-lg-3 col-12">
          <input class="form-control input-search-2" :placeholder="$i('cms_job_post_input_min_saraly')" type="number" v-model="objData.minSalary">
        </div>
        <div class="col-md-6 col-lg-3 col-12">
          <input class="form-control input-search-2" :placeholder="$i('cms_job_post_input_max_saraly')" type="number" v-model="objData.maxSalary">
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6 col-lg-3 col-12">
          <el-select 
            v-model="objData.provinceId" 
            remote
            clearable :placeholder="$i('Province')">
            <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-6 col-lg-3 col-12">
          <el-select 
            v-model="objData.districtId"
            remote
            clearable
            :placeholder="$i('District')">
            <el-option v-for="item in listDistricts" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-6 col-lg-3 col-12">
          <el-select v-model="objData.trainLineId" disabled="disabled" :placeholder="$i('cms_job_post_input_line')">
            <el-option value="-1" label="--Select--"></el-option>
          </el-select>
        </div>
        <div class="col-md-6 col-lg-3 col-12">
          <el-select v-model="objData.stationIds" multiple collapse-tags :placeholder="$i('cms_job_post_input_station')">
            <el-option v-for="item in listStations" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 text-center">
          <button class="btn bg-orange btn-search " type="button" @click="searchJob()">
            {{$i('Search')}}
            <i :class="loading ? 'text-white':'text-orange'" class="fa fa-spinner fa-spin"></i>
          </button>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-4">
          <div class="text-left">
            <input class="btn border-orange text-orange btn-create" type="button" :value="$i('create_job_post')" @click="create()" />
          </div>
        </div>
        <div class="col-8">
          <div class="text-right">
            <button class="btn text-bold btn-view-status" type="button" @click="gettab()" :class="{ 'bg-orange': checktab === true,'text-white': checktab === true}">{{$i('cms_job_post_view_status')}}</button>
            <button class="btn text-bold btn-list-view" type="button" @click="gettab()" :class="{ 'bg-orange': checktab === false,'text-white': checktab === false}">{{$i('viewAll')}}</button>
          </div>
        </div>
      </div>
      <div class="row mt-4 mb-4">
        <div class="col-12 execute-line">
          <div class="text-chosen">
            {{$i('cms_chosen_post')}}
          </div>
          <el-select v-model="statusChange" collapse-tags class="input-search-2 input-chosen" :placeholder="$i('cms_job_post_non_publish')">
            <el-option v-for="e in listTab" :value="e.id" :key="e.id" :label="$i(e.label)"></el-option>
          </el-select>
          <input class="btn text-bold text-white btn-list-view bg-27ACCE" type="button" @click="saveStatus" :value="$i('cms_application_execute')" />
        </div>
      </div>
      <div v-if="checktab" class="row">
        <div class="col-12">
          <input class=" text-bold text-white btn-list-tab" v-for="(e,i) in listTab" :key="i" @click="clickTab(i)" type="button" :value="$i(e.label)" :class="{ 'active': e.status == 'active'}" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="table-responsive" :class="{'bt-f89e1f':checktab}">
            <table class="table table-minwidth fixed-table">
              <thead>
              <tr class="border-top-none">
                <th class=" text-center">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                </th>
                <th class=""> {{ $i('cms_jobs_post_id') }}
                  <div class="form-search-header">
                    <input type="text" class="search-detail" v-model="searchKey" :placeholder="$i('Search')">
                  </div>
                </th>
                <th class="width-title fixed-left-row">{{ $i('cms_job_post_title') }}
                </th>
                <th class="width-loca">{{ $i('cms_job_post_input_search_location') }}
                  <div class="form-search-header">
                    <input type="text" class="search-detail" v-model="searchLocation" :placeholder="$i('Search')">
                  </div>
                </th>
                <th class=""> {{ $i('cms_job_post_work_place') }}</th>
                <th class=""> {{ $i('Company') }}</th>
                <th class=""> {{ $i('cms_job_post_nearest_station') }}
                  <div class="form-search-header">
                    <input type="text" class="search-detail" v-model="searchStation" :placeholder="$i('Search')">
                  </div>
                </th>
                <th class=""> {{ $i('cms_job_post_posting_date') }}</th>
                <th class=""> {{ $i('cms_job_post_closing_date') }}</th>
                <th>{{$i('cms_post_job_salary')}}</th>
                <th class=""> {{ $i('cms_job_post_status') }}</th>
                <th class="text-center fixed-right-column fixed-right-row"> {{ $i('cms_job_post_action') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="checkKeyword" v-for="(v, k) in listSearch" :key="k">
                <td class="width-60 text-center" @click.stop="">
                  <el-checkbox-group v-model="checkedIndex" @change="handleCheckedIndex">
                    <el-checkbox :label="v.id" :key="v.id"></el-checkbox>
                  </el-checkbox-group>
                </td>
                <td class="text-center">{{ v.id }}</td>
                <td class="fixed-left-row">
                  <div class="width-350 td-nowrap"  :title="v.title">
                     <a href="javascript:;" @click="$router.push('/employerpost/show/' + v.id)">{{v.title}}</a>
                  </div>
                </td>
                <td>
                  <div class="width-350 td-nowrap" :title="v.shopName">
                    <a href="javascript:;" @click="$router.push('/employerpost/show/' + v.id)">{{v.shopName}}</a>
                  </div>
                </td>
                <td>
                  <div class="td-nowrap" :title="v.provinceName + v.districtName + v.townName +  v.address">{{v.provinceName}} {{v.districtName}} {{v.townName}} {{v.address}}</div>
                </td>
                <td>
                  <div class="width-200 td-nowrap" :title="v.companyName">{{v.companyName}}</div>
                </td>
                <td>
                  <p v-for="(station,i) in v.stations" :key="i">{{station.stationName}} </p>
                </td>
                <td>
                  <div class="nowrap-row">{{formatDate(v.startDate)}}</div>
                </td>
                <td>
                  <div class="nowrap-row">{{formatDate(v.endDate)}}</div>
                </td>
                <td>
                  <div class="width-100 td-nowrap text-right" :title="v.salary">{{formatPrice(v.salary)}}</div>
                </td>
                <td>
                  <button class="btn__pill" v-for="status in listTab" :key="status.id" v-if="status.id == v.status" :class="status.class">{{$i(status.label)}} </button>
                </td>
                <td class="btn-action fixed-right-row" @click.stop="">
                  <div class="width-120 nowrap-row fixed-right-column ">
                    <button :disabled="v.status==3" :class="{'not-allowed':v.status==3}" class="btn text-white bg-orange" @click="redirect(v.id)">
                      <i class="fa fas fa-edit"></i>
                    </button>
                    <button class="btn btn-trash" @click="deleteRow(v.id)">
                      <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="btn" @click="translate(v.id)">
                      <i class="mdi mdi-google-translate"></i>
                    </button>
                  </div>
                
                </td>
              </tr>
              <tr v-if="!checkKeyword" v-for="(v, k) in employerPostList" :key="k">
                <td class="width-60 text-center" @click.stop="">
                  <el-checkbox-group v-model="checkedIndex" @change="handleCheckedIndex">
                    <el-checkbox :label="v.id" :key="v.id"></el-checkbox>
                  </el-checkbox-group>
                </td>
                <td class="text-center">{{ v.id }}</td>
                <td class="fixed-left-row">
                  <div class="width-350 td-nowrap"  :title="v.title">
                     <a href="javascript:;" @click="$router.push('/employerpost/show/' + v.id)">{{v.title}}</a>
                  </div>
                </td>
                <td>
                  <div class="td-nowrap" :title="v.shopName">
                    <a href="javascript:;" @click="$router.push('/employerpost/show/' + v.id)">{{v.shopName}}</a>
                  </div>
                </td>
                <td>
                  <div class="td-nowrap" :title="v.provinceName + v.districtName + v.townName +  v.address">{{v.provinceName}} {{v.districtName}} {{v.townName}} {{v.address}}</div>
                </td>
                <td>
                  <div class="td-nowrap" :title="v.companyName">{{v.companyName}}</div>
                </td>
                <td>
                  <p v-for="(station,i) in v.stations" :key="i">{{station.stationName}} </p>
                </td>
                <td>
                  <div class="nowrap-row">{{formatDate(v.startDate)}}</div>
                </td>
                <td>
                  <div class="nowrap-row">{{formatDate(v.endDate)}}</div>
                </td>
                <td>
                  <div class="td-nowrap text-right" :title="v.salary">{{formatPrice(v.salary)}}</div>
                </td>
                <td>
                  <button class="btn__pill" v-for="status in listTab" :key="status.id" v-if="status.id == v.status" :class="status.class">{{$i(status.label)}} </button>
                </td>
                <td class="btn-action fixed-right-row" @click.stop="">
                  <div class="width-120 nowrap-row">
                    <button :disabled="v.status==3" :class="{'not-allowed':v.status==3}" class="btn text-white bg-orange" @click="redirect(v.id)">
                      <i class="fa fas fa-edit"></i>
                    </button>
                    <button class="btn btn-trash" @click="deleteRow(v.id)">
                      <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="btn" @click="translate(v.id)">
                      <i class="mdi mdi-google-translate"></i>
                    </button>
                  </div>
                
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <pager :total="employerPostCount" :pageIndex="objData.pageIndex" :pageSize="objData.pageSize" @change="pageChange" />
      <div class="row mt-4 mb-5">
        <div class="col-12 execute-line">
          <div class="text-chosen">
            {{$i('cms_chosen_post')}}
          </div>
          <el-select v-model="statusChange" collapse-tags class="input-search-2 input-chosen" :placeholder="$i('cms_job_post_non_publish')">
            <el-option v-for="e in listTab" :value="e.id" :key="e.id" :label="e.label"></el-option>
          </el-select>
          <input class="btn text-bold text-white btn-list-view bg-27ACCE" type="button" @click="saveStatus" :value="$i('cms_application_execute')" />
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    export default {
        data() {
            return {
                checkAll: false,
                checkedIndex: [],
                isIndeterminate: true,
                listTab: [
                    {
                        id: 1,
                        label: 'Active',
                        status: 'active',
                        class: 'btn__pill__green'
                    },
                    {
                        id: 2,
                        label: 'cms_job_post_invalid',
                        status: 'deactive',
                        class: 'btn__pill__red'
                    },
                    {
                        id: 3,
                        label: 'Expired',
                        status: 'deactive',
                        class: 'btn__pill__orange'
                    },
                    {
                        id: 4,
                        label: 'Non-posting',
                        status: 'deactive',
                        class: 'btn__pill__grey'
                    }
                ],
                loading: false,
                checktab: true,
                objData: {
                    shopName: null,
                    minSalary: null,
                    maxSalary: null,
                    pageSize: 10,
                    pageIndex: 1,
                    provinceId: null,
                    districtId: null,
                    stationIds: [],
                    memberId: null,
                    orderType: 'DESC',
                    hideInActive: 0,
                    pageSize: 10,
                    pageIndex: 1,
                    status:1
                },
                jobTypeIds: [],
                listMember: [],
                objDataMember: {
                    pageSize: 10,
                    pageIndex: 1,
                    searchKeyword: '',
                },
                objLocation: {
                    pageIndex: 1,
                    pageSize: 30,
                    provinceId: -1,
                    trainLineId: -1
                },
                listDistricts: [],
                listProvinces: [],
                listStations: [],
                listTrainLines: [],
                employerPostId: 0,
                status: 1,
                statusChange: null,
                inactive: false,
                searchKey: '',
                searchLocation: '',
                searchStation: '',
                listSearch: [],
                employerPostList: [],
                checkKeyword:false
            }
        },
        watch: {
            'searchKey' (value) {
                this.searchLocation = ''
                this.searchStation = ''
                if(value || this.searchLocation || this.searchStation) this.checkKeyword = true
                else this.checkKeyword = false
                
                this.filterId(value, this.employerPostList, 'obj',  'id')
            },
            'searchLocation' (value) {
                this.searchKey = ''
                this.searchStation = ''
                if(value || this.searchKey || this.searchStation) this.checkKeyword = true
                else this.checkKeyword = false
                this.filterId(value, this.employerPostList, 'obj', 'shopName')
            },
            'searchStation' (value) {
                this.searchLocation = ''
                this.searchKey = ''
                if(value || this.searchLocation || this.searchKey) this.checkKeyword = true
                else this.checkKeyword = false
                this.filterId(value, this.employerPostList, 'array', 'stations')
            },
            'inactive'(value) {
                this.objData.hideInActive = +value
                this.getList(1)
            },
            'objData.provinceId': function (value) {
                this.objLocation.provinceId = value;
                this.objData.districtId = null;
                this.objData.trainLineId = null;
                this.objData.stationId = [];
                this.getDistrict();
                this.getStation();
            },
            'objData.trainLineId': function (value) {
                this.objLocation.trainLineId = value;
                this.objData.stationId = [];
                this.getStation();
            },
        },
        computed: {
            ...mapGetters(['employerPostCount', 'employerMemberList', ])
        },
        methods: {
            ...mapActions(['deleteEmployerPost', 'updateStatusEmployerPost', 'getListEmployerPost', 'getListEmployerMember', 'searchListDistrict', 'searchListProvince', 'searchListStation']),
            searchJob() {
              this.objData.shopName = this.objData.shopName ? this.removeSpace(this.objData.shopName) : null 
              this.objData.minSalary = this.objData.minSalary ? this.objData.minSalary : null
              this.objData.maxSalary = this.objData.maxSalary ? this.objData.maxSalary : null
              this.objData.provinceId = this.objData.provinceId ? this.objData.provinceId : null
              this.objData.districtId = this.objData.districtId ? this.objData.districtId : null
              this.objData.stationIds = (this.objData.stationIds && this.objData.stationIds.length) ? this.objData.stationIds : []
              this.objData.memberId = this.objData.memberId ? this.objData.memberId : null
              this.getList(1)
            },
            removeSpace(str) {
              if (str) {
                  return str.trim();
              }
            },
            getList(index) {
                if (index) {
                    this.objData.pageIndex = index;
                }
                this.loading = true;
                let listSearch = Object.assign({}, this.objData)
                listSearch.status = this.checktab ? this.status : -1;
                listSearch.orderBy = 'CREATEDDATE';
                listSearch.orderType = 'DESC';
                console.log(listSearch)
                this.getListEmployerPost(listSearch)
                    .then((respon) => {
                        this.loading = false;
                        this.employerPostList = respon.data
                        this.checkKeyword = false
                        this.searchKey = ''
                        this.searchLocation = ''
                        this.searchStation = ''
                    })
                    .catch(err => {
                        this.loading = false;
                        this.$error(err.message);
                    })
            },
            filterId(needle, heystack, type, key) {
                var query = needle;
                let array = [];
                if(type == 'obj') {
                    heystack.filter(function (item) {
                        if (item[key].indexOf(query) >= 0) array.push(item);
                    })
                }
                else {
                    heystack.filter(function (item) {
                        item.stations.filter(function (e) {
                            if (e.stationName.indexOf(query) >= 0) array.push(item);
                        })
                    })
                }
                this.listSearch = [...array];
                
            },
            translate(id) {
                this.employerPostId = id || 0;
                if (this.employerPostId) {
                    return this.$router.push('/employerpost/translate/' + this.employerPostId);
                }
            },
            handleCheckAllChange(val) {
                this.checkedIndex = val ? this.employerPostList.map(e => e.id) : [];
                this.isIndeterminate = false;
            },
            handleCheckedIndex(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.employerPostList.map(e => e.id).length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.employerPostList.map(e => e.id).length;
            },
            deleteRow(id) {
                this.$confirm(this.$i('DoYouWantDeleteEmployerPost')).then(() => {
                    this.deleteEmployerPost(id)
                        .then(() => {
                            this.getList(1);
                        })
                        .catch(err => {
                            this.$error(err.message);
                        })
                })
            },
            getDistrict() {
                this.searchListDistrict(this.objLocation)
                    .then((respon) => {
                        this.listDistricts = respon.data
                    }).catch((error) => {
                    this.$error(error.message);
                })
            },
            getStation() {
                this.searchListStation(this.objLocation)
                    .then((respon) => {
                        this.listStations = respon.data;
                    }).catch((error) => {
                    this.$error(error.message);
                })
            },
            getProvince() {
                this.searchListProvince()
                    .then((respon) => {
                        this.listProvinces = respon.data
                    }).catch((error) => {
                    this.$error(error.message);
                })
            },
            gettab() {
                this.checktab = !this.checktab
                this.getList(1)
                this.checkAll = false
                this.checkedIndex = []
            },
            clickTab(item) {
                this.listTab.map(e => {
                    e.status = 'deactive'
                })
                this.listTab[item].status = 'active'
                this.status = this.listTab[item].id
                this.getList(1)
                this.checkAll = false
                this.checkedIndex = []
            },
            create() {
                this.$router.push('/employerpost/create');
            },
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getList();
            },
            redirect(id) {
                this.employerPostId = id || 0;
                if (this.employerPostId) {
                    return this.$router.push('/employerpost/edit/' + this.employerPostId);
                }
            },
            getDataMember() {
                this.getListEmployerMember(this.objDataMember).then(res => {
                    this.listMember = res.data;
                }).catch(err => {
                    this.$error(err.message);
                })
            },
            remoteMethod(value) {
                if (value !== '') {
                    setTimeout(() => {
                        this.objDataMember.searchKeyword = value;
                        this.getDataMember();
                    }, 200);
                } else {
                    this.objDataMember.searchKeyword = '';
                }
            },
            saveStatus() {
                let dataSave = {
                    employerPostId: this.checkedIndex,
                    status: this.statusChange
                }
                if(!this.checkedIndex || !this.checkedIndex.length) {
                    this.$message(this.$i('You_have_not_selected_job'),'error');
                }
                else
                    if(!this.statusChange || !this.statusChange > 0) {
                    this.$message(this.$i('LabelErrorEmptyStatus'),'error');
                }
                else {
                    let confirm = 'DoYouWantToChangeStatus'
                    this.$confirm(this.$i(confirm)).then(() => {
                        this.updateStatusEmployerPost(dataSave)
                            .then((res) => {
                                if (res.success) {
                                    this.$message(this.$i('Successful'));
                                }
                                this.getList(1);
                                this.checkedIndex = []
                            })
                            .catch(err => {
                                this.$error(err.message);
                            })
                    })
                }
            }
        },
        mounted() {
            this.getList();
            this.getDistrict();
            this.getProvince();
            this.getStation();
            this.getDataMember();
        },
    }
</script>

<style scoped>
  tbody tr:hover {
    background: #F6FAFD;
  }
  
  .check-size-small input[type="checkbox"] {
    display: none;
  }
  
  .form-checkbox.check-size-small {
    margin-bottom: 0px;
  }
  
  .form-checkbox.check-size-small span {
    padding: 0;
    height: 17px;
    width: 17px;
    display: block
  }
  
  .form-checkbox.check-size-small span::before,
  .form-checkbox.check-size-small input[type="checkbox"]:checked+span:after {
    width: 17px;
    height: 17px;
    line-height: 17px;
  }
  
  .width-120 {
    width: 120px !important;
  }
  
  .nowrap-row {
    white-space: nowrap;
  }
  
  table p {
    margin-bottom: 0px;
  }
  
  .width-title {
    width: 300px;
  }
  
  .width-loca {
    width: 200px;
  }
  .not-allowed {
    cursor: not-allowed;
  }
  .table td a {
    color: #212529;
  }
</style>
