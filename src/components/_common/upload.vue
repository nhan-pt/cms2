<template>
<el-upload class="avatar-uploader" id="upload-one" :class="type" :style="'height:' + height" :action="'/upload'" name="files"  :http-request="request" :before-upload="beforeUpload" :on-remove="handleRemove" :multiple="false"  :show-file-list="false" :file-list="fileList">
    <div v-loading="loading"> </div>
    <img v-if="imageUrl || value" :src="imageUrl || value">
    <i v-else class="el-icon-plus avatar-uploader-icon" :style="[{height: height}, {maxHeight: height}, {lineHeight: height}, {width: width}]"></i>
    <div class="before-upload"><i class="fas fa-camera icon"></i></div>
</el-upload>
</template>

<script>
import config from '../../../config';
import imageCompression from 'browser-image-compression';
export default {
    name: 'upload',
    props: {
        value: {
            type: String
        },
        type: {
            type: String,
            default: 'avatar-img'
        },
        height: {
            type: String,
            default: '200px'
        },
        maxWidthHeight: {
            type: Number,
            default: 600
        },
        width: {
            type: Number,
            default: 200
        }
    },
    data() {
        return {
            imageUrl: '',
            loading: false,

        }
    },
    mounted() {
        this.imageUrl = this.value;
    },
    methods: {
        handleRemove() {
            this.imageUrl = '';
            this.$emit('input', null)
        },
        beforeUpload(file) {
            const isType = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isType) {
                this.$message('Image must be JPG or PNG format!', 'error');
            }
            return isType;
        },
        request(req) {
            const options = {
                maxSizeMB: Number.POSITIVE_INFINITY,
                maxWidthOrHeight: this.maxWidthHeight,
                useWebWorker: true,
                maxIteration: 10
            }
            imageCompression(req.file, options)
                .then(res => {
                    this.loading = true;
                    var xhr, formData;
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.open('POST', config.api.url + '/upload');
                    xhr.setRequestHeader('secret_key', config.secret_key);
                    // xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem(CONSTANTS.ACCESS_TOKEN));
                    xhr.onload = () => {
                        var json;
                        if (xhr.status != 200) {
                            this.$notify.error({
                                message: 'HTTP Error: ' + xhr.status,
                                type: 'success'
                            });
                            return;
                        }
                        this.loading = false;
                        json = JSON.parse(xhr.responseText);
                        this.imageUrl = URL.createObjectURL(res);
                        this.imageUrl = '';
                        return this.$emit('input', json.data[0])
                    };
                    formData = new FormData();
                    formData.append('files', res, req.file.name);
                    xhr.send(formData);
                })
        }
    },
    computed: {
        fileList() {
            if (!this.value) return;
            return [{
                name: this.value,
                url: this.value
            }]
        }
    },
}
</script>

<style>

</style>
