<template>
    <div>
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
                <div v-if="memberLanguageId" class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="objData.status">
                        <option value="1">{{ $i('Active') }}</option>
                        <option value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="this.memberLanguageId > 0" class="form-group">
            <button class="btn btn-primary" v-on:click="editMemberLanguage()">
                <span>{{ $i('Save') }}</span>
            </button>
        </div>
        <div v-else class="form-group">
            <button class="btn btn-primary" v-on:click="addMemberLanguage()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';

    export default {
        props: ['memberLanguageId'],
        data() {
            return {
                objData: {
                    id: -1,
                    name: '',
                    langs: [],
                    status: -1,
                },
                languages: null,
            }
        },
        methods: {
            ...mapActions(['getDetailMemberLanguage', 'saveEditMemberLanguage', 'saveAddMemberLanguage', 'getLanguages']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                    this.getMemberLanguage();
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
            getMemberLanguage() {
                if (this.memberLanguageId > 0) {
                    this.objData.id = this.memberLanguageId;
                    this.getDetailMemberLanguage(this.objData).then(res => {
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
            editMemberLanguage() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                this.saveEditMemberLanguage(this.objData).then((response) => {
                    if(response.success){
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            addMemberLanguage(){
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                this.saveAddMemberLanguage(this.objData).then((response) => {
                    if(response.success){
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
        }
    }
</script>