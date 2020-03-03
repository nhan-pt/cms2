<template>
<div>
    <div class="row ">
        <div class="col-12">
            <div class="mb-2 text-font-20 text-center"> {{$i('cms_employer_change_passWord')}}</div>
        </div>
        <div class="col-12" :class="{'is-invalid has-danger': $v.objDataPass.newPass.$dirty && $v.objDataPass.newPass.$invalid}">
            {{$i('cms_employer_create_password')}}
            <el-input type="password" class="change_password" value="" v-model="objDataPass.newPass" @input="$v.objDataPass.newPass.$touch()"></el-input>
        </div>
        <div class="col-12" :class="{'is-invalid has-danger': $v.objDataPass.confirmPass.$dirty && $v.objDataPass.confirmPass.$invalid}">
            {{$i('cms_employer_create_confirm_password ')}}
            <el-input type="password" class="change_password" value="" v-model="objDataPass.confirmPass" @input="$v.objDataPass.confirmPass.$touch()"></el-input>
        </div>
    </div>
    <div class="row display-flex mt-5">
        <div class="col-12">
            <div class=" list-btn__ha text-center">
                <div class="item-btn">
                    <input class="btn min-width-120 text-white btn-list-view bg-27ACCE" type="button" @click="changePassWord" :value="$i('cms_execute')" />
                </div>
                <div class="item-btn">
                    <input class="btn min-width-120 text-white btn-list-view bg-cancel" type="button" @click="closeModal" :value="$i('Cancel')" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    Money
} from 'v-money';
import {
    required,
    email,
    sameAs
} from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import Vue from 'vue'

Vue.use(Vuelidate)
export default {
    data() {
        return {
            objDataPass:{},
        }

    },
    props: ['value'],
    validations: {
        objDataPass:{
            newPass: {
                required,
            },
            confirmPass: {
                sameAs: sameAs('newPass')
            }
        }
    },
    components: {
        
    },

    methods: {
        ...mapActions(['updatePass']),
        closeModal(){
             this.$emit('close');
        },
        changePassWord() {
             this.$emit('changePass')
            }
        },
        
        //validate
    created() {

    },
    mounted() {
        this.objDataPass = this.value || {}
}
}
</script>

<style scoped>
.erorr-text {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    left: 0;
    margin-left: 20px;
}

.input-text__ha::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.text_changePassword {
    cursor: pointer;
}
.min-width-120{
    min-width: 120px;
}
</style>
