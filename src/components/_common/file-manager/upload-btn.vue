﻿<template>
    <div class="btn btn-primary btn-block">
        <input type="file" multiple="multiple" @change="handleFileUpload()" ref="file" accept="image/*" />
        <span class="icon-span-filestyle fas fa-folder-open"></span> Upload
    </div>
</template>
<style scoped>
    .btn { position: relative; }
    input { position: absolute; width: 100%; height: 100%; bottom: 0; right: 0; opacity: 0; }
</style>
<script>
    export default {
        name: 'upload-btn',
        props: ['exts'],
        methods: {
            add(file) {
                this.$http({
                    data: {
                        m: "file",
                        fn: "add",
                        name: file.name,
                        url: file.path,
                        size: file.size,
                        ext: this.getExtentionOnly(file.name).toLowerCase(),
                        width: file.width || 0,
                        height: file.height || 0
                    }
                }).then((response) => {
                    if (response.success) {
                        this.files = response.data;
                    }
                    this.$emit('uploaded');
                });
            },
            handleFileUpload() {
                this._.forEach(this.$refs.file.files, (o, i) => {
                    let file = this.$refs.file.files[i];
                    if (file) {
                        let fname = file.name;
                        let ext = this.getExtentionOnly(fname).toLowerCase();
                        let allowsExt = this.exts.split(';');
                        if (allowsExt.length > 0) {
                            if (this._.indexOf(allowsExt, ext) == -1) {
                                return this.$error('Chỉ cho phép upload các định dạng: ' + this.exts.replace(/\|/g, ';'));
                            }
                        }
                        this.upload(file);
                    }
                });
            },
            upload(file) {
                this._uploadFile(file).then((res) => {
                    var data = res;
                    file.path = data.path;
                    file.width = data.width;
                    file.height = data.height;
                    this.add(file);
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Thành công',
                        text: file.name + ' đã tải lên thành công!'
                    });
                   
                }).catch((err) => {
                    this.$notify({
                        type: 'error',
                        group: 'foo',
                        title: 'Lỗi',
                        text: err
                    });
                });
            },
            getExtentionOnly(fileext) {
                return fileext.split('.').pop();
            }
        }
    }
</script>