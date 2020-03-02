<template>
    <div>
        <div class="row">
            <div class="col-sm-12">
                <div class="page-title-box">
                    <h4 class="page-title">{{$i('CommentManagement')}}</h4>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-5">
                <div class="card m-b-20">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row" id="form-search">
                                    <div class="col-sm-12">
                                        <div class="row">
                                            <div class="col-md-10"><p class="dscmemnt">{{$i('SearchByAudio')}}</p></div>
                                            <div class="col-md-2"><button title="Tải lại trang" class="btn btn-secondary" style="float: right" @click="refreshpage()"><i class="fa fa-retweet" aria-hidden="true"></i></button></div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row" id="form-search">
                                    <div class="col-sm-12">
                                        <input class="form-control" :placeholder="$i('Keyword')" v-model="objData.keyword" />
                                    </div>
                                </div>
                                <table class="table table-striped mb-10">
                                    <thead>
                                        <tr>
                                            <th>{{$i('Audio')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in listData" :key="'user'+item.id" @click="activate(item.id)" :class="{ active : postCommentId == item.id }">
                                            <td @click="showComment(item.id)" style="cursor:pointer; padding:5px 10px!important">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <p class="post-title">{{item.title}}</p>
                                                    </div>
                                                </div>
                                                <div class="row member-author">
                                                    <div class="col-sm-7">
                                                        <avatar class="float-left" :username="item.fullName" :src="item.avatarSquare" :size="40" /><span>{{item.fullName}} </span>
                                                    </div>
                                                    <div class="col-sm-5 text-right">
                                                        <i>{{item.createdDate | moment("DD/MM/YYYY HH:mm")}}</i>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <pager :total="totalRow" :pageIndex="objData.pageIndex" :pageSize="objData.pageSize" @change="pageChange" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-7">
                <div class="card m-b-20">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row" id="form-search">
                                    <div class="col-sm-12">
                                        <p class="dscmemnt">{{$i('CommentList')}}</p>
                                    </div>
                                </div>
                                <Comment :postIdComment="postCommentId"></Comment>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    import Comment from './comment.vue'
    export default {
        name: 'comment-index',
        components: {
            Comment
        },
        data() {
            var me = this;
            return {
                popupResetPass: false,
                resetMemberName: '',
                passReset: '',
                objData: {
                    keyword: '',
                    status: 1,
                    isShow: 1,
                    pageIndex: 1,
                    pageSize: 10
                },
                listData: [],
                totalRow: 0,
                timeDelay: null,
                postCommentId: 0,
                userName: '',
                role: 0
            }
        },
        computed: {
            // rowNum() {
            //     return (this.objData.pageIndex - 1) * this.objData.pageSize;
            // },
            ...mapGetters(['postList', 'postCount'])
        },
        watch: {
            //Search theo keyword
            'objData.keyword'(val) {
                clearTimeout(this.timeDelay);
                this.timeDelay = setTimeout(() => {
                    this.$set(this.objData, 'pageIndex', 1);
                    this.$set(this.objData, 'keyword', val);
                    this.getlistData();
                }, 500)
            }
        },
        methods: {
            ...mapActions(['getListPost', 'isPostPublish']),
            showComment(postID) {
                this.postCommentId = postID || 0;
            },
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getlistData();
            },
            refreshpage() {
                this.postCommentId = 0;
            },
            activate(id) {
                this.active_el = id;
            },
            getlistData() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        url: '/cms/post/search',
                        ...this.objData
                    }
                }).then((response) => {
                    loading.hide();
                    this.listData = response.data;
                    this.totalRow = response.totalRow;
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
        },
        created() {
            this.getlistData();
        },
    };
</script>
<style type="text/css">
    .dscmemnt { font-weight: 600; font-size: 18px; margin-bottom: 0; text-align: left; }
    .comment-section { list-style: none; max-width: 800px; width: 100%; margin: -22px auto; padding: 10px; }
    .comment { display: flex; border-radius: 3px; margin-bottom: 0; flex-wrap: wrap; }
        .comment.user-comment { color: #dadada; }
        .comment .info { width: 29%; }
            .comment .info a { /* User name */ display: block; text-decoration: none; color: #656c71; font-weight: bold; text-overflow: ellipsis; /*overflow: hidden;*/ white-space: nowrap; /*padding: 10px 0 3px 0;*/ }
            .comment .info span { /* Time */ font-size: 11px; color: #9ca7af; }
        /* The user avatar */
        .comment .avatar { width: 8%; }
        .comment.user-comment .avatar { padding: 0 18px 0 3px; }
    .active { background: #99c3e8 !important; color: white; }
    .comment .avatar img { display: block; border-radius: 50%; }
    .comment.user-comment .avatar img { float: right; }
    /* The comment text */
    .comment p { line-height: 1.5; padding: 18px 22px; width: 50%; position: relative; word-wrap: break-word; }

    .comment.user-comment p { background-color: rgb(38, 125, 128); color: #ffffff; width: 100%; /* margin: 5px; */ padding: 5px 10px; border-top-right-radius: 10px; border-top-left-radius: 10px; border-bottom-right-radius: 10px; }
    .write-new { margin: 80px auto 0; width: 50%; }

        .write-new textarea { color: #444; font: inherit; outline: 0; border-radius: 3px; border: 1px solid #cecece; background-color: #fefefe; box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.06); overflow: auto; width: 100%; min-height: 80px; padding: 15px 20px; }

        .write-new img { border-radius: 50%; margin-top: 15px; }

        .write-new button { float: right; background-color: #729bbb; box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.12); border-radius: 2px; border: 0; color: #ffffff; font-weight: bold; cursor: pointer; padding: 10px 25px; margin-top: 18px; }
    /* Responsive styles */

    @media (max-width: 800px) {
        .comment p { width: 100%; }
        .comment.user-comment .info { order: 3; text-align: left; }

        .comment.user-comment .avatar { order: 2; }

        .comment.user-comment p { order: 1; }
        .comment-section { margin-top: 10px; }
        .comment .info { width: auto; }
            .comment .info a { padding-top: 15px; }
        .comment.user-comment .avatar { padding: 15px 10px 0 18px; width: auto; }

        .comment.user-comment p:after { width: 12px; height: 12px; top: initial; left: 28px; bottom: -6px; }

        .write-new { width: 100%; }
    }
    .post-title{font-weight:bold; margin-bottom:8px!important;}
    .member-author span{ line-height: 40px; margin-left: 10px; font-size: 13px;}
    .member-author i{line-height:40px; font-size:13px;}
</style>