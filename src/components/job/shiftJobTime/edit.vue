<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group">
                    <label>{{$i('Order')}}</label>
                    <select class="form-control" v-model="objDataShiftJobTime.shiftJobId">
                        <option value="-1">{{$i('SelectShiftJob')}}</option>
                        <option v-for="item in listShiftJob" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="objDataShiftJobTime.type">
                        <option :value="1">{{$i('ShiftJobTimeStart')}}</option>
                        <option :value="2">{{$i('ShiftJobTimeEnd')}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>{{$i('Name')}}</label>
                    <multiselect v-model="shiftJobTimeValue" :options="jobTimeValue" :multiple="true" v-if="loaded"
                                 :close-on-select="false" :clear-on-select="false"
                                 :preserve-search="true" placeholder="Select House"
                                 label="value" track-by="value" :preselect-first="true">
                        <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                        </template>
                    </multiselect>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="saveMultiShiftJobTime()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Multiselect from 'vue-multiselect';
    import 'vue-multiselect/dist/vue-multiselect.min.css';

    export default {
        props: ['shiftJobTimeId'],
        data() {
            return {
                objDataShiftJobTime: {
                    type: 1,
                    shiftJobId: -1,
                    jobTimeValues: '',
                    pageIndex: 1,
                    pageSize: 1000,
                },
                objDataShiftJob: {
                    id: -1,
                    name: '',
                    status: -1,
                    areaId: -1,
                    pageIndex: 1,
                    pageSize: 100
                },
                objDataJobTime: {
                    value: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 1000
                },
                shiftJobTimeValue: [],
                jobTimeValue: [],
                loaded: false,
            }
        },
        computed: {
            ...mapGetters(['detailShiftJobTime', 'listJobTime', 'listShiftJob', 'listShiftJobTime']),
        },
        components: {
            Multiselect
        },
        watch: {
            'objDataShiftJobTime.shiftJobId': function () {
                if(this.objDataShiftJobTime.shiftJobId == -1){
                    this.shiftJobTimeValue = [];
                }else {
                    this.getListShiftJobTime(this.objDataShiftJobTime).then((response) => {
                        if (response.success) {
                            let shiftJobTimeValue = [];
                            for (let i = 0; i < response.data.length; i++) {
                                shiftJobTimeValue[i] = {'value': response.data[i].jobTimeValue.slice(0, -3)};
                            }
                            this.shiftJobTimeValue = shiftJobTimeValue;
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                }
            },
            'objDataShiftJobTime.type': function () {
                this.getListShiftJobTime(this.objDataShiftJobTime).then((response) => {
                    if (response.success) {
                        let shiftJobTimeValue = [];
                        for (let i = 0; i < response.data.length; i++) {
                            shiftJobTimeValue[i] = {'value': response.data[i].jobTimeValue.slice(0, -3)};
                        }
                        this.shiftJobTimeValue = shiftJobTimeValue;
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            }
        },
        methods: {
            ...mapActions(['getListShiftJobTime', 'saveEditShiftJobTime', 'saveAddShiftJobTime', 'getListJobTime', 'getListShiftJob','saveAddMultiShiftJobTime', 'deleteShiftJobTimeByShiftJobAndType']),
            saveMultiShiftJobTime() {
                if(this.shiftJobTimeValue.length === 0){
                    if (this.objDataShiftJobTime.shiftJobId == -1) {
                        return this.$message(this.$i('LabelErrorEmptyShiftJob'), 'error');
                    }
                    this.deleteShiftJobTimeByShiftJobAndType(this.objDataShiftJobTime).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.$emit('closePopup');
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                }else {
                    if (this.objDataShiftJobTime.shiftJobId == -1) {
                        return this.$message(this.$i('LabelErrorEmptyShiftJob'), 'error');
                    }
                    let timeValue = '';
                    for(let i = 0; i < this.shiftJobTimeValue.length; i++){
                        if(i === this.shiftJobTimeValue.length -1){
                            timeValue = timeValue + this.shiftJobTimeValue[i].value+':00';
                        }else{
                            timeValue = timeValue + this.shiftJobTimeValue[i].value+':00,';
                        }
                    }
                    this.objDataShiftJobTime.jobTimeValues = timeValue;
                    this.saveAddMultiShiftJobTime(this.objDataShiftJobTime).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.$emit('closePopup');
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                }
            },
            getShiftJob() {
                this.getListShiftJob(this.objDataShiftJob).then(() => {
                }).catch(error => {
                    return this.$message(error.message, 'error');
                })
            },
            getJobTime() {
                this.getListJobTime(this.objDataJobTime).then((response) => {
                    let jobTimeValue = [];
                    for (let i = 0; i < response.data.length; i++) {
                        jobTimeValue[i] = {'value': response.data[i].value.slice(0, -3)};
                    }
                    this.jobTimeValue = jobTimeValue;
                    this.loaded = true;
                }).catch(error => {
                    return this.$message(error.message, 'error');
                })
            },
        },
        created() {
            this.getShiftJob();
            this.getJobTime();
        }
    }
</script>