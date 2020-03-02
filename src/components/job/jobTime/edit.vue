<template>
    <div v-if="this.jobTimeValue !== ''">
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group">
                    <label>{{$i('ValueJobTime')}}</label>
                    <datetimepicker v-model="detailJobTime.value" format="HH:ss" type="time" auto="true"
                                    v-if="loaded">
                    </datetimepicker>
                </div>
                <div class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="detailJobTime.status">
<!--                        <option value="-1">{{$i('SelectStatus')}}</option>-->
                        <option value="1">{{ $i('Active') }}</option>
                        <option value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="editJobTime()">
                <span>{{ $i('Save') }}</span>
            </button>
        </div>
    </div>
    <div v-else>
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group">
                    <label>{{$i('ValueJobTime')}}</label>
                    <datetimepicker v-model="objData.value" format="HH:ss" type="time" auto="true">
                    </datetimepicker>
                </div>
<!--                <div class="form-group">-->
<!--                    <label>{{ $i('Status')}}</label>-->
<!--                    <select class="form-control" v-model="objData.status">-->
<!--                        <option value="-1">{{$i('SelectStatus')}}</option>-->
<!--                        <option value="1">{{ $i('Active') }}</option>-->
<!--                        <option value="0">{{ $i('DeActived') }}</option>-->
<!--                    </select>-->
<!--                </div>-->
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="addJobTime()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        props: ['jobTimeValue'],
        data() {
            return {
                objData: {
                    value: '',
                    status: -1,
                },
                loaded: false,
            }
        },
        computed: {
            ...mapGetters(['detailJobTime']),
        },
        watch: {},
        methods: {
            ...mapActions(['getDetailJobTime', 'saveEditJobTime', 'saveAddJobTime']),
            highlighted() {
                return new Date();
            },
            getJobTime() {
                if (this.jobTimeValue) {
                    this.objData.value = this.jobTimeValue;
                    this.getDetailJobTime(this.objData).then(() => {
                        this.loaded = true;
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                }
            },
            editJobTime() {
                if (!this.detailJobTime.value) {
                    return this.$message(this.$i('LabelErrorEmptyJobTime'), 'error');
                }
                let date = new Date(this.detailJobTime.value);
                this.objData.value = this.jobTimeValue;
                this.objData.updateValue = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                this.objData.status = this.detailJobTime.status;
                this.saveEditJobTime(this.objData).then((response) => {
                    if (response.success) {
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            addJobTime() {
                if (!this.objData.value) {
                    return this.$message(this.$i('LabelErrorEmptyJobTime'), 'error');
                }
                let date = new Date(this.objData.value);
                this.objData.value = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                this.saveAddJobTime(this.objData).then((response) => {
                    if (response.success) {
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            }
        },
        created() {
            this.getJobTime();
        }
    }
</script>