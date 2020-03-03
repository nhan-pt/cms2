<template>
    <div >
        <div class="row ">
            <div class="col-12" :class="{'is-invalid has-danger': $v.objDataEmail.email.$dirty && $v.objDataEmail.email.$invalid}">
                <p class="text-bold">{{$i('email_table_email')}}</p>
                <el-input type="text"  v-model="objDataEmail.email"  @input="$v.objDataEmail.email.$touch()"></el-input>
            </div>
            <div class="col-12 display_flex_email" :class="{'is-invalid has-danger': $v.objDataEmail.type.$dirty && $v.objDataEmail.type.$invalid}">
                <el-radio-group  v-model="objDataEmail.type">
                  <el-radio class="col-3" v-for="(e,i) in listStatusEmail" :key="i" :label="e.id" @input="$v.objDataEmail.type.$touch()">{{e.label}}</el-radio>
                </el-radio-group>
            </div>
            <div class="col-12" :class="{'is-invalid has-danger': $v.objDataEmail.description.$dirty && $v.objDataEmail.description.$invalid}">
                <p class="text-bold">{{$i('employer_email_description')}}</p>
                <textarea type="text" class="change_password w-100" v-model="objDataEmail.description" @input="$v.objDataEmail.description.$touch()"></textarea>
                <div class="error" v-if="!$v.objDataEmail.description.maxLength">{{$i('email_description_must_have_at_most')}} {{$v.objDataEmail.description.$params.maxLength.max}} {{$i('email_description_must_have_at_most_letter')}}.</div>
            </div>
        </div>
        <div class="row display-flex mt-5">
            <div class="col-12">
                <div class=" list-btn__ha">
                    <div class="item-btn btn_cancel_left">
                        <input class="btn width-120 text-white btn-list-view bg-cancel" type="button" @click="closeModal" :value="$i('Cancel')" />
                    </div>
                    <div class="item-btn btn_add_email">
                        <input class="btn width-120 text-white btn-list-view btn__add__location" type="button" :value="$i('employer_save')"  @click="updateEmail"/>
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
import {EmailStatus} from "../../../types/enum"
import {
    required, 
    email,
    maxLength   
} from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import Vue from 'vue'

export default {
    data() {
        return {
            objDataEmail:{},
            listStatusEmail:[{
                    id: EmailStatus.TO,
                    label: 'TO',
                    status: 'TO',
                },
                {
                    id: EmailStatus.CC,
                    label: 'CC',
                    status: 'CC',
                },
                {
                    id: EmailStatus.BCC,
                    label: 'BCC',
                    status: 'BCC',
                },

            ],
        }
    },
    validations: {
        objDataEmail: {
            email:{
                required,
                email,
            },
            type:{
                required
            },
            description:{
                required,
                maxLength: maxLength(500)
            }
        },
        
    },
    props:['value','emailId'],
    methods: {
        ...mapActions([]),
        closeModal(){
             this.$emit('close');
        },
        updateEmail(){
            let invalid = this.$v.$invalid;
            if (invalid) {
                this.$v.$touch();
                return;
            }
            this.$emit('updateEmail')
        }
    },
    created() {
        this.objDataEmail = this.value || {}
    }
}
</script>
<style scope>
.display_flex_email{
    display:flex;
    margin-top:20px;
    left: -15px
}
.heigh-35{
    height:35px
}
.btn_cancel_left{
    position: absolute;
    left: 15px;
}
.btn_cancel_left input{
    height: 35px;
}
.btn_add_email  input{
    height: 35px;
}
.has-danger{
    border-color:#d9534f
}
.has-danger input{
    border-color:#d9534f
}
.has-danger textarea{
    border-color:#d9534f
}
</style>
