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
                        <option value="-1">{{ $i('Select') }}</option>
                        <option v-for="item in listProvince" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>{{$i('District')}}</label>
                    <select class="form-control" v-model="objData.districtId">
                        <option value="-1">{{ $i('Select') }}</option>
                        <option v-for="item in listDistrict" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div v-if="stationId" class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="objData.status">
<!--                        <option value="-1">{{$i('SelectStatus')}}</option>-->
                        <option value="1">{{ $i('Active') }}</option>
                        <option value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="this.stationId" class="form-group">
            <button class="btn btn-primary" v-on:click="editStation()">
                <span>{{ $i('Save') }}</span>
            </button>
        </div>
        <div v-else class="form-group">
            <button class="btn btn-primary" v-on:click="addStation()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        props: ['stationId'],
        data() {
            return {
                objData: {
                    id: 0,
                    name: '',
                    status: -1,
                    langs: [{
                        "languageCode": "en",
                        "name": ""
                    }],
                    provinceId: -1,
                    districtId: -1,
                },
                objDataProvince: {
                    name: '',
                    status: -1,
                    areaId: -1,
                    pageIndex: 1,
                    pageSize: 100
                },
                objDataDistrict: {
                    name: '',
                    status: -1,
                    provinceId: -1,
                    pageIndex: 1,
                    pageSize: 100
                },
                languages: null,
            }
        },
        computed: {
            ...mapGetters(['detailStation', 'listProvince', 'listDistrict']),
        },
        watch: {
            'detailStation.provinceId'(value) {
                if(value != -1) {
                    this.objDataDistrict.provinceId = value;
                    this.getListDistrict(this.objDataDistrict).then(() => {
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    })
                }
            }
        },
        methods: {
            ...mapActions(['getListProvince', 'getListDistrict', 'getDetailStation', 'saveEditStation', 'saveAddStation', 'getLanguages']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                }).catch(err => {
                    return this.$error(err.message);
                })
            },
            getStation() {
                if (this.stationId) {
                    this.objData.id = this.stationId;
                    this.getDetailStation(this.objData).then(res => {
                        this.objData.id = res.data.id;
                        this.objData.name = res.data.name;
                        this.objData.status = res.data.status;
                        this.objData.provinceId = res.data.provinceId;
                        this.objData.districtId = res.data.districtId;
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
            editStation() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                if (this.objData.provinceId == -1) {
                    return this.$message(this.$i('LabelErrorEmptyProvince'), 'error');
                }
                this.saveEditStation(this.objData).then((response) => {
                    if (response.success) {
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            addStation() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                if (this.objData.provinceId == -1) {
                    return this.$message(this.$i('LabelErrorEmptyProvince'), 'error');
                }
                if (this.objData.status == -1) {
                    return this.$message(this.$i('LabelErrorEmptyStatus'), 'error');
                }
                this.saveAddStation(this.objData).then((response) => {
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
            this.getStation();
            this.getProvince();
            this.getLangs();
        }
    }
</script>