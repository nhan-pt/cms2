<template>
    <wrapper :title="$i('ProvinceList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input type="text" :placeholder="$i('Keyword')" v-model="objDataSearch.name" class="form-control"/>
                </div>
                
                <div class="col-sm-2">
                    <input class="btn btn-info" type="button" :value="$i('Search')" v-on:click="searchData(1)"/>
                </div>
            </div>
            <div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="width-100">{{$i('Index')}}</th>
                        <th>{{$i('Title')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(province, index) in listProvince" class="post-item-group">
                        <td>{{ index+1 + rowNum }}</td>
                        <td><a href="javascript:;" style="color: #0f74a8;">{{ province.name }}</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="provinceCount" :pageIndex="objDataSearch.pageIndex" :pageSize="objDataSearch.pageSize" @change="pageChange"/>
        <modal v-if="popupEditProvince" :title="$i(this.titleModal)" @close="popupEditProvince = false">
            <div slot="body">
                <editProvince :provinceId="this.objDataUpdate.id" v-on:closePopup="closePopup()"></editProvince>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editProvince from './edit';

    export default {
        components: {
            'editProvince': editProvince,
        },
        data() {
            return {
                objDataSearch: {
                    id: -1,
                    name: '',
                    status: 1,
                    areaId: -1,
                    pageIndex: 1,
                    pageSize: 10
                },
                objDataUpdate: {
                    id: -1,
                    name: '',
                    status: -1,
                    areaId: -1,
                },
                objDataArea: {
                    name: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 100
                },
                titleModal: '',
                popupEditProvince: false,
            }
        },
        computed: {
            ...mapGetters(['listProvince','provinceCount','listArea']),
            rowNum() {
                return (this.objDataSearch.pageIndex - 1) * this.objDataSearch.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListArea','getListProvince', 'saveEditProvince']),
            searchData(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objDataSearch.pageIndex = index;
                }
                this.getListProvince(this.objDataSearch).then(() => {
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
            getArea() {
                this.getListArea(this.objDataArea).then(() =>{
                }).catch((error) =>{
                    return this.$message(error.message, 'error');
                })
            },
            removeProvince(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToHide')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 0;
                    this.saveEditProvince(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listProvince[index].status = 0;
                            // this.searchData();
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            publishProvince(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToPublish')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 1;
                    this.saveEditProvince(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listProvince[index].status = 1;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            closePopup() {
                this.popupEditProvince = false;
                this.searchData();
            },
            openPopup(id) {
                if( id > 0 ){
                    this.titleModal = 'TitleEditProvince';
                }else{
                    this.titleModal = 'TitleAddProvince';
                }
                this.popupEditProvince = true;
                this.objDataUpdate.id = id || 0;
            },
        },
        created() {
            this.searchData();
            this.getArea();
        }
    };
</script>