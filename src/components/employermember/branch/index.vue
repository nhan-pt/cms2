<template>
<div>
    <div class="group-btn-employer mb-4">
        <div class="row d-flex justify-content-between mb-4">
            <div class="col-12 text-right">
                    <button class="btn-publish w-25 bg-orange" @click="$router.push('/branch/create' )">
                        {{$i('cms_new_branch')}}
                    </button>
            </div>
        </div>
    </div>
    <div class="table__location__wrapper">
        <table class="table table-borderless fixed-table">
            <thead>
                <tr>
                    <th class="width-180 td-nowrap">
                        {{$i('cms_employer_list_employer')}}	
                    </th>
                    <th class="width-150 td-nowrap">
                        {{$i('cms_name_branch')}}
                    </th>
                    <th class="width-250 td-nowrap">
                        {{$i('cms_employer_list_Address')}}
                    </th>
                    <th class="width-120 td-nowrap">
                        {{$i('cms_job_post_nearest_station')}}
                    </th>
                    <th>
                        {{$i('cms_employer_list_Status')}}
                    </th>
                </tr>
            </thead>
            <tbody v-if="listLocation">
                <tr v-for="item in listLocation" :key="item.id" @click="$router.push('/branch/detail/'+item.id)">
                    <td :title="item.employerCompanyName">{{item.employerCompanyName}}</td>
                    <td :title="item.name">{{item.name}}</td>
                    <td >{{$address(item.address)}}</td>
                    <td v-if="item.address">                                        
                        <div v-for="i in item.address.stations" :key="i.id" :title="i.trainStationName">
                           <div :title="i.trainStationName"> {{ i.trainStationName }} </div>
                        </div>
                    </td>
                    <td v-else="">                                        
                    </td>
                    <td>{{getStatus(item)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <pager :total="totalRow" :pageIndex="objDataLocationEmployer.pageIndex" :pageSize="objDataLocationEmployer.pageSize" @change="pageChange" />
    <div class="group-btn-employer mb-4">
        <div class="row">
            <div class="col-12 text-right">
                <button class="btn-publish w-25 bg-orange btn__add__location_2" @click="$router.push('/branch/create' )">
                     {{$i('cms_new_branch')}}
                </button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    BranchStatus
} from '../../../types/enum'
export default {
    data() {
        return {
            branchACTIVE: BranchStatus.ACTIVE
        }
    },
    props:['listLocation','objDataLocationEmployer','totalRow','getListBranchsEmployer'],
    methods: {
           pageChange(pageNum) {
            this.$set(this.objDataLocationEmployer, 'pageIndex', pageNum);
            this.getListBranchsEmployer();
        },
    },
    created() {
    }
}
</script>
