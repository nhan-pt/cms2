<template>
    <wrapper :title="$i('StationList')" sapo="">
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
                        <th>{{$i('Area')}}</th>
                        <th class="text-center width-150">{{$i('Action')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(station, index) in listStation" class="post-item-group">
                        <td>{{ index+1 + rowNum }}</td>
                        <td><a href="javascript:;" @click="openPopup(station.id)" style="color: #0f74a8;">{{
                            station.name }}</a></td>
                        <td>{{ station.provinceName }}</td>
                        <td class="btn-action">
                            <button title="Remove" class="btn btn-danger" v-if="station.status == 1"
                                    v-on:click="removeStation(station, index)">
                                <i class="fas fa-times"></i>
                            </button>
                            <button title="Publish" class="btn btn-primary" v-on:click="publishStation(station, index)"
                                    v-else>
                                <i class="fa fas fa-check"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="stationCount" :pageIndex="objDataSearch.pageIndex" :pageSize="objDataSearch.pageSize"
               @change="pageChange"/>
        <modal v-if="popupEditStation" :title="$i(this.titleModal)" @close="popupEditStation = false">
            <div slot="body">
                <editStation :stationId="this.objDataUpdate.id" v-on:closePopup="closePopup()"></editStation>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editStation from './edit';

    export default {
        components: {
            'editStation': editStation,
        },
        data() {
            return {
                objDataSearch: {
                    id: -1,
                    name: '',
                    status: 1,
                    provinceId: -1,
                    districtId: -1,
                    pageIndex: 1,
                    pageSize: 10
                },
                objDataUpdate: {
                    id: -1,
                    name: '',
                    status: -1,
                    provinceId: -1,
                    districtId: -1,
                },
                objDataProvince: {
                    name: '',
                    status: 1,
                    areaId: -1,
                    pageIndex: 1,
                    pageSize: 100
                },
                titleModal: '',
                popupEditStation: false,
            }
        },
        computed: {
            ...mapGetters(['listStation', 'stationCount', 'listProvince']),
            rowNum() {
                return (this.objDataSearch.pageIndex - 1) * this.objDataSearch.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListProvince', 'getListStation', 'saveEditStation']),
            searchData(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objDataSearch.pageIndex = index;
                }
                this.getListStation(this.objDataSearch).then(() => {
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
            removeStation(objUpdate, index) {
                this.$confirm(this.$i('DoYouWantToHide')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 0;
                    this.saveEditStation(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listStation[index].status = 0;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            publishStation(objUpdate, index) {
                this.$confirm(this.$i('DoYouWantToPublish')).then(() => {
                    this.objDataUpdate = objUpdate;
                    this.objDataUpdate.status = 1;
                    this.saveEditStation(this.objDataUpdate).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.listStation[index].status = 1;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                });
            },
            getProvince() {
                this.getListProvince(this.objDataProvince).then(() => {
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                })
            },
            closePopup() {
                this.popupEditStation = false;
                this.searchData();
            },
            openPopup(id) {
                if( id > 0 ){
                    this.titleModal = 'TitleEditStation';
                }else{
                    this.titleModal = 'TitleAddStation';
                }
                this.popupEditStation = true;
                this.objDataUpdate.id = id || 0;
            },
        },
        created() {
            this.searchData();
            this.getProvince();
        }
    };
</script>