<template>
    <wrapper :title="$i('PostList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input type="text" :placeholder="$i('Keyword')" v-model="objData.keyword" class="form-control" />
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objData.isShow">
                        <option :value="-1">{{$i('SelectStatus')}}</option>
                        <option :value="1">{{$i('Active')}}</option>
                        <option :value="0">{{$i('DeActived')}}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objData.status">
                        <option :value="-1">{{$i('SelectLiveStatus')}}</option>
                        <option :value="1">{{$i('Live')}}</option>
                        <option :value="2">{{$i('WaitForLive')}}</option>
                        <option :value="3">{{$i('LiveEnd')}}</option>
                        <option :value="4">{{$i('LiveUploadDone')}}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <input class="btn btn-info" type="button" :value="$i('Search')" v-on:click="searchPost(true)" />
                </div>
            </div>
            <div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="width-50">{{$i('Index')}}</th>
                            <th class="width-50">{{$i('Avatar')}}</th>
                            <th>{{$i('Title')}}</th>
                            <!--<th>{{$i('Description')}}</th>-->
                            <th class="text-right">{{$i('Duration')}}</th>
                            <th>{{$i('ViewCount')}}</th>
                            <th>{{$i('MaxViewCount')}}</th>
                            <th>{{$i('CreatedDate')}}</th>
                            <th class="width-150">{{$i('LiveStatus')}}</th>
                            <th class="text-center width-120">{{$i('Action')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(post,index) in postList" :key="`post_${post.id}`" class="post-item-group" v-if="postList">
                            <td>{{index+1 + rowNum}}</td>
                            <td>
                                <div class="post-thumb">
                                    <a href="javascript:;" @click="showDetailPost(post.id)"><avatar :src="post.avatarSquare" :width="50" :username="post.fullName" /></a>
                                </div>
                            </td>
                            <td><a href="javascript:;" @click="showDetailPost(post)">{{post.title}}</a></td>
                            <!--<td>{{post.description}}</td>-->
                            <td align="right">{{formatDuration(post.duration)}}</td>
                            <td align="center">{{post.viewCount}}</td>
                            <td align="center">{{post.maxViewCount}}</td>
                            <td align="center">{{post.createdDate | moment("DD/MM/YYYY HH:mm")}}</td>
                            <td align="center">{{checkStatus(post.status)}}</td>
                            <td class="btn-action">
                                <button :title="$('Remove')" class="btn btn-danger" v-if="post.isShow == 1"
                                        v-on:click="removePost(post.id, index)">
                                    <i class="fas fa-times"></i>
                                </button>
                                <button :title="$('Publish')" class="btn btn-primary" v-on:click="publishPost(post.id, index)"
                                        v-else>
                                    <i class="fa fas fa-check"></i>
                                </button>
                                <button type="button" :title="$('Comment')" class="btn btn-primary waves-effect waves-light"
                                        v-on:click="showCommentPost(post.id)">
                                    <i class="fa fa-comments"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="postCount" :pageIndex="objData.pageIndex" @change="pageChange" />
        <modal v-if="popupComment" :title="$i('CommentManagement')" @close="popupComment=false">
            <div slot="body">
                <commentsPost :postIdComment="postId"></commentsPost>
            </div>
        </modal>
        <modal v-if="popupDetail" :title="$i('PostManagement')" @close="closePopupDetail">
            <div slot="body">
                <editPost :id="post.id"></editPost>
            </div>
            <div slot="footer">
                <button :title="$i('Remove')" class="btn btn-danger" v-if="post.isShow == 1"
                        v-on:click="removePost(post.id)">
                    <i class="fas fa-times"></i>
                </button>
                <button :title="$i('Publish')" class="btn btn-primary" v-on:click="publishPost(post.id)"
                        v-else>
                    <i class="fa fas fa-check"></i>
                </button>
                <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal" @click="closePopupDetail">{{$i('Close')}}</button>
            </div>
        </modal>
    </wrapper>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import commentsPost from '../comment/comment';
    import editPost from './edit';
    import formatD from 'format-duration';
    export default {
        name: 'post-list',
        components: {
            commentsPost, editPost
        },
        data() {
            return {
                objData: {
                    keyword: '',
                    pageIndex: 1,
                    pageSize: 20,
                    postId: 0,
                    isShow: -1,
                    status: -1,
                },
                popupComment: false,
                popupDetail: false,
                post: null
            }
        },
        computed: {
            ...mapGetters(['postList', 'postCount']),
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            }
        },
        watch: {
            // 'objData.keyword' () {
            //     this.searchPost();
            // },
            // 'objData.status'() {
            //     this.searchPost();
            // },
            // 'objData.islive'() {
            //     this.searchPost();
            // },
        },
        methods: {
            ...mapActions(['getListPost', 'isPostPublish']),
            formatDuration(t) {
                return formatD(parseFloat(t)*1000);
            },
            searchPost(click) {
                if (click)
                    this.objData.pageIndex = 1;
                let loading = this.$loading.show();
                this.getListPost(this.objData).then(() => {
                    loading.hide();
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            showCommentPost(id) {
                this.popupComment = true;
                this.postId = id || 0;
            },
            showDetailPost(post) {
                this.popupDetail = true;
                this.post = post;
            },
            closePopupDetail() {
                this.popupDetail = false;
                this.searchPost();
            },
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.searchPost();
            },
            checkStatus(status) {
                if (status === 1) {
                    return this.$i('Live');
                } else if (status === 2) {
                    return this.$i('WaitForLive');
                } else if (status === 3) {
                    return this.$i('LiveEnd');
                } else if (status === 4) {
                    return this.$i('LiveUploadDone');
                } else {
                    return '---';
                }
            },
            removePost(id, index) {
                this.$confirm(this.$i('DoYouWantToHideThisPost')).then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            url: '/cms/post/remove',
                            postId: id,
                        }
                    }).then((response) => {
                        if (response.success) {
                            this.searchPost();
                            if (this.post)
                                this.post.isShow = 0;
                            loading.hide();
                        }
                    }).catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
                });
            },
            publishPost(id, index) {
                this.$confirm(this.$i('DoYouWantToShowThisPost')).then(() => {
                    this.$http({
                        data: {
                            url: '/cms/post/publish',
                            postId: id,
                        }
                    }).then((response) => {
                        if (response.success) {
                            if (this.post)
                                this.post.isShow = 1;
                            this.searchPost();
                        }
                    }).catch(err => {
                        return this.$message(err.message, 'error');
                    });
                });
            }
        },
        created() {
            this.searchPost();
        }
    }
</script>
<style>
    .post-thumb {
        width: 50px;
    }
</style>
<style scoped>

    tr:hover td { background: #f7f7f7; }

    td { padding: 0 10px; }

    h5 { margin: 0; font-size: 16px; font-weight: bold; }

    .post-item-by-lang .btn { float: right; position: absolute; top: 10px; right: 10px; }
    td a { color: #3a5eea }
</style>