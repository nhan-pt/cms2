<template>
    <wrapper :title="$i('ReasonList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input class="form-control" :placeholder="$i('Keyword')" v-model="objData.name">
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objData.status">
                        <option :value="-1"> {{ $i('Status') }}</option>
                        <option :value="1">{{ $i('Active') }}</option>
                        <option :value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <input class="btn btn-info" type="button" :value="$i('Search')" v-on:click="getList(1)"/>
                    <button class="btn btn-primary" @click="openPopup(0)">{{ $i('Add') }}</button>
                </div>
            </div>
            <div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="width-60 text-center"> {{ $i('Index') }}</th>
                        <th>{{ $i('Name') }}</th>
                        <th class="width-100">{{ $i('Order') }}</th>
                        <th class="width-100">{{ $i('Status') }}</th>
                        <th class="width-120 text-center"> {{ $i('Action') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="listReason" v-for="(v) in listReason" :key="`${v.id}`">
                        <td class="text-center">{{ v.rowNum }}</td>
                        <td>{{v.name}}</td>
                        <td><p>{{v.order}}</p></td>
                        <td class="text-center">
                            <div :class="['badge', v.status == 0 ? 'badge-danger' : 'badge-info']">
                                {{ v.status == 0 ? $i('DeActived') : $i('Active')}}
                            </div>
                        </td>
                        <td class="btn-action clearfix">
                            <div class="float-left">
                                <button @click="changeStatus(v)" class="btn btn-danger" v-if="v.status == 1">
                                    <i class="fas fa-times"></i>
                                </button>
                                <button @click="changeStatus(v)" class="btn btn-primary" v-else>
                                    <i class="fa fas fa-check"></i>
                                </button>
                            </div>
                            <div class="float-right">
                                <button title="Sửa Tag" class="btn btn-info" @click="openPopup(v.id)">
                                    <i class="fa fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="reasonCount" :pageIndex="objData.pageIndex" :pageSize="objData.pageSize" @change="pageChange"/>
        <modal v-if="popupEditReason" :title="$i(this.titleModal)"  @close="popupEditReason = false">
            <div slot="body">
                <EditReason :reasonId="this.reasonID" v-on:closePopup="closePopup()"></EditReason>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import EditReason from './edit'
    import {mapActions, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                objData: {
                    name: '',
                    pageSize: 10,
                    pageIndex: 1,
                    status: 1,
                },
                titleModal: '',
                popupEditReason: false,
                reasonID: '',
            }
        },
        components: {
            EditReason,
        },
        computed: {
            ...mapGetters(['listReason', 'reasonCount'])
        },
        methods: {
            ...mapActions(['getListReason', 'saveEditReason']),
            getList(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objData.pageIndex = index;
                }
                this.getListReason(this.objData)
                    .then(() => {
                        loading.hide();
                    })
                    .catch(err => {
                        loading.hide();
                        this.$error(err.message);
                    })
            },
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getList();
            },
            changeStatus(value) {
                this.$confirm(this.$i('DoYouWantChangeStatus')).then(() => {
                    value.status = value.status == '1' ? '0' : '1';
                    this.saveEditReason(value).then(() => {
                        this.$message(this.$i('Successful'));
                    }).catch(err => {
                        this.$error(err.message);
                    })
                });
                this.getList();
            },
            closePopup(){
                this.popupEditReason = false;
                this.getList();
            },
            openPopup(id){
                if( id > 0 ){
                    this.titleModal = 'TitleEditReason';
                }else{
                    this.titleModal = 'TitleAddReason';
                }
                this.reasonID = id;
                this.popupEditReason = true;
            },
        },
        created() {
            this.getList();
        }
    }
</script>
<style scoped>

</style>