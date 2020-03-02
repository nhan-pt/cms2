<template>
    <div v-if="this.salarySearchId > 0">
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group">
                    <label>{{$i('Name')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('Name')"
                           v-model="detailSalarySearch.name"/>
                </div>
                <div v-for="(v, k) in objData.langs" :key="k" class="form-group">
                    <label>{{languageName(v.languageCode)}}</label>
                    <input type="text" v-model="v.name" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>{{$i('SalaryType')}}</label>
                    <select class="form-control" v-model="detailSalarySearch.salaryTypeId">
                        <option value="-1">{{$i('Select')}}</option>
                        <option v-for="item in listSalaryType" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>{{$i('ValueSalarySearch')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('ValueSalarySearch')"
                           v-model="detailSalarySearch.value"/>
                </div>
                <div class="form-group">
                    <label>{{$i('Order')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('Order')"
                           v-model="detailSalarySearch.order"/>
                </div>
                <div class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="detailSalarySearch.status">
                        <option value="1">{{ $i('Active') }}</option>
                        <option value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="editSalarySearch()">
                <span>{{ $i('Save') }}</span>
            </button>
        </div>
    </div>
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
                    <label>{{$i('SalaryType')}}</label>
                    <select class="form-control" v-model="objData.salaryTypeId">
                        <option value="-1">{{ $i('Select') }}</option>
                        <option v-for="item in listSalaryType" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>{{$i('ValueSalarySearch')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('ValueSalarySearch')"
                           v-model="objData.value"/>
                </div>
                <div class="form-group">
                    <label>{{$i('Order')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('Order')"
                           v-model="objData.order"/>
                </div>
<!--                <div class="form-group">-->
<!--                    <label>{{$i('Status')}}</label>-->
<!--                    <select class="form-control" v-model="objData.status">-->
<!--                        <option value="-1">{{$i('SelectStatus')}}</option>-->
<!--                        <option value="1">{{ $i('Active') }}</option>-->
<!--                        <option value="0">{{ $i('DeActived') }}</option>-->
<!--                    </select>-->
<!--                </div>-->
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="addSalarySearch()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        props: ['salarySearchId'],
        data() {
            return {
                objData: {
                    id: -1,
                    name: '',
                    langs: [],
                    status: -1,
                    value: '',
                    order: 1,
                    salaryTypeId: -1,
                },
                objDataSalaryType: {
                    name: '',
                    status: -1,
                    pageIndex: 1,
                    pageSize: 100
                },
                languages: null,
            }
        },
        computed: {
            ...mapGetters(['detailSalarySearch','listSalaryType']),
        },
        watch: {

        },
        methods: {
            ...mapActions(['getListSalaryType', 'getDetailSalarySearch', 'saveEditSalarySearch', 'saveAddSalarySearch', 'getLanguages']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                    this.getSalarySearch();
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
            getSalarySearch() {
                if (this.salarySearchId > 0) {
                    this.objData.id = this.salarySearchId;
                    this.getDetailSalarySearch(this.objData).then(res => {
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
            getSalaryType() {
                this.getListSalaryType(this.objDataSalaryType).then(() =>{
                }).catch((error) =>{
                    return this.$message(error.message, 'error');
                })
            },
            editSalarySearch() {
                if (!this.detailSalarySearch.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                if (this.detailSalarySearch.salaryTypeId == -1) {
                    return this.$message(this.$i('LabelErrorEmptySalaryType'), 'error');
                }
                this.objData.id = this.salarySearchId;
                this.objData.name = this.detailSalarySearch.name;
                this.objData.status = this.detailSalarySearch.status;
                this.objData.value = this.detailSalarySearch.value;
                this.objData.order = this.detailSalarySearch.order;
                this.objData.salaryTypeId = this.detailSalarySearch.salaryTypeId;
                this.saveEditSalarySearch(this.objData).then((response) => {
                    if(response.success){
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            addSalarySearch(){
                if (!this.objData.name) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                if (this.objData.salaryTypeId == -1) {
                    return this.$message(this.$i('LabelErrorEmptySalaryType'), 'error');
                }
                this.saveAddSalarySearch(this.objData).then((response) => {
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
            this.getSalaryType();
        }
    }
</script>