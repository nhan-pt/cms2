<template>
<el-upload class="avatar-uploader"
    :disabled="this.disabled"
    :action="uploadAction"
    :headers="myHeaders"
    :on-success="handleOnUploadSuccess"
    name="files"
    :before-upload="beforeUpload"
    :file-list="fileList"
    multiple
    :on-remove="handleRemove"
    :show-file-list="true"
    list-type="picture-card">
    <i slot="default" class="el-icon-plus"></i>
</el-upload>
</template>

<script>
import config from '../../../config';
// import imageCompression from 'browser-image-compression';

export default {
    name: "multi-upload",
    props: {
        employerPostImages: {
            type: Array
        },
        maxWidthHeight: {
            type: Number,
            default: 600
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            imageUrl: [],
            myHeaders: {
                secret_key: config.secret_key
            },
            uploadAction: config.api.url + '/upload',
        }
    },
    computed: {
        fileList() {
            if (!this.employerPostImages) return;
            return this.employerPostImages.map(i => {
                return {
                    name: i,
                    url: i
                }
            })
        }
    },
    methods: {
        handleRemove(file, fileList) {
            if (fileList.length) this.imageUrl = fileList.map(i => i.url)
            this.$emit('emitImg', this.imageUrl)
        },
        beforeUpload(file) {
            const isType = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isType) {
                this.$message('Image must be JPG or PNG format!', 'error');
            }
            return isType;
        },
        handleOnUploadSuccess(response, file, fileList) {
            if (response.success && response.data.length) {
                this.imageUrl.push(response.data[0])
            }
            this.$emit('emitImg', this.imageUrl)

        },
        /* use browser-image-compression to upload  */
        // request(req) {
        //     const options = {
        //         maxSizeMB: Number.POSITIVE_INFINITY,
        //         maxWidthOrHeight: this.maxWidthHeight,
        //         useWebWorker: true,
        //         maxIteration: 10
        //     }
        //     imageCompression(req.file, options)
        //         .then(res => {
        //             var xhr, formData;
        //             xhr = new XMLHttpRequest();
        //             xhr.withCredentials = false;
        //             xhr.open('POST', config.api.url + '/upload');
        //             // xhr.setRequestHeader('secret_key', config.secret_key);
        //             xhr.onload = () => {
        //                 var json;
        //                 if (xhr.status != 200) {
        //                     this.$notify.error({
        //                         message: 'HTTP Error: ' + xhr.status,
        //                         type: 'success'
        //                     });
        //                     return;
        //                 }
        //                 else{
        //                     json = JSON.parse(xhr.responseText);
        //                     this.imageUrl.push(json.data[0]);
        //                 }
        //
        //                 return this.$emit('input', this.imageUrl)
        //             };
        //             formData = new FormData();
        //             formData.append('files', res, req.file.name);
        //             xhr.send(formData);
        //         })
        // }
    },
    mounted() {
        setTimeout(() => {
            this.imageUrl = [...this.employerPostImages];
        }, 500)
    },
}
</script>

<style>

</style>
