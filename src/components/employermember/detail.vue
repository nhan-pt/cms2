<template>
<div class="" v-if="detail">
    <section class="group-content-candidate__ha">
        <div class="d-flex align-items-center template-title title__detail">
            <div class="header-detail d-flex align-items-center">
                <i class="fas fa-bars mr-20"></i>
                <p class="m-0">{{$i('cms_employer_detail')}}</p>
            </div>
            <!-- <div class="panelhead-candidate__ha_back">
                <p class="backward" @click="back">Back</p>
            </div> -->
        </div>
        <div class="panelhead-candidate__ha_back">
            <p class="backward" @click="back">{{$i('cms_employer_back')}}</p>
        </div>
        <section class="panelhead-candidate__ha d-flex align-items-center">
            <div class="heading-1 name-title-page__ha mr-10 "> {{$i('cms_employer_create_company_logo')}} </div>
            <div class="heading-1 name-title-page__ha" v-if="detail.avatar">
                <img class="image" :src="detail.avatar" alt="company-logo">
            </div>
        </section>
        <div class="company__details mb-4">
            <div class="panelhead-candidate__ha">
                <div class="heading-1 name-title-page__ha"> {{$i('cms_employer_create_company_detail')}} </div>
            </div>
            <div class="employer__content">
                <div class="group-basicInfo-candidate border-frame border__top">
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_employer_create_company_name')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule justify-content-between">
                                        <div class="text-normal w-100">
                                             <div class="text-normal w-100">
                                            {{detail.companyName}}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_employer_create_Catch_Phrase')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule justify-content-between">
                                        <div class="text-normal w-100">
                                            {{detail.catchPhrase}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_employer_create_PR')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule justify-content-between">
                                        <div class="text-normal w-100" v-html="detail.publicRelation">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_employer_create_photo')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule justify-content-between ">
                                        <div class="d-flex w-100">
                                            <div class="overflow-auto">
                                                <div class="upload-block">
                                                    <div class="img-thumb" v-for="i in detail.images" :key="i">
                                                        <div class="upload__image">
                                                            <img :src="i">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_employer_create_Company_introduction')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15" v-html="detail.companyIntrodution">

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="company__introduction">
            <div class="panelhead-candidate__ha">
                <div class="heading-1 name-title-page__ha"> {{$i('cms_employer_create_Company_introduction')}} </div>
            </div>
            <div class="employer__content">
                <div class="group-basicInfo-candidate border-frame border__top">
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content__job-detail__
                                                            left p-15">
                                    <div class="required__block">
                                        <div class="name-title">{{$i('cms_employer_create_location')}}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-9">
                                <div class="content__job-detail__right p-y-15">
                                    <div class="row mb-2">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_zipcode')}}</div>
                                                <div class="name-value">{{detail.address ? detail.address.zipCode : ""}}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_prefecture')}}</div>
                                                <div class="name-value">{{detail.address ? detail.address.provinceName : ""}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_city')}}</div>
                                                <div class="name-value">{{detail.address ? detail.address.districtName : " "}}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_town')}}</div>
                                                <div class="name-value">{{ detail.address ? detail.address.townName : " "}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-12">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_detail_address')}}</div>
                                                <div class="name-value">
                                                    {{detail.address ? detail.address.address : " "}} 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_tel')}}</div>
                                                <div class="name-value w-100">
                                                    {{detail.mobile}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_fax')}}</div>
                                                <div class="name-value w-100">
                                                    {{detail.fax}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_employer_create_Established')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col-6">
                                                <div class="texts w-100">
                                                    {{detail ? detail.established : " "}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_employer_list_capital')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col-6">
                                                <div class="texts w-100">
                                                    {{detail.capital}} {{$i('cms_employer_yen')}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_employer_create_Revenue')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col-6">
                                                <div class="texts w-100">
                                                    {{detail.revenue}} {{$i('cms_employer_yen')}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_employer_create_public_or_private')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col-6">
                                                <div class="texts w-100">
                                                    {{detail.section==0? $i('cms_employer_list_private'):detail.section==1?$i('cms_employer_list_public'): ""}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_employer_list_Status')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col-6">
                                                <div class="texts w-100">
                                                    {{detail.status == 1 ? $i('cms_employer_list_active'): detail.status == 2 ? $i('cms_employer_list_unconfirm') : " "}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_employer_create_Representative')}}</div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col-6">
                                                <div class="texts w-100">
                                                    {{detail.representative}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_employer_create_employees_number')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col-6">
                                                <div class="texts w-100">
                                                    {{detail.totalEmployee}} {{$i('cms_employer_people')}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title"> {{$i('cms_employer_create_service_area')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col-6">
                                                <div class="texts w-100" v-html="detail.serviceArea">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content__job-detail__
                                                                left p-15">
                                    <div class="required__block">
                                        <div class="name-title">{{$i('cms_employer_create_business_description ')}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content__job-detail__right p-y-15" v-html="detail.businessDescription">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_employer_create_email_address')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col">
                                                <div class="texts w-100">
                                                    {{detail.email}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="name-title">{{$i('cms_employer_company_website')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col">
                                                <div class="texts w-100">
                                                    {{detail.companyWebsite}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            detail: null,
        }
    },

    methods: {
        ...mapActions(['getDetailEmployerMember', 'updateEmployer', 'getListProvince', 'getListDistrict']),
        back() {
            return this.$router.push('/employermember');
        },
        getDetail() {
            let loading = this.$loading.show();
            this.getDetailEmployerMember({
                    id: this.employerMemberId
                })
                .then(res => {
                    this.detail = res.data;
                    loading.hide();
                })
                .catch(err => {
                    loading.hide();
                    this.$error(err.messages);
                })
        },

    },
    created() {
        this.employerMemberId = this.$route.params.id;
        this.getDetail();
    }
}
</script>

<style scoped>

</style>
