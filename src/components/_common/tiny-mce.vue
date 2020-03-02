<template>
    <div>
        <editor v-model="content" :disabled="disabled" :init="{ plugins,toolbar,
        automatic_uploads, height , image_prepend_url ,images_upload_handler}"></editor>
    </div>
</template>
<script>
    import CONSTANTS from '../../core/utils/constants';
    import config from '../../../config';
    import tinymce from 'tinymce/tinymce';
    import Editor from '@tinymce/tinymce-vue';
    import 'tinymce/themes/silver/theme';
    import 'tinymce/plugins/advlist';
    import 'tinymce/plugins/autolink';
    import 'tinymce/plugins/lists';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/image';
    import 'tinymce/plugins/media';
    import 'tinymce/plugins/charmap';
    import 'tinymce/plugins/preview';
    import 'tinymce/plugins/hr';
    import 'tinymce/plugins/searchreplace';
    import 'tinymce/plugins/wordcount';
    import 'tinymce/plugins/code';
    import 'tinymce/plugins/fullscreen';
    import 'tinymce/plugins/table';
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/print'
    import 'tinymce/plugins/insertdatetime'
    export default {
        props: {

            value: {
                type: String,
                default: ''
            },
           
            disabled: {
                type: Boolean,
                default:false
            },
            height: {
                type: Number,
                default: 100
            },
            field: {
                type: String,
                default: ''
            },
            obj: {
                type: Object,
                default: null
            },
            index: {
                type: Number,
                default: null
            },
        },

        data() {
            return {
                plugins: [
                    'wordcount', 'link', 'hr', 'autolink', 'searchreplace',
                    'paste', 'print', 'insertdatetime',
                    'image', 'table', 'lists', 'advlist',
                    'preview', 'code', 'fullscreen', 'charmap', 'media'
                ],
                toolbar: 'undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | numlist bullist | outdent indent | link image | removeformat fullscreen code wordcount print',
                // images_upload_url: config.api.url + '/upload',
                automatic_uploads: true,
                readonly:true,
                image_prepend_url: window.appSettings.storageDomain,
                dataValue: '',
            }
        },
        computed: {
            
            content: {
                get() {
                    return this.value;
                },
                set(content) {
                    this.$emit('change', content, this.field, this.obj, this.index);
                }
            }
        },
        methods: {
            images_upload_handler: function (blobInfo, success, failure) {
                var xhr, formData;
                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', window.appSettings.apiUrl + '/upload');
                // xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem(CONSTANTS.ACCESS_TOKEN));
                xhr.setRequestHeader('secret_key', config.secret_key);
                xhr.onload = function (response) {
                    var json;
                    if (xhr.status != 200) {
                        failure('HTTP Error: ' + xhr.status);
                        return;
                    }
                    json = JSON.parse(xhr.responseText);
                    success(json.data[0]);
                };
                formData = new FormData();
                formData.append('files', blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
            },
        },
        components: {
            editor: Editor
        },
    }
</script>
