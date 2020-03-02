<template>
<div class="">
    <section class="group-content-candidate__ha">
        <div class="d-flex align-items-center template-title ">
            <i class="fas fa-bars mr-20"></i>
            <p class="m-0">{{$i('cms_employer_create_confirm ')}}</p>
        </div>
        <div class="group-btn-header__ha">
            <div class="list-btn__ha">
                <div class="item-btn" v-if="!this.$route.params.id">
                    <a href="#" class="text-links btn__register" @click="register"> {{$i('cms_employer_create_register')}} </a>
                </div>
                <div class="item-btn" v-if="this.$route.params.id">
                    <a href="#" class="text-links btn__register" @click="register"> {{$i('cms_employer_edit_save')}} </a>
                </div>
                <div class="item-btn">
                    <a href="#" class="text-links btn__edit" @click="edit"> {{$i('cms_emloyer_button_edit')}} </a>
                </div>

            </div>
        </div>
        <section class="panelhead-candidate__ha d-flex align-items-center">
            <div class="heading-1 name-title-page__ha mr-10 "> {{$i('cms_employer_create_company_logo')}}</div>
            <div class="heading-1 name-title-page__ha" v-if="objectData.avatar">
                <img class="image" :src="objectData.avatar" alt="company-logo">
            </div>
        </section>
        <section class="group-tab-candidate__ha" id="tab-candidate__ha">
            <div class="group-panelhead-create-candidate mb-5">
                <div class="list-item-create-candidate">
                    <div class="item-create-candidate active">
                        <div class="text">{{$i('cms_employer_create_company_detail')}}</div>
                    </div>
                    <div class="item-create-candidate">
                        <div class="text">Locations</div>
                    </div>

                </div>
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
                                    <div class="required__block">
                                        <div class="name-title">{{$i('cms_employer_create_company_name')}}</div>
                                        <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule justify-content-between">
                                        <div class="text-normal w-100">
                                            {{objectData.companyName}}
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
                                            {{objectData.catchPhrase}}
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
                                        <div class="text-normal w-100" v-html="objectData.publicRelation">
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
                                                    <div class="img-thumb" v-for="i in objectData.images" :key="i">
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
                                <div class="content-candidate-right p-y-15" v-html="objectData.companyIntrodution">

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
                                        <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-9">
                                <div class="content__job-detail__right p-y-15">
                                    <div class="row mb-2">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_zipcode')}}</div>
                                                <div class="name-value">{{objectData.address.zipCode}}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_prefecture')}}</div>
                                                <div class="name-value" v-for="pv in province" v-if="objectData.address.provinceId == pv.id">{{pv.name}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_city')}}</div>
                                                <div class="name-value" v-for="district in listDistrict" v-if="objectData.address.districtId == district.id">{{district.name}}</div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_town')}}</div>
                                                <div class="name-value">{{objectData.address.townName}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-12">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_detail_address')}}</div>
                                                <div class="name-value">{{objectData.address.address}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_tel')}}</div>
                                                <div class="name-value w-100">
                                                    {{objectData.mobile}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="group-rule-text">
                                                <div class="name-title">{{$i('cms_employer_create_fax')}}</div>
                                                <div class="name-value w-100">
                                                    {{objectData.fax}}
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
                                                    {{objectData.established}}
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
                                                    {{(objectData.capital)}} {{$i('cms_employer_yen')}}
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
                                                    {{(objectData.revenue)}} {{$i('cms_employer_yen')}}
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
                                    <div class="name-title">{{$i('cms_employer_create_public_or_private')}} </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col-6">
                                                <div class="texts w-100">
                                                    {{objectData.section == 1 ? $i('cms_employer_list_public'): objectData.section == "0" ? $i('cms_employer_list_private') : " "}}
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
                                                    {{objectData.status == 1 ? $i('cms_employer_list_active') : objectData.status == 2 ? $i('cms_employer_list_unconfirm') : " "}}
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
                                                    {{objectData.representative}}
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
                                                    {{objectData.totalEmployee}} {{$i('cms_employer_people')}}
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
                                                <div class="texts w-100" v-html="objectData.serviceArea">
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
                                        <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content__job-detail__right p-y-15" v-html="objectData.businessDescription">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="group-row">
                        <div class="row">
                            <div class="col-3 border-right__ha">
                                <div class="content-candidate-left p-15">
                                    <div class="required__block">
                                        <div class="name-title">{{$i('cms_employer_create_email_address')}}</div>
                                        <div class="required__mark">{{$i('cms_employer_create_required')}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="content-candidate-right p-y-15">
                                    <div class="box-row rule">
                                        <div class="row w-100">
                                            <div class="col">
                                                <div class="texts w-100">
                                                    {{objectData.email}}
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
                                                    {{objectData.companyWebsite}}
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
        <div class="group-btn-footer__ha">
            <div class="list-btn__ha">
                <div class="item-btn" v-if="!this.$route.params.id">
                    <a href="#" class="text-links btn__register" @click="register"> {{$i('cms_employer_create_register')}} </a>
                </div>
                <div class="item-btn" v-if="this.$route.params.id">
                    <a href="#" class="text-links btn__register" @click="register"> {{$i('cms_employer_edit_save')}} </a>
                </div>
                <div class="item-btn">
                    <a href="#" class="text-links btn__edit" @click="edit"> {{$i('cms_emloyer_button_edit')}} </a>
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
            listDistrict: [],
            objDataLocation: {
                zipCode: -1,
                provinceId: -1,
                pageIndex: 1,
                pageSize: 999,
                status: 1,
            },
        }
    },
    props: {
        onTabClick: {
            type: Function
        },
        objectData: {
            type: Object
        },

    },
    computed: {
        ...mapGetters(['province']),
    },
    mounted() {
        this.getDataDistrict()
    },
    methods: {
        ...mapActions(['getDetailEmployerMember', 'updateEmployer', 'getListProvince', 'getListDistrict', 'createEmployer', 'searchListDistrict', 'editEmployer']),
        edit() {
            this.onTabClick(1)

        },
        getDataDistrict() {
            let dataSearch = Object.assign({}, this.objDataLocation);
            dataSearch.provinceId = this.objectData.provinceId;
            this.searchListDistrict(dataSearch)
                .then((respon) => {
                    this.listDistrict = respon.data
                })
                .catch(err => {
                    this.$error(err.message);
                })
        },
        register() {

            let link = this.$route.params.id ? 'editEmployer' : 'createEmployer';
            this[link](this.objectData).then((response) => {
                if (response.success) {
                    this.$message(this.$i('Successful'));
                }
                return this.$router.push('/employermember');
            }).catch((error) => {
                let err = error.message.split(' ,').map(i => i.trim().split(' ').join('_'));
                return this.$message(this.$i(error.message), 'error');
            });
        }
    },

}
</script>

<style scoped>

</style>
