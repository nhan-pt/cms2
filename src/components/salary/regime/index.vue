<template>
    <wrapper :title="$i('RegimeList')" sapo="">
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
                    <tr v-for="(regime, index) in listRegime" class="post-item-group">
                        <td>{{ index+1 + rowNum }}</td>
                        <td><a href="javascript:;" @click="openPopup(regime.id)" style="color: #0f74a8;">{{ regime.name }}</a></td>
                        <td class="btn-action">
                            <button title="Remove" class="btn btn-danger" v-if="regime.status == 1"
                                    v-on:click="removeRegime(regime, index)">
                                <i class="fas fa-times"></i>
                            </button>
                            <button title="Publish" class="btn btn-primary" v-on:click="publishRegime(regime, index)"
                                    v-else>
                                <i class="fa fas fa-check"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="regimeCount" :pageIndex="objDataSearch.pageIndex" :pageSize="objDataSearch.pageSize" @change="pageChange"/>
        <modal v-if="popupEditRegime" :title="$i(this.titleModal)" @close="popupEditRegime = false">
            <div slot="body">
                <editRegime :regimeId="this.objDataUpdate.id" v-on:closePopup="closePopup()"></editRegime>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editRegime from './edit';

    export default {
        components: {
            'editRegime': editRegime,
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
                    status: -1,
                },
                titleModal: '',
                popupEditRegime: false,
            }
        },
        computed: {
            ...mapGetters(['listRegime','regimeCount']),
            rowNum() {
                return (this.objDataSearch.pageIndex - 1) * this.objDataSearch.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListRegime', 'saveEditRegime']),
            searchData(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objDataSearch.pageIndex = index;
                }
                this.getListRegime(this.objDataSearch).then(() => {
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
            removeRegime(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToHide')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 0;
                    this.saveEditRegime(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listRegime[index].status = 0;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            publishRegime(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToPublish')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 1;
                    this.saveEditRegime(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listRegime[index].status = 1;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            closePopup() {
                this.popupEditRegime = false;
                this.searchData();
            },
            openPopup(id) {
                if( id > 0 ){
                    this.titleModal = 'TitleEditRegime';
                }else{
                    this.titleModal = 'TitleAddRegime';
                }
                this.popupEditRegime = true;
                this.objDataUpdate.id = id || 0;
            },
        },
        created() {
            this.searchData();
        }
    };
</script>