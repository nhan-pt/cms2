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
                <div v-if="areaId > 0" class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="objData.status">
                        <option value="-1">{{$i('SelectStatus')}}</option>
                        <option value="1">{{ $i('Active') }}</option>
                        <option value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="addArea()">
                <span v-if="areaId">{{ $i('Save') }}</span>
                <span v-else>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';

    export default {
        props: ['areaId'],
        data() {
            return {
                objData: {
                    id: 0,
                    name: '',
                    langs: [{
                        "languageCode": "en",
                        "name": ""
                    }],
                    status: -1,
                },
                languages: null,
            }
        },
        methods: {
            ...mapActions(['getDetailArea', 'saveEditArea', 'saveAddArea', 'getLanguages']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                }).catch(err => {
                    return this.$error(err.message);
                })
            },
            getArea() {
                if (this.areaId) {
                    this.objData.id = this.areaId;
                    this.getDetailArea(this.objData).then(res => {
                        this.objData.id = res.data.id;
                        this.objData.name = res.data.name;
                        this.objData.status = res.data.status;
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
            addArea() {
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                if (!this.areaId) {
                    this.saveAddArea(this.objData).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.$emit('closePopup');
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                } else {
                    this.saveEditArea(this.objData).then((response) => {
                        if (response.success) {
                            this.$message(this.$i('Successful'));
                            this.$emit('closePopup');
                        }
                    }).catch((error) => {
                        return this.$message(error.message, 'error');
                    });
                }
            },
            languageName(code) {
                return this.languages.filter(i => i.code == code)[0].name;
            },
        },
        created() {
            this.getArea();
            this.getLangs();
        },
    }
</script>