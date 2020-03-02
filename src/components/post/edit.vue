<template>
    <div class="row" v-if="postDetail">
        <div class="col-lg-12">
            <div class="m-b-20">
                <div>
                    <div class="form-group">
                        <div class="float-left width-70"><avatar :src="postDetail.avatarSquare" :width="50" :username="postDetail.fullName" /></div>
                        <b style="line-height:25px">{{postDetail.fullName}}</b>
                        <p>{{postDetail.createdDate | moment("DD/MM/YYYY HH:mm")}}</p>
                    </div>
                    <div class="form-group">
                        <label>{{$i('Title')}}</label>
                        <input type="text" class="form-control" v-model="postDetail.title" disabled="disabled" />
                    </div>
                    <div class="form-group">
                        <label>{{$i('Description')}}</label>
                        <div><textarea class="form-control" v-model="postDetail.sapo" rows="3" disabled="disabled"></textarea></div>
                    </div>
                    <div class="form-group">
                        <label>{{$i('Audio')}}</label>
                        <div>
                            <flvPlayer ref="fp" v-if="loaded" :mediaDataSource="mediaDataSource" :autoplay="true" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .btn-outline-danger.router-link-active { background-color: #ec536c; border: 1px solid #ec536c; color: #fff; }
    .invalid { border-color: #ec536c; }
</style>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import flvPlayer from '../_common/flvplayer'

    export default {
        name: 'post-edit',
        components: { flvPlayer },
        props: ['id'],
        data() {
            return {
                postDetail: {
                },
                mediaDataSource: {
                },
                loaded: false
            };
        },
        methods: {
            ...mapActions(['getPostDetail']),
        },
        created() {
            if (this.id != 0) {
                let loading = this.$loading.show();
                this.getPostDetail({
                    id: this.id
                }).then((data) => {
                    if (data) {
                        this.postDetail = data;
                        if (this.postDetail.status == 1) {
                            this.postDetail.path = this.postDetail.path.replace('?sign', '.flv?sign');
                        }
                        this.mediaDataSource = {
                            type: data.status == 1 ? 'flv' : 'mp4',
                            url: data.path,
                            isLive: data.status == 1,
                        }
                    }
                    this.loaded = true;
                    loading.hide();
                }).catch((e) => {
                    loading.hide();
                });
            } else {
                this.body = this.postDetail.body;
                this.loaded = true;
            }
        }
    }
</script>