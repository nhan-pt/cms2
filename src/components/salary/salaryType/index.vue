<template>
    <wrapper :title="$i('SalaryTypeList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input type="text" :placeholder="$i('Keyword')" v-model="objDataSearch.name" class="form-control"/>
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
                        <th class="text-center width-150">{{$i('Action')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(salaryType, index) in listSalaryType" class="post-item-group">
                        <td>{{ index+1 + rowNum }}</td>
                        <td><a href="javascript:;" @click="openPopup(salaryType.id)" style="color: #0f74a8;">{{ salaryType.name }}</a></td>
                        <td class="btn-action">
                            <button title="Remove" class="btn btn-danger" v-if="salaryType.status == 1"
                                    v-on:click="removeSalaryType(salaryType, index)">
                                <i class="fas fa-times"></i>
                            </button>
                            <button title="Publish" class="btn btn-primary" v-on:click="publishSalaryType(salaryType, index)"
                                    v-else>
                                <i class="fa fas fa-check"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="salaryTypeCount" :pageIndex="objDataSearch.pageIndex" :pageSize="objDataSearch.pageSize" @change="pageChange"/>
        <modal v-if="popupEditSalaryType" :title="$i(this.titleModal)" @close="popupEditSalaryType = false">
            <div slot="body">
                <editSalaryType :salaryTypeId="this.objDataUpdate.id" v-on:closePopup="closePopup()"></editSalaryType>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editSalaryType from './edit';

    export default {
        components: {
            'editSalaryType': editSalaryType,
        },
        data() {
            return {
                objDataSearch: {
                    id: -1,
                    name: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 10
                },
                objDataUpdate: {
                    id: -1,
                    name: '',
                    status: 1,
                },
                titleModal: '',
                popupEditSalaryType: false,
            }
        },
        computed: {
            ...mapGetters(['listSalaryType','salaryTypeCount']),
            rowNum() {
                return (this.objDataSearch.pageIndex - 1) * this.objDataSearch.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListSalaryType', 'saveEditSalaryType']),
            searchData(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objDataSearch.pageIndex = index;
                }
                this.getListSalaryType(this.objDataSearch).then(() => {
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
            removeSalaryType(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToHide')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 0;
                    this.saveEditSalaryType(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listSalaryType[index].status = 0;
                            // this.searchData();
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            publishSalaryType(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToPublish')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 1;
                    this.saveEditSalaryType(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listSalaryType[index].status = 1;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            closePopup() {
                this.popupEditSalaryType = false;
                this.searchData();
            },
            openPopup(id) {
                if( id > 0 ){
                    this.titleModal = 'TitleEditSalaryType';
                }else{
                    this.titleModal = 'TitleAddSalaryType';
                }
                this.popupEditSalaryType = true;
                this.objDataUpdate.id = id || 0;
            },
        },
        created() {
            this.searchData();
        }
    };
</script>