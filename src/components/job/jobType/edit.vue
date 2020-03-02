<template>
    <div v-else>
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group">
                    <label>{{$i('Name')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('Name')"
                           v-model="objData.name"/>
                </div>
                <div v-for="(v, k) in objData.langs" :key="k" class="form-group">
                    <label>{{languageName(v.languageCode)}}</label>
                    <input type="text" v-model="v.name" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>{{$i('JobType')}}</label>
                    <select class="form-control" v-model="objData.parentId" v-if="listJobType">
                        <option value="0">{{ $i('Select') }}</option>
                        <option v-for="item in listJobType" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>{{$i('JapaneseCertification')}}</label>
                    <select class="form-control" v-model="objData.japaneseCertificationId" v-if="listJapaneseCertification">
                        <option value="-1">{{ $i('Select') }}</option>
                        <option v-for="item in listJapaneseCertification" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div v-if="jobTypeId" class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="objData.status">
                        <option value="1">{{ $i('Active') }}</option>
                        <option value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="this.jobTypeId > 0" class="form-group">
            <button class="btn btn-primary" v-on:click="editJobType()">
                <span>{{ $i('Save') }}</span>
            </button>
        </div>
        <div v-else class="form-group">
            <button class="btn btn-primary" v-on:click="addJobType()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        props: ['jobTypeId'],
        data() {
            return {
                objData: {
                    id: -1,
                    name: '',
                    langs: [],
                    parentId: 0,
                    japaneseCertificationId: -1,
                    status: 1,
                },
                languages: null,
                objDataJapaneseCertification: {
                    pageIndex: 1,
                    pageSize: 99999
                },
                objDataJobType: {
                    pageIndex: 1,
                    pageSize: 9999,
                    status: 1,
                },
                listJobType: [],
            }
        },
        computed:{
          ...mapGetters(['listJapaneseCertification']),
        },
        methods: {
            ...mapActions(['getDetailJobType', 'saveEditJobType', 'saveAddJobType', 'getLanguages', 'getListJapaneseCertification', 'getListJobType']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                    this.getJobType();
                }).catch(err => {
                    return this.$error(err.message);
                })
            },
            getLanguageIsNotDefault() {
                return this.languages.filter(i => !i.isDefault).map(i => {
                    return {
                        languageCode: i.code,
                        name: ""
                    }
                })
            },
            getJobType() {
                if (this.jobTypeId > 0) {
                    this.objData.id = this.jobTypeId;
                    this.getDetailJobType(this.objData).then(res => {
                        this.objData = res.data;
                        this.objData.japaneseCertificationId = res.data.japaneseCertificationId || -1;
                        this.objData.langs = this.getLanguageIsNotDefault().map(i => {
                            return res.data.langs.filter(j => {
                                if (j.languageCode == i.languageCode)
                                    return j;
                            })[0] || i;
                        })
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                } else {
                    this.objData.langs = this.getLanguageIsNotDefault();
                }
            },
            getDataJapaneseCertification() {
                this.getListJapaneseCertification(this.objDataJapaneseCertification).then(() => {

                }).catch(err => {
                    this.$error(err.message);
                })
            },
            getDataJobType() {
                this.getListJobType(this.objDataJobType).then(res => {
                    this.listJobType = res.data;
                }).catch(err => {
                    this.$error(err.message);
                })
            },
            editJobType() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                this.saveEditJobType(this.objData).then((response) => {
                    if (response.success) {
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            addJobType() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                this.saveAddJobType(this.objData).then((response) => {
                    if (response.success) {
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            languageName(code) {
                return this.languages.filter(i => i.code == code)[0].name;
            },
        },
        created() {
            this.getLangs();
            this.getDataJapaneseCertification();
            this.getDataJobType();
        }
    }
</script>