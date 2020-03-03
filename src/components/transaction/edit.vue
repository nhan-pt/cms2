<template>
    <div>
        <div class="container">
            <div class="row mt-3">
                <div class="col-4 text-bold">
                    {{$i('cms_create_date')}}:
                </div>
                <div class="col-8">
                    {{formatDate(detailTransaction.createdDate)}}
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-4 text-bold">
                    {{$i('cms_code_transaction')}}:
                </div>
                <div class="col-8">
                    {{detailTransaction.id}}
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-4 text-bold">
                    {{$i('cms_status_transaction')}}:
                </div>
                <div class="col-8"  :class="{'text-green':detailTransaction.completeStatus == checkStatus.COMPLETE, 'text-orange':detailTransaction.completeStatus == checkStatus.PENDDING, 'text-danger':detailTransaction.completeStatus == checkStatus.FAILED}" >
                    {{getNameStatus(detailTransaction.completeStatus)}}
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-4 text-bold">
                    {{$i('cms_relate_type_transaction')}}:
                </div>
                <div class="col-8">
                    {{detailTransaction.relatedTo}}
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-4 text-bold">
                    {{$i('cms_relate_id_transaction')}}:
                </div>
                <div class="col-8">
                    <a href="javascript:;" @click="redirectApplication(detailTransaction.relatedId)" class="border-bottom border-dark">{{detailTransaction.relatedId}} </a>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-4 text-bold">
                    {{$i('cms_content_transaction')}}:
                </div>
                <div class="col-8" :class="{'is-invalid has-danger': $v.listChange.description.$dirty && $v.listChange.description.$invalid}">
                    <el-input
                        type="textarea"
                        v-model="listChange.description"
                        @input="$v.listChange.description.$touch()"
                        :rows="2"
                        :placeholder="$i('cms_content_transaction')">
                    </el-input>  
                </div>
            </div>
            <div class="text-right"><small v-if="lengthDes >= 500" class="text-not-verified">{{lengthDes}}/500</small></div>
            <hr>
            <div class="row mt-3">
                <div class="col-md-6 col-12">
                    <el-select v-model="listChange.completeStatus" :placeholder="$i('cms_employer_list_Station')">
                        <el-option v-for="item in listCompleteStatus" :key="item.id" :label="$i(item.name)" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-6 col-12" :class="{'is-invalid has-danger': $v.listChange.completedDate.$dirty && $v.listChange.completedDate.$invalid}">
                    <el-date-picker
                        v-model="listChange.completedDate"
                        type="date"
                        class="width-date"
                        format="yyyy/MM/dd"
                        @input="$v.listChange.completedDate.$touch()"
                        :placeholder="$i('cms_completeddate_transaction')">
                    </el-date-picker>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <button class="btn bg-orange btn-search " type="button" @click="edit">
                        {{$i('cms_save_transaction')}}
                    </button>
                </div>
            </div>
        </div>  
    </div>  
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import {
    required,
    maxLength
} from 'vuelidate/lib/validators'

import {TransactionCompleteStatus, TransactionType} from '../../types/enum'
export default {
    validations: {
        listChange: {
            completedDate: {required}, 
            description: {maxLength: maxLength(500)}
        }
    },
    components: {
    },
    name: 'edit-branch',
    props: ['transactionId'],
    data() {
        return {
            checkStatus: TransactionCompleteStatus,
            detailTransaction: {},
            listChange: {
                completeStatus: null,
                description: null,
                completedDate: null,
            },
        }

    },
    watch: {
        'transactionId'(value) {
            this.getDetail(value)
        }
    },
    computed: {
        ...mapGetters(['listCompleteStatus', 'listType']),
        lengthDes() {
            return this.listChange.description ? this.listChange.description.length : 0;
        }
    },
    methods: {
        ...mapActions(['getTransaction', 'editTransaction']),

        redirectApplication(applicationId) {
            return this.$router.push({path:'/application/detail', query: {id: applicationId} })
        },
        closePopUp() {
            this.$emit('closePopUp')
        },
        // emit child
        edit() {
            let invalid = this.$v.$invalid;
            if (invalid) {
                this.$v.$touch();
                this.validate = true
                return;
            }
            else{
                this.listChange.id = this.detailTransaction.id
                this.editTransaction(this.listChange)
                .then(res => {
                    if (res.success) {
                        this.$message(this.$i('Successful'));
                        setTimeout(() => {
                            this.$emit('close')
                        }, 200)
                    }   
                })
                .catch(err => {
                    this.$error(err.message);
                })  
            }
             
        },
        getNameStatus(id) {
            if(!id) return ''
            return this.$i(this.listCompleteStatus.find(e => e.id == id).name)
        },
        getDetail(id) {
            this.getTransaction(id)
                .then(res => {
                    if (res.success) {
                        this.detailTransaction = res.data
                        this.listChange.completeStatus = res.data.completeStatus
                        this.listChange.description = res.data.description
                        this.listChange.completedDate = res.data.completedDate
                    }
                })
                .catch(err => {
                    this.$error(err.messages);
                })
        },
    },
    mounted() {
        this.getDetail(this.transactionId)
    },

}
</script>

<style scoped>
    .v-modal {
        z-index: 1;
    }
</style>
