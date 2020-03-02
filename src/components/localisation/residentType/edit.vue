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
                <div v-if="residentTypeId" class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="objData.status">
<!--                        <option value="-1">{{$i('SelectStatus')}}</option>-->
                        <option value="1">{{ $i('Active') }}</option>
                        <option value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="this.residentTypeId > 0" class="form-group">
            <button class="btn btn-primary" v-on:click="editResidentType()">
                <span>{{ $i('Save') }}</span>
            </button>
        </div>
        <div v-else class="form-group">
            <button class="btn btn-primary" v-on:click="addResidentType()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';

    export default {
        props: ['residentTypeId'],
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
            ...mapActions(['getDetailResidentType', 'saveEditResidentType', 'saveAddResidentType', 'getLanguages']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                    this.getResidentType();
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
            getResidentType() {
                if (this.residentTypeId > 0) {
                    this.objData.id = this.residentTypeId;
                    this.getDetailResidentType(this.objData).then(res => {
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
            editResidentType() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                this.saveEditResidentType(this.objData).then((response) => {
                    if(response.success){
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            addResidentType(){
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                this.saveAddResidentType(this.objData).then((response) => {
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