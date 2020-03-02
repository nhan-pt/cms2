<template>
    <wrapper :title="$i('TagList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input class="form-control" :placeholder="$i('Keyword')" v-model="objData.name">
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objData.status">
                        <option :value="-1"> {{ $i('Status') }} </option>
                        <option :value="1">{{ $i('Active') }}</option>
                        <option :value="0">{{ $i('DeActived') }}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <input class="btn btn-info" type="button" :value="$i('Search')" v-on:click="searchData" />
                    <button class="btn btn-primary" @click="openPopup(0)">{{ $i('Add') }}</button>
                </div>
            </div>
            <div>
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="width-100 text-center"> {{ $i('Index') }} </th>
                        <th>{{ $i('Tag') }}</th>
                        <th class="text-center"> {{ $i('Action') }} </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(tag, index) in tagList" :key="`tag_${tag.id}`" class="post-item-group" v-if="tagList">
                        <td class="text-center">{{ tag.rowNum }}</td>
                        <td>{{tag.name}}</td>
                        <td class="btn-action width-160">
                            <button @click="changeStatus(tag)" class="btn btn-danger" v-if="tag.status == 1">
                                <i class="fas fa-times"></i>
                            </button>
                            <button @click="changeStatus(tag)" class="btn btn-primary" v-else>
                                <i class="fa fas fa-check"></i>
                            </button>
                            <button class="btn btn-info" v-on:click="openPopup(tag.id)">
                                <i class="fa fas fa-edit"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="tagCount" :pageIndex="objData.pageIndex" :pageSize="objData.pageSize" @change="pageChange" />
        <modal v-if="popupEditTag" :title="this.tagId > 0 ? $i('UpdateTag') : $i('AddTag')" @close="closePopUp()">
            <div slot="body">
                <EditTag :tagId="tagId" v-on:closePopup="closePopUp()"></EditTag>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import EditTag from './edit';
    export default {
        name: 'tag-list',
        components: {
            EditTag
        },
        data() {
            return {
                objData: {
                    name: '',
                    pageSize: 10,
                    pageIndex: 1,
                    status: 1,
                    postId: 0,
                },
                tagId: 0,
                popupEditTag: false
            }
        },
        computed: {
            ...mapGetters(['tagList', 'tagCount']),
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            }
        },
        methods: {
            ...mapActions(['getListTag', 'updateTag']),
            searchData() {
                let loading = this.$loading.show();
                this.getListTag(this.objData).then(() => {
                    loading.hide();
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            changeStatus(value) {
                this.$confirm(this.$i('DoYouWantChangeStatus')).then(() => {
                    value.status = value.status == '1' ? '0' : '1';
                    this.updateTag(value).then(() => {
                        this.$message(this.$i('Successful'));
                    }).catch(err => {
                        this.$error(err.message);
                    }).finally(() => {
                        this.searchData();
                    })
                });
            },
            closePopUp(){
                this.popupEditTag = false;
                this.searchData();
            },
            openPopup(Id) {
                this.popupEditTag = true;
                this.tagId = Id || 0;
            },
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.searchData();
            },
        },
        created() {
            this.searchData();
        }
    }
</script>