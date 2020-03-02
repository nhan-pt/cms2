<template>
    <wrapper :title="$i('JapaneseLevelList')" sapo="">
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
                        <th>{{$i('JapaneseLevelOrder')}}</th>
                        <th class="text-center width-150">{{$i('Action')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(japaneseLevel, index) in listJapaneseLevel" class="post-item-group">
                        <td>{{ index+1 + rowNum }}</td>
                        <td><a href="javascript:;" @click="openPopup(japaneseLevel.id)" style="color: #0f74a8;">{{ japaneseLevel.name }}</a></td>
                        <td>{{ japaneseLevel.order }}</td>
                        <td class="btn-action">
                            <button title="Remove" class="btn btn-danger" v-if="japaneseLevel.status == 1"
                                    v-on:click="removeJapaneseLevel(japaneseLevel, index)">
                                <i class="fas fa-times"></i>
                            </button>
                            <button title="Publish" class="btn btn-primary" v-on:click="publishJapaneseLevel(japaneseLevel, index)"
                                    v-else>
                                <i class="fa fas fa-check"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="japaneseLevelCount" :pageIndex="objDataSearch.pageIndex" :pageSize="objDataSearch.pageSize" @change="pageChange"/>
        <modal v-if="popupEditJapaneseLevel" :title="$i(this.titleModal)" @close="popupEditJapaneseLevel = false">
            <div slot="body">
                <editJapaneseLevel :japaneseLevelId="this.objDataUpdate.id" v-on:closePopup="closePopup()"></editJapaneseLevel>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editJapaneseLevel from './edit';

    export default {
        components: {
            'editJapaneseLevel': editJapaneseLevel,
        },
        data() {
            return {
                objDataSearch: {
                    id: -1,
                    name: '',
                    status: 1,
                    order: 1,
                    pageIndex: 1,
                    pageSize: 10
                },
                objDataUpdate: {
                    id: -1,
                    name: '',
                    status: -1,
                    order: 1,
                },
                titleModal: '',
                popupEditJapaneseLevel: false,
            }
        },
        computed: {
            ...mapGetters(['listJapaneseLevel','japaneseLevelCount']),
            rowNum() {
                return (this.objDataSearch.pageIndex - 1) * this.objDataSearch.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListJapaneseLevel', 'saveEditJapaneseLevel']),
            searchData(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objDataSearch.pageIndex = index;
                }
                this.getListJapaneseLevel(this.objDataSearch).then(() => {
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
            removeJapaneseLevel(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToHide')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 0;
                    this.saveEditJapaneseLevel(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listJapaneseLevel[index].status = 0;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            publishJapaneseLevel(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToPublish')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 1;
                    this.saveEditJapaneseLevel(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listJapaneseLevel[index].status = 1;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            closePopup() {
                this.popupEditJapaneseLevel = false;
                this.searchData();
            },
            openPopup(id) {
                if( id > 0 ){
                    this.titleModal = 'TitleEditJapaneseLevel';
                }else{
                    this.titleModal = 'TitleAddJapaneseLevel';
                }
                this.popupEditJapaneseLevel = true;
                this.objDataUpdate.id = id || 0;
            },
        },
        created() {
            this.searchData();
        }
    };
</script>