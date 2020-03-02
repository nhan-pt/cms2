<template>
    <wrapper :title="$i('ContactList')" sapo="">
        <div class="dn-content-left">
            <div class="row" id="form-search">
                <div class="col-sm-2">
                    <input type="text" v-model="objDataSearch.searchKey" :placeholder="$i('Keyword')"
                           class="form-control"/>
                </div>
                <div class="col-sm-2">
                    <select class="form-control" v-model="objDataSearch.status">
                        <option :value="-1">{{$i('SelectStatus')}}</option>
                        <option v-for="v in listStatus" :value="v.id" :key="v.id">{{ $i(v.status) }}</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <input class="btn btn-info" type="button" v-on:click="getData(1)" :value="$i('Search')"/>
                </div>
            </div>
            <div class="overflow-auto">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th class="width-100">{{$i('Index')}}</th>
                        <th>{{$i('Email')}}</th>
                        <th>{{$i('Content')}}</th>
                        <th>{{$i('Subject')}}</th>
                        <th>{{$i('Status')}}</th>
                    </tr>
                    </thead>
                    <tbody v-if="listContact">
                    <tr v-for="(v, index) in listContact" class="post-item-group">
                        <td>{{ rowNum + index }}</td>
                        <td>
                            <a href="javascript:;" @click="openPopup(v.id)" class="text-primary">{{ v.email }}</a>
                        </td>
                        <td  class="wigth_400 td-nowrap" :title="v.content"><div class="display_inline">{{v.content}}</div></td>
                        <td class="wigth_400 td-nowrap" :title="v.subject"><div class="display_inline">{{v.subject}}</div></td>
                        <td>
                            <span class="badge"
                                  :class="checkStatus(v.status).class">{{checkStatus(v.status).status}}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <pager :total="contactCount" :pageIndex="objDataSearch.pageIndex" :pageSize="objDataSearch.pageSize"
               @change="pageChange"/>
        <modal v-if="popupEditContact" :title="$i(this.titleModal)"
               @close="popupEditContact = false">
            <div slot="body">
                <editContact :contactId="this.contactId"
                             :listStatus="listStatus"
                             v-on:closePopup="closePopup()"></editContact>
            </div>
        </modal>
    </wrapper>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import editContact from './edit';

    export default {
        components: {
            'editContact': editContact,
        },
        data() {
            return {
                objDataSearch: {
                    id: -1,
                    searchKey: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 10,
                },
                titleModal: '',
                popupEditContact: false,
                contactId: 0,
                listStatus: [
                    {id: 0, status: 'Deleted', class: 'badge-danger'},
                    {id: 1, status: 'Received', class: 'badge-primary'},
                    {id: 2, status: 'Checked', class: 'badge-success'},
                    {id: 3, status: 'Answered', class: 'badge-info'}
                ]
            }
        },
        computed: {
            ...mapGetters(['listContact', 'contactCount']),
            rowNum() {
                return (this.objDataSearch.pageIndex - 1) * this.objDataSearch.pageSize + 1;
            }
        },
        methods: {
            ...mapActions(['getListContact', 'updateContact']),
            getData(index) {
                let loading = this.$loading.show();
                if (index) {
                    this.objDataSearch.pageIndex = index;
                }
                this.getListContact(this.objDataSearch).then(() => {
                    loading.hide();
                }).catch(error => {
                    loading.hide();
                    return this.$message(error.message, 'error');
                })
            },
            pageChange(pageNum) {
                this.$set(this.objDataSearch, 'pageIndex', pageNum);
                this.getData();
            },
            closePopup() {
                this.popupEditContact = false;
                this.getData();
            },
            openPopup(id) {
                this.titleModal = 'TitleEditContact';
                this.popupEditContact = true;
                this.contactId = id;
            },
            checkStatus(item) {
                return this.listStatus.filter(i => i.id == item)[0];
            }
        },
        created() {
            this.getData();
        }
    };
</script>