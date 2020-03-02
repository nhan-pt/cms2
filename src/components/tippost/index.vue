<template>
    <wrapper :title="$i('TipPostList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input class="form-control" :placeholder="$i('Keyword')" v-model="objData.title">
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objData.status">
                        <option :value="-1"> {{ $i('Status') }}</option>
                        <option :value="1">{{ $i('Active') }}</option>
                        <option :value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <input class="btn btn-info" type="button" :value="$i('Search')" v-on:click="getList(1)"/>
                    <button class="btn btn-primary" @click="redirect(0)">{{ $i('Add') }}</button>
                </div>
            </div>
            <div class="overflow-auto">
                <table class="table table-bordered tip__post">
                    <thead>
                    <tr>
                        <th class="width-60 text-center"> {{ $i('Index') }}</th>
                        <th class="width-100 text-center">{{ $i('Avatar') }}</th>
                        <th class="width-250">{{ $i('Title') }}</th>
                        <th> {{ $i('Sapo') }}</th>
                        <th class="width-250"> {{ $i('Description') }}</th>
                        <th class="width-120 text-center"> {{ $i('Action') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="tipPostList" v-for="(v) in tipPostList" :key="`${v.id}`">
                        <td class="text-center">{{ v.rowNum }}</td>
                        <td><img width="100" :src="v.avatar" :alt="v.title"></td>
                        <td class="wigth_400 td-nowrap" :title="v.title"><div class="display_inline">{{v.title}}</div></td>
                        <td class="wigth_400 td-nowrap"><p class="sapo"  :title="v.sapo"><div class="display_inline"  :title="v.sapo">{{v.sapo}}</div></p></td>
                        <td class="wigth_400 td-nowrap"><div class="display_inline" :title="v.description">{{v.description}}</div></td>
                        <td class="btn-action clearfix">
                            <div class="btn__tippost">
                                <button @click="changeStatus(v)" class="btn btn-danger" v-if="v.status == 1">
                                    <i class="fas fa-times"></i>
                                </button>
                                <button @click="changeStatus(v)" class="btn btn-primary" v-else>
                                    <i class="fa fas fa-check"></i>
                                </button>
                            </div>
                            <div class="btn__tippost">
                                <button :title="$i('Edit')" class="btn btn-info" v-on:click="redirect(v.id)">
                                    <i class="fa fas fa-edit"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="tipPostCount" :pageIndex="objData.pageIndex" :pageSize="objData.pageSize" @change="pageChange"/>
    </wrapper>
</template>
<script>
    import EditTipPost from './edit'
    import {mapActions, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                objData: {
                    title: '',
                    pageSize: 10,
                    pageIndex: 1,
                    status: 1,
                },
                tipPostId: 0
            }
        },
        components: {
            EditTipPost,
        },
        computed: {
            ...mapGetters(['tipPostList', 'tipPostCount'])
        },
        methods: {
            ...mapActions(['getListTipPost', 'updateTipPost']),
            getList(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objData.pageIndex = index;
                }
                this.getListTipPost(this.objData)
                    .then(() => {
                        loading.hide();
                    })
                    .catch(err => {
                        loading.hide();
                        this.$error(err.message);
                    })
            },
            redirect(id) {
                this.tipPostId = id || 0;
                if (this.tipPostId) {
                    return this.$router.push('/tippost/edit/' + this.tipPostId);
                }
                return this.$router.push('/tippost/add');
            },
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getList();
            },
            changeStatus(value) {
                this.$confirm(this.$i('DoYouWantChangeStatus')).then(() => {
                    value.status = value.status == '1' ? '0' : '1';
                    this.updateTipPost(value).then(() => {
                        this.$message(this.$i('Successful'));
                    }).catch(err => {
                        this.$error(err.message);
                    })
                });
            },
        },
        created() {
            this.getList();
        }
    }
</script>
<style scoped>
    .sapo {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>