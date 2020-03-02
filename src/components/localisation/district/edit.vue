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
                    <label v-if="languages">{{languageName(v.languageCode)}}</label>
                    <input type="text" v-model="v.name" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>{{$i('Province')}}</label>
                    <select class="form-control" v-model="objData.provinceId">
                        <option value="-1">{{ $i('SelectStatus') }}</option>
                        <option v-for="item in listProvince" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div v-if="districtId" class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="objData.status">
<!--                        <option value="-1">{{$i('SelectStatus')}}</option>-->
                        <option value="1">{{ $i('Active') }}</option>
                        <option value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="this.districtId" class="form-group">
            <button class="btn btn-primary" v-on:click="editDistrict()">
                <span>{{ $i('Save') }}</span>
            </button>
        </div>
        <div v-else class="form-group">
            <button class="btn btn-primary" v-on:click="addDistrict()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        props: ['districtId'],
        data() {
            return {
                objData: {
                    id: -1,
                    name: '',
                    langs: [{
                        "languageCode": "en",
                        "name": ""
                    }],
                    provinceId: -1,
                    status: 1,
                },
                objDataProvince: {
                    name: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 100
                },
                languages: null,
            }
        },
        computed: {
            ...mapGetters(['listProvince']),
        },
        watch: {},
        methods: {
            ...mapActions(['getListProvince', 'getDetailDistrict', 'saveEditDistrict', 'saveAddDistrict', 'getLanguages']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                }).catch(err => {
                    return this.$error(err.message);
                })
            },
            getDistrict() {
                if (this.districtId) {
                    this.objData.id = this.districtId;
                    this.getDetailDistrict(this.objData).then(res => {
                        this.objData.id = res.data.id;
                        this.objData.name = res.data.name;
                        this.objData.status = res.data.status;
                        this.objData.provinceId = res.data.provinceId;
                        let lang =  res.data.langs.filter(i => i.languageCode == 'en');
                        if (lang.length) {
                            this.objData.langs = lang
                        } else {
                            this.objData.langs = [{
                                "languageCode": "en",
                                "name": ""
                            }]
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                }
            },
            getProvince() {
                this.getListProvince(this.objDataProvince).then(() => {
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                })
            },
            editDistrict() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                if (this.objData.provinceId == -1) {
                    return this.$message(this.$i('LabelErrorEmptyProvince'), 'error');
                }
                this.saveEditDistrict(this.objData).then((response) => {
                    if (response.success) {
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            addDistrict() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                if (this.objData.provinceId === -1) {
                    return this.$message(this.$i('LabelErrorEmptyProvince'), 'error');
                }
                this.saveAddDistrict(this.objData).then((response) => {
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
            this.getProvince();
            this.getDistrict();
            this.getLangs();
        }
    }
</script>