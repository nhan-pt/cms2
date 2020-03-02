<template>
    <wrapper :title="$i('SystemConfig')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-4 col-sm-12">
                    <input type="text" class="form-control" v-model="objData.keyword" :placeholder="$i('Keyword')" />
                </div>
            </div>
        </div>
        <div v-if="listConfig && listConfig.length > 0">
            <div class="row">
                <div class="col-12">
                    <ul>
                        <li v-for="item in listConfig" :key="'c'+ item.configKey">
                            <div class="config-content">
                                <h3>
                                    {{item.configName}}
                                    <p class="config-key">{{item.configKey}}</p>
                                </h3>
                            </div>
                            <div class="action-right">
                                <button secondary class="btn btn-primary" @click="openPopup(item.configKey)">
                                    <i class="fa fa-edit"></i>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <p v-else class="text-center">{{$i('NoData')}}!</p>
        <edit :configKey="configKey" v-on:closePopup="closePopup()" v-if="openConfig" />
    </wrapper>
</template>
<style scoped>
    h3 { padding-top: 0 !important; }
    .config-key { color: #999; font-weight: normal; font-size: 14px; }
</style>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import edit from './edit';
    export default {
        name: 'config-manager',
        components: {
            edit
        },
        data() {
            return {
                objData: {
                    keyword: '',
                    pageIndex: 1,
                    pageSize: 20
                },
                listConfig: [],
                totalRows: 0,
                openConfig: false,
                configKey: ''
            }
        },
        computed: {
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            },
        },
        watch: {
            'objData.keyword'(val) {
                clearTimeout(this.timeDelay);
                this.timeDelay = setTimeout(() => {
                    this.$set(this.objData, 'keyword', val);
                    this.getListConfig();
                }, 500)
            },
        },
        methods: {
            openPopup(id) {
                this.configKey = id;
                this.openConfig = true;
            },
            closePopup() {
                this.openConfig = false;
                this.getListConfig();
            },
            getListConfig() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'config',
                        fn: 'list',
                        ...this.objData
                    }
                }).then((response) => {
                    loading.hide();
                    this.listConfig = response.data;
                    this.totalRows = response.totalRows;
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            clickCallback(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getListConfig();
            },
        },
        created() {
            this.getListConfig();
        },
    }
</script>
<style scoped>
    ul { width: 100%; }
    li { vertical-align: middle; width: 100%; margin-bottom: 20px; background: #f1f1f1; padding: 10px; float: left; list-style: none; border: 1px solid #e8e8e8; }
        li div { float: left; }
        li .priority { width: 60px; }
    .action-right { float: right; padding-top: 5px; }
    li h3 { padding-top: 8px; margin: 0; font-size: 20px; }
    ul { padding: 0 }
    .config-key { margin: 0 }
</style>
<style>
    .sortable-chosen { border: 1px dashed #ffc300 !important; }
</style>