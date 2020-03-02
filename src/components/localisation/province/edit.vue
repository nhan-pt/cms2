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
                    <label>{{$i('Area')}}</label>
                    <select class="form-control" v-model="objData.areaId">
                        <option value="-1">{{ $i('Select') }}</option>
                        <option v-for="item in listArea" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div v-if="provinceId" class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="objData.status">
<!--                        <option value="-1">{{$i('SelectStatus')}}</option>-->
                        <option value="1">{{ $i('Active') }}</option>
                        <option value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="this.provinceId" class="form-group">
            <button class="btn btn-primary" v-on:click="editProvince()">
                <span>{{ $i('Save')}}</span>
            </button>
        </div>
        <div v-else class="form-group">
            <button class="btn btn-primary" v-on:click="addProvince()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        props: ['provinceId'],
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
                    areaId: -1,
                },
                objDataArea: {
                    name: '',
                    status: -1,
                    pageIndex: 1,
                    pageSize: 100
                },
                languages: null,
            }
        },
        computed: {
            ...mapGetters(['listArea']),
        },
        methods: {
            ...mapActions(['getListArea', 'getDetailProvince', 'saveEditProvince', 'saveAddProvince', 'getLanguages']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                }).catch(err => {
                    return this.$error(err.message);
                })
            },
            getProvince() {
                if (this.provinceId) {
                    this.objData.id = this.provinceId;
                    this.getDetailProvince(this.objData).then(res => {
                        this.objData.id = res.data.id;
                        this.objData.name = res.data.name;
                        this.objData.status = res.data.status;
                        this.objData.areaId = res.data.areaId;
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
            getArea() {
                this.getListArea(this.objDataArea).then(() =>{
                }).catch((error) =>{
                    return this.$message(error.message, 'error');
                })
            },
            editProvince() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                this.saveEditProvince(this.objData).then((response) => {
                    if(response.success){
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            addProvince(){
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                if (this.objData.areaId === -1) {
                    return this.$message(this.$i('LabelErrorEmptyArea'), 'error');
                }
                this.saveAddProvince(this.objData).then((response) => {
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
            this.getProvince();
            this.getArea();
            this.getLangs();
        }
    }
</script>