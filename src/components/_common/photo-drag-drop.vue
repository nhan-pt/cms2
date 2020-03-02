<template>
    <div class="upload-drag-drop-image">
        <el-upload class="upload-drag-drop" drag
                   name="files"
                   :headers="headerInfo"
                   :action="apiUpload"
                   :before-upload="beforeUpload"
                   :on-progress="onProgress"
                   :on-change="getFiles" :multiple="false" :show-file-list="false">
            <img :src="srcUpload || src || srcDefault" class="photo-preview" :width="width" :height="height">
            <div v-if="showProgress && progressData.success" class="on-progress">
                <div class="px-3 d-flex justify-content-between ">
                    <label>{{ progressData.label }}</label>
                    <span>{{ progressData.percent }}%</span>
                </div>
                <div class="progress" style="height:4px">
                    <div class="progress-bar" style="height:4px" :style="{width: progressData.percent + '%'}"></div>
                </div>
            </div>
        </el-upload>
        <button class="btn btn-danger" v-if="showDelete && src" @click="deleteImage">
            <i class="mdi mdi-close-circle"></i>
        </button>
    </div>
</template>
<script>
    import CONSTANTS from '../../core/utils/constants';
    import config from '../../../config';

    export default {
        props: {
            src: {
                type: String,
                default: '',
            },
            width: {
                type: String,
                default: '100%',
            },
            height: {
                type: String,
                default: '500px',
            },
            index: {
                type: Number,
                default: null
            },
            showDelete: {
                default: false
            },
            showProgress: {
                default: false
            },
        },
        data() {
            return {
                headerInfo: {
                    'Authorization': 'Bearer ' + localStorage.getItem(CONSTANTS.ACCESS_TOKEN),
                    'secret_key': config.secret_key,
                },
                apiUpload: window.appSettings.apiUrl + '/upload',
                srcUpload: '',
                srcDefault:'https://s3.wasabisys.com/laboro/15763220731561560754139191default-image.png',
                progressData: {
                    success: false,
                    label: '',
                    percent: '',
                }
            };
        },
        methods: {
            getFiles(file) {
                if (file.response) {
                    this.srcUpload = file.response.data[0];
                    this.$emit('change', file.response.data[0], this.index);
                }
                this.progressData.success = false;
            },
            deleteImage() {
                this.$confirm(this.$i('DoYouWantToDeleteImage')).then(() => {
                    this.srcUpload = window.appSettings.storageDomain +'1560754139191default-image.png';
                    this.$emit('change', '', this.index);
                    return this.$message(this.$i('DeleteImageSuccess'));
                });
            },
            beforeUpload(file) {
                const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isImg) {
                    this.$error('Avatar picture must be JPG, JPEG or PNG format!');
                }
                return isImg;
            },
            onProgress(event, file, fileList) {
                this.progressData.success = true;
                this.progressData.label = file.name;
                this.progressData.percent = event.percent;
            }
        },
    }
</script>
<style>
    .upload-drag-drop-image {
        position: relative;
        border: 1px solid #ced4da;
        border-radius: .25rem;
    }

    .upload-drag-drop-image button {
        position: absolute;
        right: 0px;
        top: 0px;
    }

    .photo-preview {
        object-fit: contain;
    }

    .el-upload__input {
        display: none;
    }

    .el-upload-dragger{
        height:100% !important;
        width:100% !important;
        min-width: 260px;
        text-alight:center
    }
</style>
