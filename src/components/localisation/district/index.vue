<template>
    <wrapper :title="$i('DistrictList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input type="text" :placeholder="$i('Keyword')" v-model="objDataSearch.name" class="form-control"/>
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objDataSearch.provinceId">
                        <option value="-1">{{ $i('Select') }}</option>
                        <option v-for="item in listProvince" :value="item.id">{{ item.name }}</option>
                    </select>
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
                        <th>{{$i('Province')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(district, index) in listDistrict" class="post-item-group">
                        <td>{{ rowNum + index + 1 }}</td>
                        <td><a href="javascript:;" style="color: #0f74a8;">{{ district.name }}</a></td>
                        <td>{{ district.provinceName }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="districtCount" :pageIndex="objDataSearch.pageIndex" :pageSize="objDataSearch.pageSize" @change="pageChange"/>
        <modal v-if="popupEditDistrict" :title="$i(this.titleModal)" @close="popupEditDistrict = false">
            <div slot="body">
                <editDistrict :districtId="this.objDataUpdate.id" v-on:closePopup="closePopup()"></editDistrict>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editDistrict from './edit';

    export default {
        components: {
            'editDistrict': editDistrict,
        },
        data() {
            return {
                objDataSearch: {
                    id: -1,
                    name: '',
                    status: 1,
                    provinceId: -1,
                    pageIndex: 1,
                    pageSize: 10
                },
                objDataUpdate: {
                    id: -1,
                    name: '',
                    status: -1,
                    provinceId: -1,
                },
                objDataProvince: {
                    name: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 100
                },
                titleModal: '',
                popupEditDistrict: false,
            }
        },
        computed: {
            ...mapGetters(['listDistrict','districtCount', 'listProvince']),
            rowNum() {
                return (this.objDataSearch.pageIndex - 1) * this.objDataSearch.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListDistrict', 'saveEditDistrict', 'getListProvince',]),
            searchData(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objDataSearch.pageIndex = index;
                }
                this.getListDistrict(this.objDataSearch).then(() => {
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
            removeDistrict(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToHide')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 0;
                    this.saveEditDistrict(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listDistrict[index].status = 0;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            publishDistrict(objUpdate, index){
                this.$confirm(this.$i('DoYouWantToPublish')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 1;
                    this.saveEditDistrict(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listDistrict[index].status = 1;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            closePopup() {
                this.popupEditDistrict = false;
                this.searchData();
            },
            openPopup(id) {
                if( id > 0 ){
                    this.titleModal = 'TitleEditDistrict';
                }else{
                    this.titleModal = 'TitleAddDistrict';
                }
                this.popupEditDistrict = true;
                this.objDataUpdate.id = id || 0;
            },
            getProvince() {
                this.getListProvince(this.objDataProvince).then(() => {
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                })
            },
        },
        created() {
            this.searchData();
            this.getProvince();
        }
    };
</script>