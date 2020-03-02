<template>
    <wrapper :title="$i('JobTypeList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input type="text" :placeholder="$i('Keyword')" v-model="objDataSearch.name" class="form-control"/>
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objDataSearch.parentId">
                        <option value="-1">{{ $i('Select') }}</option>
                        <option v-for="item in listParentJobType" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objDataSearch.status">
                        <option :value="-1">{{$i('SelectStatus')}}</option>
                        <option :value="1">{{$i('Active')}}</option>
                        <option :value="0">{{$i('DeActived')}}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <input class="btn btn-info" type="button" :value="$i('Search')" v-on:click="searchData(1)"/>
                    <input class="btn btn-primary" type="button" @click="openPopup(0)" :value="$i('Add')"/>
                </div>
            </div>
            <div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="width-100">{{$i('Index')}}</th>
                        <th>{{$i('Title')}}</th>
                        <th>{{$i('ParentCategory')}}</th>
                        <th>{{$i('JapaneseCertification')}}</th>
                        <th class="text-center width-150">{{$i('Action')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(jobType, index) in listJobType" class="post-item-group">
                        <td>{{ index+1 + rowNum }}</td>
                        <td><a href="javascript:;" @click="openPopup(jobType.id)" style="color: #0f74a8;">{{ jobType.name }}</a></td>
                        <td v-if="jobType.parentName">{{ jobType.parentName }}</td>
                        <td v-else>{{ $i('No') }}</td>
                        <td>{{ jobType.japaneseCertificationName }}</td>
                        <td class="btn-action">
                            <button :title="$i('Remove')" class="btn btn-danger" v-if="jobType.status == 1"
                                    v-on:click="removeJobType(jobType, index)">
                                <i class="fas fa-times"></i>
                            </button>
                            <button :title="$i('Publish')" class="btn btn-primary" v-on:click="publishJobType(jobType, index)"
                                    v-else>
                                <i class="fa fas fa-check"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="jobTypeCount" :pageIndex="objDataSearch.pageIndex" :pageSize="objDataSearch.pageSize" @change="pageChange"/>
        <modal v-if="popupEditJobType" :title="$i(this.titleModal)" @close="popupEditJobType = false">
            <div slot="body">
                <editJobType :jobTypeId="this.objDataUpdate.id" v-on:closePopup="closePopup()"></editJobType>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editJobType from './edit';

    export default {
        components: {
            'editJobType': editJobType,
        },
        data() {
            return {
                objDataSearch: {
                    id: -1,
                    name: '',
                    status: 1,
                    parentId: -1,
                    pageIndex: 1,
                    pageSize: 10
                },
                objDataUpdate: {
                    id: -1,
                    name: '',
                    status: -1,
                    parentId: -1,
                },
                objDataParent: {
                    id: -1,
                    name: '',
                    status: 1,
                    parentId: 0,
                    pageIndex: 1,
                    pageSize: 100
                },
                titleModal: '',
                popupEditJobType: false,
                listJobType: [],
            }
        },
        computed: {
            ...mapGetters(['listParentJobType','jobTypeCount']),
            rowNum() {
                return (this.objDataSearch.pageIndex - 1) * this.objDataSearch.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListJobType', 'saveEditJobType','getListParentJobType']),
            searchData(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objDataSearch.pageIndex = index;
                }
                this.getListJobType(this.objDataSearch).then((res) => {
                    this.listJobType = res.data;
                    loading.hide();
                }).catch(error => {
                    loading.hide();
                    return this.$message(error.message, 'error');
                })
            },
            pageChange(pageNum) {
                this.$set(this.objDataSearch, 'pageIndex', pageNum);
                this.searchData();
            },
            removeJobType(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToHide')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 0;
                    this.saveEditJobType(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listJobType[index].status = 0;
                            this.searchData();
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            publishJobType(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToPublish')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 1;
                    this.saveEditJobType(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listJobType[index].status = 1;
                            this.searchData();
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            closePopup() {
                this.popupEditJobType = false;
                this.searchData();
            },
            openPopup(id) {
                if( id > 0 ){
                    this.titleModal = 'TitleEditJobType';
                }else{
                    this.titleModal = 'TitleAddJobType';
                }
                this.popupEditJobType = true;
                this.objDataUpdate.id = id || 0;
            },
            getParentJobType(){
                this.getListParentJobType(this.objDataParent).then(() =>{
                }).catch((error) =>{
                    return this.$message(error.message, 'error');
                })
            }
        },
        created() {
            this.searchData();
            this.getParentJobType();
        }
    };
</script>