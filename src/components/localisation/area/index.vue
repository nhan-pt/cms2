<template>
    <wrapper :title="$i('AreaList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input type="text" v-model="objDataSearch.name" :placeholder="$i('Keyword')" class="form-control" />
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objDataSearch.status">
                        <option :value="-1">{{$i('SelectStatus')}}</option>
                        <option :value="1">{{$i('Active')}}</option>
                        <option :value="0">{{$i('DeActived')}}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <input class="btn btn-info" type="button" v-on:click="searchData(1)" :value="$i('Search')" />
                    <input class="btn btn-primary" type="button" @click="openPopup(0)" :value="$i('Add')"/>
                </div>
            </div>
            <div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="width-100">{{$i('Index')}}</th>
                        <th>{{$i('Area')}}</th>
                        <th class="text-center width-150">{{$i('Action')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(area, index) in listArea" class="post-item-group">
                        <td>{{ index+1 + rowNum }}</td>
                        <td><a href="javascript:;" @click="openPopup(area.id)" style="color: #0f74a8;">{{ area.name }}</a></td>
                        <td class="btn-action">
                            <button :title="$i('Remove')" class="btn btn-danger" v-if="area.status == 1"
                                    v-on:click="removeArea(area, index)">
                                <i class="fas fa-times"></i>
                            </button>
                            <button :title="$i('Publish')" class="btn btn-primary" v-on:click="publishArea(area, index)"
                                    v-else>
                                <i class="fa fas fa-check"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="areaCount" :pageIndex="objDataSearch.pageIndex" :pageSize="objDataSearch.pageSize" @change="pageChange" />
        <modal v-if="popupEditArea" :title="$i(this.titleModal)" @close="popupEditArea = false">
            <div slot="body">
                <editArea :areaId="this.objDataUpdate.id" v-on:closePopup="closePopup()"></editArea>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editArea from './edit';
    export default {
        components: {
            'editArea': editArea,
        },
        data(){
            return {
                objDataSearch: {
                    id: -1,
                    name: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 10,
                },
                objDataUpdate: {
                    id: -1,
                    name: '',
                    status: -1,
                },
                titleModal: '',
                popupEditArea: false,
            }
        },
        computed: {
            ...mapGetters(['listArea','areaCount']),
            rowNum() {
                return (this.objDataSearch.pageIndex - 1) * this.objDataSearch.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListArea', 'saveEditArea']),
            searchData(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objDataSearch.pageIndex = index;
                }
                this.getListArea(this.objDataSearch).then(() => {
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
            removeArea(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToHide')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 0;
                    this.saveEditArea(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listArea[index].status = 0;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            publishArea(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToPublish')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 1;
                    this.saveEditArea(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listArea[index].status = 1;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            closePopup(){
                this.popupEditArea = false;
                this.searchData();
            },
            openPopup(id){
                if( id > 0 ){
                    this.titleModal = 'TitleEditArea';
                }else{
                    this.titleModal = 'TitleAddArea';
                }
                this.popupEditArea = true;
                this.objDataUpdate.id = id || 0;
            },
        },
        created() {
            this.searchData();
        }
    };
</script>