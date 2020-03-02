<template>
<div class="col-12 translate-font-size">
    <section class="group-content-candidate__ha">
        <div class="translate_header_index">
            <div class="panelhead-candidate__ha">
                <div class="heading-1 name-title-page__ha width-133"> Translate job post : id </div>
            </div>
            <div class="panelhead-candidate__ha">
                <p class="backward" @click="back">Back</p>
            </div>
        </div>
        <div class="translate__wrapper">
            <div class="row">
                <div class="col-6">
                    <div class="translate__container">
                        <div class="translate__language">
                            <ul>
                                <li><a href="#" class="active">
                                        Japanese
                                    </a></li>
                            </ul>
                        </div>
                        <div class="translate__content">
                            <div class="row mb-2">
                                <div class="col d-flex mg-top-translate flex-column">
                                    <div class="translate__name translate-margin-botton">
                                        Title
                                    </div>
                                    <div class="translate__detail w-100">
                                        <input type="text" class="input-text__ha w-100 translate-margin-botton" v-model="objData.data.title" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2 translate-margin-botton">
                                <div class="col d-flex flex-column">
                                    <div class="translate__name translate-margin-botton">
                                        Description
                                    </div>
                                    <div class="translate__detail w-100 translate-margin-botton">
                                        <tiny-mce :disabled="true" :height="450" v-model="objData.data.description"></tiny-mce>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col d-flex flex-column">
                                    <div class="translate__name translate-margin-botton">
                                        Requirement
                                    </div>
                                    <div class="translate__detail w-100 translate-margin-botton">
                                        <tiny-mce :disabled="true" :height="450" v-model="objData.data.requirements"></tiny-mce>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col d-flex flex-column">
                                    <div class="translate__name translate-margin-botton">
                                        Address
                                    </div>
                                    <div class="translate__detail w-100 translate-margin-botton">
                                        <input type="text" class="input-text__ha w-100" v-model="objData.data.address" disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="translate__container">
                        <div class="translate__language">
                            <ul>
                                <li v-for="(item,index) in allLanguages" :key="item.id">
                                    <a href="#" value="item.priority" @click="gettab(index)" :class="{ 'active': checktab === index}">
                                        {{item.name}}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="translate__content">
                            <div class="row mb-2">
                                <div class="col d-flex mg-top-translate flex-column">
                                    <div class="translate__name translate-margin-botton">
                                        Title
                                    </div>
                                    <div class="translate__detail w-100 translate-margin-botton">
                                        <input type="text" class="input-text__ha w-100" v-model="title">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col d-flex flex-column">
                                    <div class="translate__name translate-margin-botton">
                                        Description
                                    </div>
                                    <div class="translate__detail w-100 translate-margin-botton">
                                        <tiny-mce @change="description = $event" :height="450" v-model="description"></tiny-mce>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col d-flex flex-column">
                                    <div class="translate__name translate-margin-botton">
                                        Requirement
                                    </div>
                                    <div class="translate__detail w-100 translate-margin-botton">
                                        <tiny-mce @change="requirement = $event" :height="450" v-model="requirement"></tiny-mce>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col d-flex flex-column">
                                    <div class="translate__name translate-margin-botton">
                                        Address
                                    </div>
                                    <div class="translate__detail w-100 translate-margin-botton">
                                        <input type="text" class="input-text__ha w-100" v-model="address">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-10">
                            <div class="group-btn-footer__ha">
                                <div class="list-btn__ha">
                                    <div class="item-btn">
                                        <button type="button" class="text-links btn-save" @click="next">Save</button>
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
    mapActions,
    mapGetters
} from 'vuex';

export default {
    data() {
        return {
            allLanguages: [],
            languages: '',
            objData: '',
            title: '',
            description: '',
            requirement: '',
            address: '',
            checktab: 0,
            ind: '',
            data: '',
        }
    },
    components: {

    },
    watch: {

    },
    computed: {

    },
    methods: {
        ...mapActions(['getLanguages', 'getDetailEmployerPost', 'saveTranslateJobPost']),
        back() {
            return this.$router.push('/employerpost');
        },
        gettab(index) {
            this.checktab = index;
            this.ind = (this.languages[index+1])
            this.getDetailEmployerPost({
                    id: this.$route.params.id
                })
                .then(res => {
                    this.objData = res;
                    this.data = res.data.langs
                    this.data.map(item => {
                        if (item.languageCode == this.ind.code) {
                            this.title = item.title
                            this.description = item.description
                            this.requirement = item.requirements
                            this.address = item.address
                        }
                    })
                    loading.hide();
                })
                .catch(err => {

                })
        },
        getDetail() {
            let loading = this.$loading.show();
            this.getDetailEmployerPost({
                    id: this.$route.params.id
                })
                .then(res => {
                    this.objData = res;
                    this.data = res.data.langs
                    this.data.map(item => {
                        if (item.languageCode == this.ind.code) {
                            this.title = item.title
                            this.description = item.description
                            this.requirement = item.requirements
                            this.address = item.address
                        }
                    })
                    loading.hide();
                })
                .catch(err => {

                })
        },
        next() {
            let objSearch = {
                employerPostId: this.$route.params.id,
                title: this.title,
                description: this.description,
                requirements: this.requirement,
                address: this.address,
                languageCode: this.ind.code
            }

            this.saveTranslateJobPost(objSearch)
                .then(res => {
                    if (res.success) {
                        this.$message(this.$i('Successful'));
                    }
                })
                .catch(err => {
                    this.$message(err.message, 'error');
                })
        }
    },
    created() {
        let loading = this.$loading.show()
        this.getLanguages().then(res => {
            this.languages = res;
            this.languages.map(item => {
                if (item.code != "ja") {
                    this.allLanguages.push(item)
                }
            })
            this.ind = this.languages[1]
            loading.hide();
        });
    },
    mounted() {
        this.getDetail();
    },
}
</script>

<style>
.backward,
.btn-save {
    cursor: pointer;
}
</style>
