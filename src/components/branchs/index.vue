<template>
<div class="template w-100 bg-white position-relative">
    <div class="d-flex align-items-center template-title ">
        <i class="fas fa-bars mr-20"></i>
        <p class="m-0">{{$i('cms_search_branch')}}</p>
    </div>
    <div class="text-right mr-35">
        <ExportDetail/>
        <button class="btn btn-add-employer" @click="$router.push('/branch/create' )">{{$i('cms_new_branch')}}</button>
    </div>
    <div class="template-content">
        <div class="row mt-2">
            <div class="col-md-6 col-lg-3 col-12">
                <div class="text-bold mb-2">{{$i('cms_emloyer_list_prefecture')}}</div>
                <el-select v-model="searchBranch.provinceId" filterable clearable remote maxlength="1" :placeholder="$i('cms_emloyer_list_prefecture')">
                    <el-option v-for="pr in province" :key="pr.id" :label="pr.name" :value="pr.id">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <div class="text-bold mb-2">{{$i('cms_employer_list_city')}}</div>
                <el-select v-model="searchBranch.districtId" filterable clearable  remote :placeholder="$i('cms_employer_list_city')">
                    <el-option v-for="item in listDistrict" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div> 
            <div class="col-md-6 col-lg-3 col-12">
                <div class="text-bold mb-2">{{$i('cms_employer_list_line')}}</div>
                <el-select v-model="searchBranch.trainLineId" remote clearable disabled="disabled" :placeholder="$i('cms_employer_list_line')">
                    <el-option v-for="item in listTrainLines" :key="item.trainLineId" :label="item.name" :value="item.trainLineId">
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <div class="text-bold mb-2">{{$i('cms_employer_list_Station')}}</div>
                <el-select v-model="searchBranch.stationIds" multiple filterable collapse-tags  remote clearable :placeholder="$i('cms_employer_list_Station')">
                    <el-option v-for="item in listStations" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>

        </div>
        <div class="row mt-2">
            <div class="col-md-6 col-lg-3 col-12">
                <div class="text-bold mb-2">{{$i('cms_employer_list_employer')}}</div>
                <el-select v-model="searchBranch.employerId" clearable filterable :loading="loadEmployer" :remote-method="remoteEmployer" remote :placeholder="$i('cms_employer_list_employer')">
                    <el-option v-for="(em,i) in listEmployer" 
                        :key="em.code + i" 
                        :label="em.companyName" 
                        :value="em.id" 
                        :title="$i('cms_employer_list_employer') + ': ' + em.companyName + ' \n' + $i('cms_email_branch') + ': ' + em.email + ' \n' + $i('cms_employer_create_tel') + ': ' + em.mobile"
                        >
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-6 col-lg-3 col-12">
                <div class="text-bold mb-2">{{$i('cms_search_keyword')}}</div>
                <el-input v-model="searchBranch.searchKeyword" type="text" maxlength="500" :placeholder="$i('cms_placeholder_keyword_branch')"></el-input>
            </div>
            <div class="col-md-6 col-12">
                <div class="text-right">
                    <button class="btn btn-search-employer" @click="search()">{{$i('Search')}}</button>
                    <button class="btn btn-clear" @click="resetFilters">{{$i('cms_employer_list_clear')}}</button>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-minwidth  fixed-table">
                        <thead>
                            <tr class="border-top-none">
                                <th>
                                    {{$i('cms_employer_list_employer')}}
                                </th>
                                <th>
                                    {{$i('cms_name_branch')}}   
                                </th>
                                <th class="fixed-left-row">
                                    {{$i('employer_job_post_detail_location')}}
                                </th>
                                <th>
                                    {{$i('cms_job_post_nearest_station')}}
                                </th>
                                <th>
                                    {{$i('cms_name_section')}}
                                </th>
                                <th class="fixed-right-row">
                                    {{$i('employer_job_post_action')}}
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="listBranch">
                            <tr v-for="v in listBranch" :key="`${v.id}`">
                                <td @click="$router.push('/branch/detail/' + v.id)">
                                    <div class="width-350 td-wrap"  @click.stop="" :title="v.employerCompanyName">
                                        <div>{{v.employerCompanyName}}</div>
                                    </div>
                                </td>
                                <td @click="$router.push('/branch/detail/' + v.id)">
                                    <div class="width-350 td-wrap"  @click.stop="" :title="v.name">
                                        <div>{{v.name}}</div>
                                    </div>
                                </td>
                                <td @click="$router.push('/branch/detail/' + v.id)">
                                    <div class=" td-wrap" @click.stop="" :title="$address(v.address)">
                                        <div>{{$address(v.address)}}</div> 
                                    </div>
                                </td>
                                <td @click="$router.push('/branch/detail/' + v.id)">
                                    <div v-if="v.address">
                                        <div @click.stop="" class="td-nowrap" v-for="(e,i) in v.address.stations" :key="e.stationId">
                                            <div> {{e.trainStationName}}</div>
                                        </div>
                                    </div>
                                </td>
                                <td @click="$router.push('/branch/detail/' + v.id)">
                                    <div @click.stop="" class="td-nowrap text-center" v-for="s in listSection" :key="s.id" v-if="s.id==v.section">
                                        <div>{{$i(s.name)}}</div>
                                    </div>
                                </td>
                                <td class="btn-action fixed-right-row">
                                    <div class="width-100 nowrap-row text-center">
                                        <button class="btn text-white bg-purple" @click="$router.push('/branch/edit/' + v.id)">
                                            <i class="far fa-edit"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <pager :total="totalRow" :pageIndex="objDefault.pageIndex" :pageSize="objDefault.pageSize" @change="pageChange" />

    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import {BranchSection} from '../../types/enum'
import editEmployer from './edit'

export default {
    components: {
        ExportDetail: () => import('./export'),
    },
    data() {
        return {
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
            objLocation: {
                pageIndex: 1,
                pageSize: 9999,
                provinceId: -1
            },
            loadEmployer: false,
            totalRow: 0,
            listBranch: [],
            listDistrict: [],
            listStations: [],
            listTrainLines: [],
            listEmployer: [],
            searchBranch: {
                employerId: null,
                searchKeyword: '',
                districtId: null,
                provinceId: null,
                stationIds: [],
                pageIndex: 1
            },
            objDefault: {
                pageIndex: 1,
                pageSize: 10,
            },
            
        }
    },
    watch: {
        'searchBranch.provinceId': function (value) {
            this.searchBranch.trainLineId = null;
            this.searchBranch.stationIds = [];
            if(value) {
                this.listDistrict = this.district.filter(d => d.provinceId == value)
                this.searchBranch.districtId = this.listDistrict.find(d => this.searchBranch.districtId == d.id) ? this.searchBranch.districtId : null
            }
            this.getStation();
        },
    },
    computed: {
        ...mapGetters(['province','district'])
    },
    methods: {
        ...mapActions(['getListBranch', 'searchListStation', 'getMiniEmployer']),

        remoteEmployer(query) {
            this.loadEmployer = true
            setTimeout(() => {
                this.getListEmployer(query, null);
            },200)
            
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

        search() {
            this.searchBranch.pageIndex = this.objDefault.pageIndex
            localStorage.setItem("search-branch", JSON.stringify(this.searchBranch))
            this.getList(1)
        },

        getList(index) {
            if (index) this.objDefault.pageIndex = index;
            let obj = Object.assign({},JSON.parse(localStorage.getItem("search-branch")))
            obj.pageIndex = this.objDefault.pageIndex   
            for(let i in obj) {
                if(Array.isArray(obj[i])) {
                    if(obj[i].length)   obj[i] = obj[i].toString()
                    else delete obj[i]
                }else {
                    if(!obj[i]) delete obj[i]
                    else if(i == 'searchKeyword') obj[i] = obj[i].trim()
                }
            }
            let loading = this.$loading.show();
            this.getListBranch(obj)
                .then((res) => {
                    loading.hide();
                    this.listBranch = res.data;
                    this.totalRow = res.totalRow;
                })
                .catch(err => {
                    loading.hide();
                    this.$error(err.message);
                })
        },
        getStation() {
            let dataSearch = Object.assign({}, this.objLocation);
            dataSearch.provinceId = this.searchBranch.provinceId || -1;
            this.searchListStation(
                dataSearch)
                .then((respon) => {
                    this.listStations = respon.data;
                }).catch((error) => {
                    this.$error(error.message);
                })
        },
        // reset data
        resetFilters() {
            this.searchBranch.employerId = null
            this.searchBranch.provinceId = null
            this.searchBranch.districtId = null
            this.searchBranch.stationIds = []
            this.searchBranch.searchKeyword = null
            this.searchBranch.pageIndex = 1 // return page 1
            localStorage.setItem("search-branch", JSON.stringify(this.searchBranch))
            this.getList(1);

        },
        //pager
        pageChange(pageNum) {
            this.$set(this.objDefault, 'pageIndex', pageNum);
            if (JSON.parse(localStorage.getItem("search-branch")) != null) {
                let obj = JSON.parse(localStorage.getItem("search-branch"))
                obj.pageIndex = this.objDefault.pageIndex
                localStorage.setItem("search-branch", JSON.stringify(obj))
            } else {
                this.searchBranch.employerId = null,
                this.searchBranch.searchKeyword = null,
                this.searchBranch.districtId = null,
                this.searchBranch.provinceId = null,
                this.searchBranch.stationIds = [],
                this.searchBranch.pageIndex = this.objDefault.pageIndex
                localStorage.setItem("search-branch", JSON.stringify(this.searchBranch))
            }
            this.getList();
        },
    },
    mounted() {
        window.addEventListener('beforeunload', function (e) {
            localStorage.removeItem("search-branch")
        })
        if (JSON.parse(localStorage.getItem("search-branch")) != null) {
            this.searchBranch = JSON.parse(localStorage.getItem("search-branch"))
            this.objDefault.pageIndex = this.searchBranch.pageIndex
            this.getListEmployer(null, this.searchBranch.employerId)
        }else {
            this.getListEmployer(null, null)
        }
        this.getList()
        
    }
}
</script>

<style scoped>

</style>
