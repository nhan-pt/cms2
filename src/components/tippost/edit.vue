<template>
    <wrapper v-if="languages" :title="tipPostId > 0 ? $i('UpdateTipPost') : $i('AddTipPost')" sapo="" id="create-tip-post" >
        <div class="dn-content-left">
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group tip-avatar">
                                <label>{{$i('Avatar')}}</label>
                                <UploadImage v-model="objData.avatar" type="avatar" width="350px"/>
                                <!--<photo-drag-drop :src="objData.avatar" @upload="objData.avatar = $event" width="100%" height="100%"></photo-drag-drop>-->
                            </div>
                            <div class="form-group">
                                <label>{{$i('Source')}}</label>
                                <input type="text" class="form-control" :placeholder="$i('Source')"
                                       v-model="objData.source"/>
                            </div>
                            <div class="form-group">
                                <label>{{$i('Description')}}</label>
                                <input type="text" class="form-control" :placeholder="$i('Description')"
                                       v-model="objData.description"/>
                            </div>
                            <div class="form-group">
                                <label>{{$i('Status')}}</label>
                                <select class="form-control" v-model="objData.status">
                                    <option value="-1">{{$i('SelectStatus')}}</option>
                                    <option value="1">{{ $i('Active') }}</option>
                                    <option value="0">{{ $i('DeActived') }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <b-tabs content-class="mt-3">
                                <b-tab :title="languages.filter(i => i.isDefault)[0].name" active>
                                    <div class="form-group">
                                        <label>{{$i('Title')}}</label>
                                        <input type="text" class="form-control" :placeholder="$i('Title')"
                                               v-model="objData.title"/>
                                    </div>
                                    <div class="form-group">
                                        <label>{{$i('Sapo')}}</label>
                                        <textarea class="form-control" v-model="objData.sapo" rows="3"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>{{$i('Content')}}</label>
                                        <tiny-mce @change="bindData" :field="`content`" :height="350"
                                                  :value="objData.content"></tiny-mce>
                                    </div>
                                </b-tab>
                                <b-tab :title="languageName(v.languageCode)" v-for="(v, k) in objData.langs" :key="k">
                                    <div class="form-group">
                                        <label>{{$i('Title')}}</label>
                                        <input type="text" class="form-control" :placeholder="$i('Title')"
                                               v-model="v.title"/>
                                    </div>
                                    <div class="form-group">
                                        <label>{{$i('Sapo')}}</label>
                                        <textarea class="form-control" v-model="v.sapo" rows="3"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>{{$i('Content')}}</label>
                                        <tiny-mce @change="bindDataMultiLangs" field="content" :index="k" :height="350"
                                                  :value="v.content"></tiny-mce>
                                    </div>
                                </b-tab>
                            </b-tabs>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group d-flex">
                <div v-if="this.tipPostId">
                    <button class="btn btn-primary" v-on:click="edit()">
                        <span>{{ $i('Save') }}</span>
                    </button>
                </div>
                <div v-else>
                    <button class="btn btn-primary" v-on:click="add()">
                        <span>{{ $i('Add') }}</span>
                    </button>
                </div>
                <button class="btn btn-warning ml-2" @click="$router.push('/tippost')"><span>{{ $i('Cancel') }}</span></button>
            </div>
        </div>
    </wrapper>
</template>

<script>
    import {mapActions} from 'vuex';
    import UploadImage from '../_common/upload';

    export default {
        data() {
            return {
                objData: {
                    title: "",
                    sapo: "",
                    content: "",
                    avatar: "",
                    status: -1,
                    modifiedBy: 1,
                    description: "",
                    source: "",
                    langs: []
                },
                tipPostId: 0,
                languages: null,
            }
        },
        components: { UploadImage},
        methods: {
            ...mapActions(['detailTipPost', 'updateTipPost', 'addTipPost', 'getLanguages']),
            getLangs() {
                this.getLanguages().then(res => {
                    this.languages = res;
                    this.getDetail();
                }).catch(err => {
                    return this.$error(err.message);
                })
            },
            getLanguageIsNotDefault() {
                return this.languages.filter(i => !i.isDefault).map(i => {
                    return {
                        languageCode: i.code,
                        title: "",
                        sapo: "",
                        content: ""
                    }
                })
            },
            getDetail() {
                if (this.tipPostId) {
                    let loading = this.$loading.show();
                    this.detailTipPost({id: this.tipPostId})
                        .then(res => {
                            this.objData = res;
                            this.objData.langs = this.getLanguageIsNotDefault().map(i => {
                                return res.langs.filter(j => {
                                    if (j.languageCode == i.languageCode)
                                        return j;
                                })[0] || i;
                            });
                            loading.hide();
                        })
                        .catch(err => {
                            loading.hide();
                            this.$error(err.message);
                        })
                } else {
                    this.objData.langs = this.getLanguageIsNotDefault();
                }
            },
            edit() {
                this.updateTipPost(this.objData).then(() => {
                    this.$message(this.$i('Successful'));
                    setTimeout(() => {
                        this.$router.push('/tippost');
                    }, 1500);
                }).catch(err => {
                    this.$error(err.message);
                })
            },
            add() {
                if (!this.objData.title) {
                    return this.$message(this.$i('LabelErrorEmptyTitle'), 'error');
                }
                if (!this.objData.sapo) {
                    return this.$message(this.$i('LabelErrorEmptySapo'), 'error');
                }
                if (!this.objData.content) {
                    return this.$message(this.$i('LabelErrorEmptyContent'), 'error');
                }
                if (!this.objData.avatar) {
                    return this.$message(this.$i('LabelErrorEmptyAvatar'), 'error');
                }
                this.addTipPost(this.objData).then(() => {
                    this.$message(this.$i('Successful'));
                    setTimeout(() => {
                        this.$router.push('/tippost');
                    }, 1500);
                }).catch(err => {
                    this.$error(err.message);
                })
            },
            languageName(code) {
                return this.languages.filter(i => i.code == code)[0].name;
            },
            bindData(contents, field) {
                this.objData[field] = contents;
            },
            bindDataMultiLangs(contents, field, obj, index) {
                this.objData.langs[index][field] = contents;
            }
        },
        created() {
            if (this.$route.params.id) {
                this.tipPostId = this.$route.params.id;
            }
            this.getLangs();
        }
    }
</script>

<style scoped>
    .tip-avatar .upload-drag-drop-image {
    
    }
</style>
