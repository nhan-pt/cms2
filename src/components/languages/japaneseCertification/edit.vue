<template>
    <div>
        <div class="form-group">
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>{{ $i('JapaneseCertification') }}</label>
                        <input class="form-control"
                               :label="$i('JapaneseCertification')"
                               :placeholder="$i('JapaneseCertification')"
                               v-model="objData.name"/>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div v-for="(v, k) in objData.langs" :key="k" class="form-group">
                        <label>{{languageName(v.languageCode)}}</label>
                        <input type="text" v-model="v.name" class="form-control"/>
                    </div>
                </div>
                <div class="col-sm-12" v-if="this.japaneseCertificationId">
                    <div class="form-group">
                        <label>{{ $i('Status') }}</label>
                        <select class="form-control"
                                v-model="objData.status">
                            <option :value="-1">{{ $i('Status') }}</option>
                            <option :value="1">{{ $i('Active') }}</option>
                            <option :value="0">{{ $i('DeActived') }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary"
                    @click="updateJapaneseCertification">
                <span v-if="japaneseCertificationId">{{ $i('Update') }}</span>
                <span v-else>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';

    export default {
        props: ['japaneseCertificationId'],
        data() {
            return {
                objData: {
                    id: 0,
                    name: '',
                    langs: [],
                    status: 1,
                },
                languages: null,
            }
        },
        methods: {
            ...mapActions(['getDetailJapaneseCertification', 'saveEditJapaneseCertification', 'saveAddJapaneseCertification', 'getLanguages']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                    this.getJapaneseCertification();
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
            getJapaneseCertification() {
                if (this.japaneseCertificationId) {
                    this.objData.id = this.japaneseCertificationId;
                    this.getDetailJapaneseCertification(this.objData).then(res => {
                        this.objData = res.data;
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
            updateJapaneseCertification() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                let link = this.japaneseCertificationId ? 'saveEditJapaneseCertification' : 'saveAddJapaneseCertification';
                this[link](this.objData).then(() => {
                    this.$message(this.$i('Successful'));
                    this.$emit('closePopup');
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
        }
    }
</script>