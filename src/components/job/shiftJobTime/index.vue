<template>
    <wrapper :title="$i('ShiftJobTimeList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <datetimepicker v-model="jobTimeValue" format="HH:ss" type="time" auto="true">
                    </datetimepicker>
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objDataSearch.shiftJobId">
                        <option :value="-1">{{$i('SelectShiftJob')}}</option>
                        <option v-for="item in listShiftJob" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objDataSearch.type">
                        <option :value="-1">{{$i('SelectShiftJobTime')}}</option>
                        <option :value="1">{{$i('ShiftJobTimeStart')}}</option>
                        <option :value="2">{{$i('ShiftJobTimeEnd')}}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <input class="btn btn-info" type="button" :value="$i('Search')"
                           v-on:click="searchDataShiftJobTime"/>
                    <input class="btn btn-primary" type="button" @click="openPopup()" :value="$i('Add')"/>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <h5>{{ $i('ShiftJobTimeStart') }}</h5>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th class="width-100">{{$i('Index')}}</th>
                            <th>{{$i('JobTimeValue')}}</th>
                            <th>{{$i('ShiftJobName')}}</th>
                            <th>{{$i('ShiftJobType')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(shiftJobTimeStart, index) in listShiftJobTimeStart" class="post-item-group"
                            v-if="shiftJobTimeStart.type == 1">
                            <th>{{ index + 1 + rowNumStart }}</th>
                            <td>{{ shiftJobTimeStart.jobTimeValue.slice(0, -3) }}</td>
                            <td>{{ shiftJobTimeStart.shiftJobName }}</td>
                            <th>{{ $i('ShiftJobTimeStart') }}</th>
                        </tr>
                        </tbody>
                    </table>
<!--                    <p v-if="searchStart">{{ $i('ShowMore') }} {{ shiftJobTimeStartCount }}</p>-->
                    <pager :total="shiftJobTimeStartCount" :pageIndex="pageIndexStart"
                           :pageSize="objDataSearch.pageSize"
                           @change="pageChangeStart"/>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <h5>{{ $i('ShiftJobTimeEnd') }}</h5>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th class="width-100">{{$i('Index')}}</th>
                            <th>{{$i('JobTimeValue')}}</th>
                            <th>{{$i('ShiftJobName')}}</th>
                            <th>{{$i('ShiftJobType')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(shiftJobTimeEnd, index) in listShiftJobTimeEnd" class="post-item-group"
                            v-if="shiftJobTimeEnd.type == 2">
                            <th>{{ index + 1 + rowNumEnd }}</th>
                            <td>{{ shiftJobTimeEnd.jobTimeValue.slice(0, -3) }}</td>
                            <td>{{ shiftJobTimeEnd.shiftJobName }}</td>
                            <th>{{ $i('ShiftJobTimeEnd') }}</th>
                        </tr>
                        </tbody>
                    </table>
<!--                    <p v-if="searchEnd">{{ $i('ShowMore') }} {{ shiftJobTimeEndCount }}</p>-->
                    <pager :total="shiftJobTimeEndCount" :pageIndex="pageIndexEnd"
                           :pageSize="objDataSearch.pageSize"
                           @change="pageChangeEnd"/>
                </div>
            </div>
        </div>
        <modal v-if="popupEditShiftJobTime" :title="$i('TitleAddShiftJobTime')" @close="popupEditShiftJobTime = false">
            <div slot="body">
                <editShiftJobTime v-on:closePopup="closePopup()"></editShiftJobTime>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editShiftJobTime from './edit';

    export default {
        components: {
            'editShiftJobTime': editShiftJobTime,
        },
        data() {
            return {
                objDataSearch: {
                    type: -1,
                    shiftJobId: -1,
                    jobTimeValue: '',
                    shiftJobName: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                objDataShiftJob: {
                    id: -1,
                    name: '',
                    status: 1,
                    areaId: -1,
                    pageIndex: 1,
                    pageSize: 100
                },
                searchStart: false,
                searchEnd: false,
                pageIndexStart: 1,
                pageIndexEnd: 1,
                jobTimeValue: '',
                popupEditShiftJobTime: false,
            }
        },
        computed: {
            ...mapGetters(['listShiftJobTimeStart', 'listShiftJobTimeEnd', 'listShiftJob', 'shiftJobTimeStartCount', 'shiftJobTimeEndCount']),
            rowNumStart() {
                return (this.pageIndexStart - 1) * this.objDataSearch.pageSize;
            },
            rowNumEnd() {
                return (this.pageIndexEnd - 1) * this.objDataSearch.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListShiftJobTimeStart', 'getListShiftJobTimeEnd', 'saveEditShiftJobTime', 'getListShiftJob']),
            searchDataStart() {
                let loading = this.$loading.show();
                let dataSearch = {...this.objDataSearch}
                dataSearch.type = 1;
                this.getListShiftJobTimeStart(dataSearch).then(() => {

                    loading.hide();
                }).catch(error => {
                    loading.hide();
                    return this.$message(error.message, 'error');
                })
            },
            pageChangeStart(pageNum) {
                this.$set(this.objDataSearch, 'pageIndex', pageNum);
                this.pageIndexStart = pageNum;
                this.searchDataStart();
            },
            searchDataEnd() {
                let loading = this.$loading.show();
                let dataSearch = {...this.objDataSearch}
                dataSearch.type = 2;
                this.getListShiftJobTimeEnd(dataSearch).then(() => {
                    loading.hide();
                }).catch(error => {
                    loading.hide();
                    return this.$message(error.message, 'error');
                })
            },
            pageChangeEnd(pageNum) {
                this.$set(this.objDataSearch, 'pageIndex', pageNum);
                this.pageIndexEnd = pageNum;
                this.searchDataEnd();
            },
            searchDataShiftJobTime() {
                if(this.jobTimeValue){
                    let date = new Date(this.jobTimeValue);
                    this.objDataSearch.jobTimeValue = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                }
                if (this.objDataSearch.type === 1) {
                    this.searchEnd = false
                    this.searchStart = true
                    this.pageIndexStart = 1
                    this.objDataSearch.pageIndex = 1
                    this.searchDataStart()
                } else if (this.objDataSearch.type === 2) {
                    this.searchEnd = true
                    this.searchStart = false
                    this.pageIndexEnd = 1
                    this.objDataSearch.pageIndex = 1
                    this.searchDataEnd()
                } else {
                    this.searchEnd = false;
                    this.searchStart = false;
                    this.objDataSearch.type = -1;
                    this.objDataSearch.pageIndex = 1
                    this.pageIndexStart = 1
                    this.pageIndexEnd = 1
                    this.searchDataStart();
                    this.searchDataEnd();
                }
            },
            getShiftJob() {
                this.getListShiftJob(this.objDataShiftJob).then(() => {
                }).catch(error => {
                    return this.$message(error.message, 'error');
                })
            },
            closePopup() {
                this.popupEditShiftJobTime = false;
                this.searchDataStart();
                this.searchDataEnd();
                this.objDataSearch.type = -1;
            },
            openPopup() {
                this.popupEditShiftJobTime = true;
            },
        },
        created() {
            this.searchDataStart();
            this.searchDataEnd();
            this.getShiftJob();
            this.objDataSearch.type = -1;
        }
    };
</script>