<template>
	<section v-if="totalRow > 0">
		<div class="row" id="form-search">
	      <div class="col-sm-8">
	        <input class="form-control" :placeholder="$i('Keyword')" v-model="objData.keyword">
	      </div>
	      <div class="col-sm-4">
	        <select class="form-control" v-model="objData.status">
	          <option :value="-1">{{$i('Status')}}</option>
	          <option :value="1" >{{$i('Active')}}</option>
              <option :value="0">{{$i('DeActived')}}</option>
	        </select>
	      </div>
	    </div>
        <div>
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>{{$i('Member')}}</th>
                    <th>{{$i('Content')}}</th>
                    <th>{{$i('CreatedDate')}}</th>
                    <th class="text-center">{{$i('Action')}}</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(comment, index) in listData" :key="`comment_${comment.id}`">
                        <td>
                            <avatar class="float-left" :username="comment.fullName" :src="comment.avatarSquare" :size="40" />
                            <span>{{comment.fullName}}</span>
                        </td>
                        <td>{{comment.content}}</td>
                        <td>{{comment.createdDate | moment("DD/MM/YYYY HH:mm")}}</td>
                        <td style="text-align: center;">
                            <button :title="$i('Remove')" class="btn btn-danger" v-if="comment.status == 1"
                                v-on:click="removeComment(comment.id, index)"><i class="fa fa fa-trash"></i></button>
                            <button :title="$i('Active')" class="btn btn-primary" v-if="comment.status == 0"
                                v-on:click="publishComment(comment.id, index)"><i class="fa fa fa-check"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pager :total="totalRow" :pageIndex="objData.pageIndex" :pageSize="objData.pageSize" @change="pageChange"/>
        </div>
    </section>
    <div v-else>{{$i('NoData')}}</div>
</template>
<script type="text/javascript">
// console.log(postId);
//props dung để truyền dữ liệu từ cah sang con va cac component con truyền dữ liệu lại cho cha thông qua các sự kiện
import {mapActions, mapGetters} from 'vuex'
	export default{
		name: 'comment',
		props: ['postIdComment'],
		data: function() {
			return {
				objData: {
					postId: 0,
                    keyword: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 20
                },
				listData: [],
				totalRow:0,
			}
		},
		computed: {
             rowNum() {
                 return (this.objData.pageIndex - 1) * this.objData.pageSize;
             },
            // ...mapGetters(['commentList', 'commentCount'])
        },
		watch:{
			'postIdComment'(){
                this.objData.pageIndex = 1;
				this.getlistData();
			},
			'objData.keyword'(val){
					clearTimeout(this.timeDelay);
			      	this.timeDelay = setTimeout(() => {
			        this.$set(this.objData, "pageIndex", 1);
			        this.$set(this.objData, "keyword", val);
                    this.$set(this.objData, 'status', 1);
			        this.getlistDataAll();
			      }, 500);
			},
			"objData.status"(val) {
		      this.$set(this.objData, "pageIndex", 1);
		      this.$set(this.objData, "status", val);
		      this.getlistDataAll();
		    }
		},
		methods:{
			pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getlistData();
            },
            removeComment(commentId, index) {
                this.$confirm('Bạn chắc muốn xóa bình luận này?').then(() => {
                    this.$http({
                        data: {
                            url: '/cms/comment/remove',
                            id: commentId,
                        }
                    }).then((response) => {
                        if (response.success) {                       
                            this.listData[index].status = 0;
                        }
                    }).catch(err => {
                        return this.$message(err.message, 'error');
                    });
                });
            },
            publishComment(commentId, index) {
                this.$confirm('Bạn chắc muốn xuất bản bình luận này?').then(() => {
                    this.$http({
                        data: {
                            url: '/cms/comment/publish',
                            id: commentId,
                        }
                    }).then((response) => {
                        if (response.success) {
                            this.listData[index].status = 1;
                        }
                    }).catch(err => {
                        return this.$message(err.message, 'error');
                    });
                });
            },
			getlistData() {
                let loading = this.$loading.show();
                this.objData.postId = this.postIdComment;
                this.$http({
                    data: {
                        url:'cms/comment/search',
                        ...this.objData
                    }
                }).then((response) => {
                    loading.hide();
                    this.listData = response.data;
                    this.totalRow = response.totalRow;                   
                    // this.totalRow = response.totalRow;
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            getlistDataAll() {
		      let loading = this.$loading.show();
		      this.$http({
		        data: {
		           url:'cms/comment/search',
                        ...this.objData
		        }
		      })
		        .then(response => {
		          loading.hide();
		          this.listData = response.data;
		          this.totalRow = response.totalRow;
		        })
		        .catch(err => {
		          loading.hide();
		          return this.$message(err.message, "error");
		        });
		    },

		},
		created() {
            this.getlistData();
            this.getlistDataAll();
        },
	};
</script>
<style scoped>
    td span { line-height: 40px; padding-left: 5px; }
</style>