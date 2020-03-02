<template>
    <modal id="modal-dashbroad" :title="$i('SystemConfig')" @close="$emit('closePopup')">
        <div slot="body">
            <div id="news-wrapper">
                <div class="row" v-if="form">
                    <div class="col-12">
                        <div class="form-group">
                            <label>{{$i('Title')}}</label>
                            <input type="text" class="form-control" v-model="form.configName" fullWidth />
                        </div>
                    </div>
                    <div class="col-12 mt-10" v-if="form.configType=='EDITOR'">
                        <div class="form-group">
                            <label>{{$i('Content')}}</label>
                            <editor ref="editor" id="newsEditor" :content="form.configValue" v-if="isLoader"></editor>
                        </div>
                    </div>
                    <div class="col-12" v-if="form.configType=='TEXT'">
                        <div class="form-group">
                            <label>{{$i('Content')}}</label>
                            <textarea v-model="form.configValue" class="form-control" rows="2" fullWidth></textarea>
                        </div>
                    </div>
                    <div class="col-12" v-if="form.configType=='BOOLEAN'">
                        <div class="form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="select_all" v-model="form.configValue">
                                <label class="custom-control-label" for="select_all">{{form.configName}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-if="form.configType=='SELECT'">
                        <div class="form-group">
                            <label>{{$i('Content')}}</label>
                            <select class="form-control" v-model="form.configValue" v-if="form && form.configData" fullWidth>
                                <mu-menu-item v-for="(c, index) in form.configData" :value="c.id+''" :title="c.value" :key="'c_'+ index" />
                            </select>
                        </div>
                    </div>
                    <div class="col-12" v-if="form.configType=='PHOTO'">
                        <div class="form-group">
                            <img v-if="fileUrl" :src="fileUrl" id="avatar-plh" class="mr-3" />
                            <button type="button" class="btn btn-success waves-effect waves-light" @click="showFileManager=true">Chọn ảnh</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-1" slot="footer">
            <button class="btn btn-primary" @click="save()">
                <span>{{$i("Save")}}</span>
            </button>
        </div>
        <div slot="outside">
            <file-manager v-if="showFileManager" @close="showFileManager=false" v-on:insert="selectFile" />
        </div>
    </modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import avatarSelect from '../_common/photo-select';
    import editor from '../_common/editor';
    import { fail } from 'assert';
    export default {
        name: 'config-edit',
        components: { avatarSelect, editor },
        props: ['configKey'],
        data() {
            return {
                form: {
                    configKey: '',
                    configName: '',
                    configValue: '',
                    configType: ''
                },
                editorContent: '',
                isLoader: false,
                showFileManager: false
            }
        },
        computed: {
            fileUrl() {
                if (this.form.configType == "PHOTO" && this.form.configValue && !this.form.configValue.startsWith('http'))
                    return this.appSettings.storageDomain + this.form.configValue;

                return this.form.configValue;
            }
        },
        methods: {
            selectFile(val) {
                if (val && val.length > 0)
                    this.form.configValue = val[0].url;
            },
            getDetail() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'config',
                        fn: 'detail',
                        configKey: this.form.configKey
                    }
                }).then((response) => {
                    loading.hide();
                    if (response.success) {
                        this.form = response.data;
                        if (this.form.configType == 'EDITOR') {
                            this.isLoader = true;
                        }
                        else if (this.form.configType == 'SELECT') {
                            this.form.configData = JSON.parse(this.form.configData);
                        }
                        else if (this.form.configType == 'BOOLEAN') {
                            this.form.configValue = this.form.configValue == '1';
                        }
                    }
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            save() {
                if (this.form.configType == 'EDITOR') {
                    if (typeof (CKEDITOR) != 'undefined')
                        this.form.configValue = encodeURIComponent(this.$refs.editor.getData());
                }
                else if (this.form.configType == 'BOOLEAN') {
                    this.form.configValue = this.form.configValue ? '1' : '0';
                }
                this.$http({
                    data: {
                        m: 'config',
                        fn: 'save',
                        ...this.form
                    }
                }).then((res) => {
                    this.$message(this.$i('Successful'));
                    this.$emit('closePopup');
                }).catch(err => {
                    return this.$message(err.message, 'error');
                });
            },
        },
        created() {
            this.form.configKey = this.configKey;
            this.getDetail();
        }
    }
</script>
<style>
    .deadlineClass { color: #ff0000 }

    #editor .ql-tooltip[data-mode="video"] { left: 25% !important; top: 35% !important; }

        #editor .ql-tooltip[data-mode="video"] input { height: 80px !important; width: 400px !important; }

    #editor { height: 600px; }

    #avatar-plh { max-width: 200px; max-height: 200px; }

    #news-wrapper .input[type="text"] label, #news-wrapper .common-label { font-weight: bold; color: #000; }
</style>