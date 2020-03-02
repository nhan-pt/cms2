<template>
<div class="template w-100 bg-white position-relative">
    <div class="d-flex align-items-center template-title ">
        <i class="fas fa-bars mr-20"></i>
        <p class="m-0">{{$i('cms_employer_list_employer_search')}}</p>
    </div>
    <div class="text-right mr-35">
        <ExportDetail :objData="objData" />
        <button class="btn btn-add-employer" @click="$router.push('/employermember/create' )">{{$i('cms_employer_list_add_new_employer')}}</button>

    </div>
    <!-- <div class="d-flex align-items-center mf-20 ">
        <p class="m-0 text-bold">Employer Search</p>
    </div> -->
    <div class="template-content">
        <div class="row mt-2">
            <div class="col-md-6 col-lg-4 col-12">
                <div class="text-bold mb-2">{{$i('cms_emloyer_list_prefecture')}}</div>
                <el-select v-model="objData.provinceId" collapse-tags clearable :placeholder="listProvinces[12].name" remote>
                    <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-4 col-12">
                <div class="text-bold mb-2">{{$i('cms_employer_list_city')}}</div>
                <el-select v-model="objData.districtId" collapse-tags clearable :placeholder="listDistricts[0].name" remote>
                    <el-option v-for="item in listDistricts" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-4 col-12">
                <div class="text-bold mb-2">{{$i('cms_employer_list_Section')}}</div>
                <el-select v-model="objData.section" collapse-tags clearable :placeholder="$i(listSection[0].label)">
                    <el-option v-for="e in listSection" :value="e.id" :key="e.id" :label="$i(e.label)">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-6 col-lg-4 col-12">
                <div class="text-bold mb-2">{{$i('cms_employer_list_line')}}</div>
                <el-select v-model="objData.trainLineId" collapse-tags :placeholder="listTrainLines[0].name" remote clearable disabled="disabled">
                    <el-option v-for="item in listTrainLines" :key="item.trainLineId" :label="item.name" :value="item.trainLineId">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-4 col-12">
                <div class="text-bold mb-2">{{$i('cms_employer_list_Station')}}</div>
                <el-select v-model="objData.stationIds" multiple collapse-tags :placeholder="listStations[0].name" remote clearable>
                    <el-option v-for="item in listStations" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-4 col-12">
                <div class="text-bold mb-2">{{$i('cms_employer_list_Status')}}</div>
                <el-select v-model="objData.status" remote clearable collapse-tags :placeholder="$i(listStatus[0].label)">
                    <el-option v-for="item in listStatus" :key="item.id" :label="$i(item.label)" :value="item.id">
                    </el-option>
                </el-select>
            </div>

        </div>
        <div class="row mt-4">

            <div class="col-6">
                <div class="inner-item">
                    <div class="mr-90">
                        <div class="text-bold mb-2 ">{{$i('cms_employer_list_employees_number')}}</div>
                    </div>
                    <div class="mr-35">
                        <input type="number" class="text_employer" v-model="objData.minEmployee" placeholder="5" />
                    </div>
                    <div class="mr-35">
                        <div class="">{{$i('cms_employer_list_to')}}</div>

                    </div>
                    <div>
                        <input type="number" class="text_employer" v-model="objData.maxEmployee" placeholder="50" />
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="inner-item">
                    <div class="mr-90">
                        <div class="text-bold mb-2">{{$i('cms_employer_list_capital')}} (万円)</div>
                    </div>
                    <div>
                        <input class="text_employer mr-35" v-model="objData.minCapital" placeholder="1000" />
                    </div>
                    <div class="">
                        <div class="mb-2 mr-35">{{$i('cms_employer_list_to')}}</div>
                    </div>
                    <div>
                        <input class="text_employer" v-model="objData.maxCapital" placeholder="5000" />
                    </div>
                </div>

            </div>

        </div>
        <div class="text-right mr-35">
            <button class="btn btn-search-employer" @click="getList(1)">{{$i('cms_employer_list_search')}}</button>
            <button class="btn btn-clear" @click="resetFilters">{{$i('cms_employer_list_clear')}}</button>

        </div>
        <div class="row mt-4 mb-4">
            <div class="col-12 execute-line">
<!--                <div class="text-chosen">-->
<!--                    {{$i('cms_employer_list_select_employer')}}-->
<!--                </div>-->
<!--                <el-select v-model="statusChange" collapse-tags class="input-search-2 input-chosen" :placeholder="$i('cms_job_post_non_publish')">-->
<!--                    <el-option v-for="e in listSection" :value="e.id" :key="e.id" :label="$i(e.label)"></el-option>-->
<!--                </el-select>-->
<!--                <input class="btn text-bold text-white btn-list-view bg-27ACCE" type="button" @click="saveStatus" :value="$i('cms_application_execute')" />-->
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-minwidth  fixed-table">
                        <thead>
                            <tr class="border-top-none">
                                <th class=" text-center">
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                                </th>
                                <th class="fixed-left-row">
                                    ID
                                </th>
                                <th class="">
                                    {{$i('cms_employer_list_employer')}}
                                </th>
                                <th class="">
                                    {{$i('cms_employer_list_location_num')}}
                                </th>
                                <th class=""> {{$i('cms_employer_list_Address')}}</th>
                                <th class=""> {{$i('cms_employer_list_Station')}}</th>
                                <th class="">{{$i('cms_employer_list_employees_number')}}
                                </th>
                                <th class=""> {{$i('cms_employer_list_capital')}} (万円)</th>
                                <th class=""> {{$i('cms_employer_list_Section')}}</th>
                                <th class=""> {{$i('cms_employer_list_Status')}}</th>
                                <th class="fixed-right-row"> </th>
                            </tr>
                        </thead>
                        <tbody v-if="employerMemberList">
                            <tr v-for="v in employerMemberList" :key="`${v.id}`" @click="$router.push('/employermember/detail/' + v.id)">
                                <td class="width-60 text-center" @click.stop="">
                                    <el-checkbox-group v-model="checkedIndex" @change="handleCheckedIndex">
                                        <el-checkbox :label="v.id" :key="v.id"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                                <td class="fixed-left-row">
                                    <div >{{ v.id }}</div>
                                </td>
                                <td class="td-nowrap" :title="v.companyName">
                                    <div class="display_inline">{{ v.companyName }}</div>
                                </td>
                                <td class="text-left td-nowrap" :title="v.totalBranches">
                                    <div class="display_inline">{{ v.totalBranches }}</div>
                                </td>
                                <td class="text-left td-nowrap">
                                    <div class="display_inline" :title="v.address.provinceName + '' +v.address.districtName+''+v.address.townName+''+v.address.address" v-if="v.address">{{ v.address.provinceName }}{{v.address.districtName }}{{v.address.townName}}{{v.address.address}}</div>
                                </td>

                                <td class="td-wrap">
                                    <div class="display_inline" v-if="v.address">
                                        <div v-for="i in v.address.stations" :key="i.id" :title="i.trainStationName">{{ i.trainStationName }}</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="display_inline" :title="v.totalEmployee">{{ v.totalEmployee }}</div>
                                </td>
                                <td> {{(v.capital) }}</td>
                                <td>{{v.section === 1 ? $i('cms_employer_list_public') : v.section === 0 ? $i('cms_employer_list_private') : ""}}</td>
                                <td>{{v.status === 1 ? $i('cms_employer_list_active') : v.status === 2 ? $i('cms_employer_list_unconfirm') : " "}}</td>
                                <td class="btn-action fixed-right-row" @click.stop="">
                                    <button class="btn_edit_employer">
                                        <i class="far fa-edit" @click="$router.push('/employermember/edit/' + v.id)"></i>
                                    </button>
                                    <button class="btn_trash_employer" @click.stop="">
                                        <i class="far fa-trash-alt" @click="deleteEvent(v.id)"></i> </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <pager :total="employerMemberCount" :pageIndex="objData.pageIndex" :pageSize="objData.pageSize" @change="pageChange" />
<!--        <div class="row mt-4 mb-5">-->
<!--            <div class="col-12 execute-line">-->
<!--                <div class="text-chosen">-->
<!--                    Select Employer-->
<!--                </div>-->
<!--                <el-select v-model="statusChange" collapse-tags class="input-search-2 input-chosen" :placeholder="$i('cms_job_post_non_publish')">-->
<!--                    <el-option v-for="e in listSection" :value="e.id" :key="e.id" :label="$i(e.label)"></el-option>-->
<!--                </el-select>-->
<!--                <input class="btn text-bold text-white btn-list-view bg-27ACCE" type="button" @click="saveStatus" :value="$i('cms_application_execute')" />-->
<!--            </div>-->
<!--        </div>-->

    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import editEmployer from './edit'

export default {
    components: {
        ExportDetail: () => import('./export'),
    },
    data() {
        return {
            checkAll: false,
            checkedIndex: [],
            isIndeterminate: true,
            listSection: [{
                    id: 1,
                    label: 'cms_employer_list_public',
                    status: 'public',
                    class: 'btn__pill__green'
                },
                {
                    id: "0",
                    label: 'cms_employer_list_private',
                    status: 'private',
                    class: 'btn__pill__red'
                },

            ],
            listStatus: [{
                    id: 2,
                    label: 'cms_employer_list_unconfirm',
                    status: 'UNCONFIRM',
                    class: 'btn__pill__green'
                },
                {
                    id: 1,
                    label: 'cms_employer_list_active',
                    status: 'ACTIVE',
                    class: 'btn__pill__red'
                },

            ],

            id: 1,
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
            statusChange: null,

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
        ...mapGetters(['employerMemberList', 'employerMemberCount', 'objData'])
    },
    methods: {
        ...mapActions(['saveSearchObj', 'getListEmployerMember', 'searchListProvince', 'searchListDistrict', 'searchTrainLine', 'searchListStation', 'updateSectionEmployer', 'deleteEmployer']),

        getList(index) {
            let loading = this.$loading.show();
            if (index) {
                this.objData.pageIndex = index;
            }
            this.objData.provinceId = this.objData.provinceId == -1 ? null : this.objData.provinceId
            this.objData.districtId = this.objData.districtId == -1 ? null : this.objData.districtId
            this.objData.section = this.objData.section == -1 ? null : this.objData.section
            this.objData.trainLineId = this.objData.trainLineId == -1 ? null : this.objData.trainLineId
            this.objData.status = this.objData.status == -1 ? null : this.objData.status
            this.objData.minEmployee = this.objData.minEmployee == "" ? null : this.objData.minEmployee
            this.objData.maxEmployee = this.objData.maxEmployee == "" ? null : this.objData.maxEmployee
            this.objData.minCapital = this.objData.minCapital == "" ? null : this.objData.minCapital
            this.objData.maxCapital = this.objData.maxCapital == "" ? null : this.objData.maxCapital

            this.saveSearchObj(this.objData);
            this.getListEmployerMember(this.objData)
                .then(() => {
                    loading.hide();
                })
                .catch(err => {
                    loading.hide();
                    this.$error(err.message);
                })
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            let money = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            return money.split(',')[0]
        },
        //get select
        getProvince() {
            this.searchListProvince()
                .then((respon) => {
                    this.listProvinces = respon.data
                }).catch((error) => {
                    this.$error(error.message);
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
        getTrainLine() {
            this.searchTrainLine(this.objLocation)
                .then((respon) => {
                    this.listTrainLines = respon.data
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
        // reset data
        resetFilters() {
            this.objData.provinceId = ''
            this.objData.districtId = ''
            this.objData.trainLineId = ''
            this.objData.stationIds = ''
            this.objData.minEmployee = ''
            this.objData.maxEmployee = ''
            this.objData.minCapital = ''
            this.objData.maxCapital = ''
            this.objData.section = ''
            this.objData.status = ''
            this.getList(1)

        },
        //pager
        pageChange(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            this.checkAll = false
            this.getList();
        },
        //check all employer
        handleCheckAllChange(val) {
            this.checkedIndex = val ? this.employerMemberList.map(e => e.id) : [];
            this.isIndeterminate = false;
        },
        // check item employer
        handleCheckedIndex(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.employerMemberList.map(e => e.id).length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.employerMemberList.map(e => e.id).length;
        },
        //delete
        deleteEvent(id) {
            let dataSave = {
                id: id,
                status: 0
            }
            let confirm = 'DoYouWantDelete'
            this.$confirm(this.$i(confirm)).then(() => {
                this.deleteEmployer(dataSave)
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
        },
        // update section
        saveStatus() {
            let dataSave = {
                ids: this.checkedIndex,
                section: this.statusChange
            }
            if (!this.checkedIndex || !this.checkedIndex.length) {
                this.$message('You select employer', 'error');
            } else
            if (!this.statusChange || !this.statusChange > 0) {
                this.$message(this.$i('LabelErrorEmptySection'), 'error');
            } else {
                let confirm = 'DoYouWantToChangeSection'
                this.$confirm(this.$i(confirm)).then(() => {
                    this.updateSectionEmployer(dataSave)
                        .then((res) => {
                            if (res.success) {
                                this.$message(this.$i('Successful'));
                            }
                            this.getList(1);
                            this.checkedIndex = []
                            this.checkAll = false

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
        this.getProvince();
        this.getDistrict();
        this.getTrainLine();
        this.getStation()

    },
    created() {
        this.getList();
    }
}
</script>

<style scoped>

</style>
