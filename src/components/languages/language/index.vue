<template>
    <wrapper title="Quản lý ngôn ngữ">
        <div id="form-search">
            <button type="button"
                    class="btn btn-primary"
                    @click="openPopup()"><i class="fa fa-plus-circle"></i> Thêm
                ngôn ngữ
            </button>
        </div>
        <div class="common-table tbl-fix-600 ">
            <table class="table table-striped">
                <thead slot="header">
                <tr>
                    <th>{{$i("Stt")}}</th>
                    <th>Mã ngôn ngữ</th>
                    <th>Tên</th>
                    <th>Tên tiếng Việt</th>
                    <th>Thứ tự hiển thị</th>
                    <th>Trạng thái</th>
                    <th class="text-center width-250">{{$i("Action")}}</th>
                </tr>
                </thead>
                <tbody v-if="languages">
                <tr v-for="(item, index) in languages"
                    :key="item.code">
                    <td>{{index + 1}}</td>
                    <td>{{item.code}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.viName}}</td>
                    <td>{{item.priority}}</td>
                    <td>
                        <span class="badge badge-primary"
                              v-if="item.status==1">Hiển thị</span>
                        <span class="badge badge-danger"
                              v-else>Ẩn</span>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-warning"
                                :title="$i('Edit')"
                                @click="openPopup(item.code)">Sửa
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="common-table tbl-fix-600">
            <div class="row mt-4 mb-3">
                <div class="col-xs-9 col-lg-9 col-md-9 col-sm-12 col-12"> 
                    <h5 ref="checkSaveBtn">Danh sách từ khóa tĩnh</h5>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-4 mb-3 ">
                <button type="button"
                    class="btn btn-danger"
                    @click="openLanguageStatic()"><i
                    class="fa fa-plus-circle"></i> Thêm từ
                </button>
                <div class="d-flex justify-content-start align-items-center col-md-8 no-padding-left">
                    <div v-if="listEnvironment" class="col-md-4 no-padding-left">
                        <el-select v-model="data.envs"
                                   multiple
                                   @change="getLanguageStaticTexts"
                                   :placeholder="$i('Select')">
                            <el-option
                                    v-for="item in listEnvironment"
                                    :key="item.languageEnvCode"
                                    :label="item.languageEnvCode"
                                    :value="item.languageEnvCode">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="custom-control custom-checkbox col-md-6">
                        <input type="text"
                           v-model="data.languageStaticKey"
                           class="form-control"
                           placeholder="Search ...">
                    </div>
                    <div class="custom-control custom-checkbox ml-3 width-150">
                        <input type="checkbox" class="custom-control-input" id="customCheck"
                               v-model="notLanguageDefaultValue" @change="getLanguageStaticTexts(2)">
                        <label class="custom-control-label" for="customCheck">Chưa dịch</label>
                    </div>
                </div>
                
                    <div class="input-group d-flex justify-content-center align-items-center width-150">
                        <span class="mr-2">Show</span>
                        <select name="searchKey"
                                v-model="data.pageSize"
                                @change="getLanguageStaticTexts"
                                class="form-control">
                            <option v-for="(v, k) in dataLength"
                                    :key="k"
                                    :value="v.key">{{ v.value }}
                            </option>
                        </select>
                    </div>
            </div>
            <div class="overflow-auto">

            <table class="table table-striped">
                <thead slot="header">
                <tr>
                    <th>{{$i("Index")}}</th>
                    <th class="width-100">Từ khóa</th>
                    <th>Mô tả</th>
                    <th class="width-250" v-if="languageDefaultName(languages)">
                        {{ languageDefaultName(languages).name }}
                    </th>
                    <th class="width-350">
                        Environment
                    </th>
                    <th class="text-center width-120">Action
                    </th>
                </tr>
                </thead>
                <tbody v-if="languageStaticTexts">
                <tr v-for="(item, index) in languageStaticTexts"
                    :key="item.languageStaticKey">
                    <td>{{index + 1}}</td>
                    <td>
                        <span>{{item.languageStaticKey}}</span>
                    </td>
                    <td>
                        <span>{{item.languageDefaultValue}}</span>
                        <span title="The keyword has not been fully updated"
                              v-if="showAlert(item)"
                              class="mdi mdi-18px mdi-alert text-warning float-right"></span>
                    </td>
                    <td>
                        <input type="text"
                               class="form-control"
                               v-model="item.langs[languageDefaultIndex(item)].languageValue"/>
                    </td>
                    <td>
                        <el-select v-model="item.enviroments"
                                   multiple
                                   :placeholder="$i('Select')">
                            <el-option
                                    v-for="v in listEnvironment"
                                    :key="v.languageEnvCode"
                                    :label="v.languageEnvCode"
                                    :value="v.languageEnvCode">
                            </el-option>
                        </el-select>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-primary"
                                @click="saveLanguageStatic(item)">
                            <i class="mdi mdi-content-save"></i>
                        </button>
                        <button class="btn"
                                @click="translate(index)">
                            <i class="mdi mdi-google-translate"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        <pager :total="languageStaticCount"
               :pageIndex="data.pageIndex"
               :pageSize="data.pageSize"
               @change="pageChange"/>
        <modal v-if="popupAdd"
               @close="popupAdd=false"
               :title="code!='' ? 'Cập nhật ngôn ngữ' :'Thêm mới ngôn ngữ'">
            <div slot="body"
                 v-if="languageDetail">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Chọn ngôn ngữ</label>
                            <select class="form-control"
                                    v-model="languageDetail.code"
                                    placeholder="Tên tiếng Việt"
                                    :disabled="code!=''">
                                <option v-for="(lang,key) in allLanguages"
                                        :value="key"
                                        :key=key>{{lang[0]}} -
                                    {{lang[1]}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Tên tiếng Việt</label>
                            <input type="text"
                                   class="form-control"
                                   v-model="languageDetail.viName"/>
                        </div>
                        <div class="form-group">
                            <label>Thứ tự hiển thị</label>
                            <input type="text"
                                   class="form-control"
                                   v-model="languageDetail.priority"/>
                        </div>
                        <div class="form-group">
                            <label>Trạng thái</label>
                            <select class="form-control"
                                    v-model="languageDetail.status">
                                <option value="0">Ẩn</option>
                                <option value="1">Hiển thị</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-primary"
                        @click="save()">
                    <span>{{$i("Save")}}</span>
                </button>
            </div>
        </modal>
        <modal v-if="popupLanguageStatic"
               @close="closePopupLanguageStatic">
            <div slot="body">
                <add-language v-on:closePopup="closePopupLanguageStatic"></add-language>
            </div>
        </modal>
        <modal v-if="popupTranslate"
               @close="closePopupTranslate">
            <div slot="body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label> Mô tả</label>
                            <input type="text"
                                   class="form-control"
                                   v-model="languageStaticTexts[indexTranslate].languageDefaultValue"/>
                        </div>
                        <div v-for="(v, k) in languageStaticTexts[indexTranslate].langs"
                             class="form-group"
                             :key="k"
                             v-if="v.languageCode != 'jp'">
                            <label> {{ languageName(v.languageCode)}} </label>
                            <input type="text"
                                   v-model="v.languageValue"
                                   class="form-control"/>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary"
                        @click="saveLanguageStatic(languageStaticTexts[indexTranslate])">Save
                </button>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import addLanguage from './edit'

    export default {
        name: 'language-index',
        computed: {
            ...mapGetters(['allLanguages', 'languageStaticCount']),
        },
        watch: {
            'data.languageStaticKey'() {
                clearTimeout(this.timeDelay);
                this.timeDelay = setTimeout(() => {
                    this.getLanguageStaticTexts(1);
                }, 800)
            }
        },
        components: {
            addLanguage,
        },
        data() {
            console.log('HERE')
            return {
                dataLength: [
                    {key: 10, value: '10'},
                    {key: 20, value: '20'},
                    {key: 50, value: '50'},
                    {key: 9999, value: 'All'},
                ],
                data: {
                    languageStaticKey: '',
                    pageIndex: 1,
                    languageCode: '',
                    pageSize: 10,
                    envs: []
                },
                loader: false,
                listEnvironment: null,
                langs: [],
                languages: [],
                languageStaticTexts: null,
                timeDelay: null,
                popupAdd: false,
                code: '',
                languageDetail: {code: ''},
                staticTexts: null,
                stick: false,
                popupLanguageStatic: false,
                popupTranslate: false,
                indexTranslate: null,
                notLanguageDefaultValue: false
            }
        },
        methods: {
            ...mapActions(['getLanguages', 'insertLanguage', 'updateLanguage', 'getLanguageStatic', 'updateLanguageStatic', 'getListLanguageEnv']),
            openPopup(code) {
                this.code = code || '';
                this.popupAdd = true;
                if (this.code != '')
                    this.getDetail();
                else
                    this.languageDetail = {
                        code: ''
                    };
            },
            openLanguageStatic() {
                this.popupLanguageStatic = true;
            },
            closePopup() {
                this.popupAdd = false;
            },
            closePopupLanguageStatic() {
                this.popupLanguageStatic = false;
                this.getStaticText();
            },
            scrollPage() {
                let check = this.$refs['checkSaveBtn'].getBoundingClientRect().top;
                if (check < 100) {
                    this.stick = true;
                } else {
                    this.stick = false;
                }
            },
            save() {
                if (this.languageDetail.code == '') {
                    return this.$message(this.$i('LabelEmpty'), 'error');
                }
                let loading = this.$loading.show();
                let name = this.allLanguages[this.languageDetail.code][0];
                this.languageDetail.name = name;
                this.$http({
                    data: {
                        m: 'language',
                        fn: 'save',
                        ...this.languageDetail
                    }
                }).then((res) => {
                    loading.hide();
                    this.closePopup();
                    this.$message(this.$i("Successful"));
                    this.getLanguages();
                }).catch((err) => {
                    return this.$message(err.message, 'error');
                    loading.hide();
                });
            },
            getDetail() {
                this.languageDetail = this._.find(this.languages, (item, key) => {
                    return item.code == this.code;
                });
            },
            getStaticText() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'language',
                        fn: 'list_static'
                    }
                }).then((res) => {
                    loading.hide();
                    this.staticTexts = res.data;
                }).catch((err) => {
                    return this.$message(err.message, 'error');
                    loading.hide();
                });
            },
            getLanguageStaticTexts(index) {
                if (index == 1) {
                    this.data.pageIndex = 1;
                } else if (index == 2 && this.notLanguageDefaultValue) {
                    this.data.pageSize = 9999;
                } else if (index == 2 && !this.notLanguageDefaultValue) {
                    this.data.pageSize = 10;
                }
                let loading = this.$loading.show();
                this.getLanguageStatic(this.data).then((res) => {
                    if (this.notLanguageDefaultValue) {
                        this.languageStaticTexts = res.filter(i => {
                            return !i.langs[this.languageDefaultIndex(i)].languageValue;
                        })
                    } else {
                        this.languageStaticTexts = res.map(i => {
                            i.enviroments =  i.enviroments.map(j => j.languageEnvCode);
                            return i;
                        })
                    }
                    loading.hide();
                }).catch((err) => {
                    this.$message(err.message, 'error');
                    loading.hide();
                })
            },
            saveStaticTexts() {
                let data = JSON.stringify(this.staticTexts);
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'language',
                        fn: 'save_static',
                        texts: data
                    }
                }).then((res) => {
                    loading.hide();
                    return this.$success(this.$i('Successful'));
                }).catch((err) => {
                    return this.$message(err.message, 'error');
                    loading.hide();
                });
            },
            saveLanguageStatic(item) {
                let loading = this.$loading.show();
                item.envs = item.enviroments;
                this.updateLanguageStatic(item).then(res => {
                    this.getLanguageStaticTexts();
                    this.$success(this.$i('Successful'));
                    this.closePopupTranslate();
                    loading.hide();
                }).catch(error => {
                    this.$message(error.message, 'error');
                    loading.hide();
                })
            },
            translate(index) {
                this.popupTranslate = true;
                this.indexTranslate = index;
            },
            closePopupTranslate() {
                this.popupTranslate = false;
            },
            getEnv() {
                let loading = this.$loading.show();
                this.getListLanguageEnv().then(res => {
                    this.listEnvironment = res.map(i => {
                        let obj = {};
                        obj.languageEnvCode = i.code;
                        obj.name = i.name;
                        return obj;
                    });
                    this.loader = true;
                    loading.hide();
                })
            },
            pageChange(pageNum) {
                this.$set(this.data, 'pageIndex', pageNum);
                this.getLanguageStaticTexts();
            },
            languageDefaultName(arr) {
                return this._.find(arr, (o) => o.isDefault);
            },
            languageName(v) {
                return this.languages.filter(i => i.code == v)[0].name;
            },
            languageValue(item) {
                return this._.find(item.langs, i => i.languageCode == item.defaultLanguageCode);
            },
            languageDefaultIndex(item) {
                return this._.findIndex(item.langs, i => i.languageCode == item.defaultLanguageCode);
            },
            showAlert(item) {
                return item.langs.filter(i => !i.languageValue).length;
            }
        },
        created() {
            let loading = this.$loading.show();
            this.getEnv();
            this.getLanguageStaticTexts();
            this.getLanguages().then(res => {
                this.languages = res;
                loading.hide();
            });
        },
        mounted() {
            window.addEventListener('scroll', this.scrollPage);
        },
        destroyed() {
            window.removeEventListener('scroll', this.scrollPage);
        },
    }
</script>
<style>
    #saveLanguage.stick {
        position: fixed;
        top: 60px;
        right: 50px;
    };
    .no-padding-left{
        padding-right: 0px !important;
    }
</style>