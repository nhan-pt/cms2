<template>
    <div>
        <div class="page-title-box"></div>
        <div class="card m-b-20">
            <h4 class="card-header font-16 mt-0"><b class="pt-2 float-left">{{$i('ZoneManagement')}}</b>
            <button type="button" class="btn btn-primary float-right has-text" @click="openPopup()"><i class="fa fa-plus-circle"></i>{{$i('AddNew')}}</button></h4>
            <div class="card-body">
                <ul>
                    <zone-item class="zone-item-root" :model="zone" v-for="zone in listZone" :key="zone.id" v-on:editZone="openPopup">
                    </zone-item>
                </ul>
            </div>
            <div class="card-footer text-muted" v-if="listZone">{{listZone.length}} danh mục</div>
        </div>
        <modal v-if="popupAdd" @close="popupAdd=false" :title="zoneDetail.info.id > 0?'Sửa thông tin danh mục':'Thêm danh mục mới'">
            <form slot="body" v-if="zoneDetail">
                <div class="form-group">
                    <label>Loại danh mục</label>
                    <select v-model="zoneDetail.info.typeName" class="form-control">
                        <option disabled value="">Chọn loại danh mục</option>
                        <option value="NEWS">Tin tức</option>
                        <option value="CAREERS">Tuyển dụng</option>
                        <option value="PERSONNEL">Nhân sự</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>{{$i('ParentZone')}}</label>
                    <tree-select :options="listZone" :value="zoneDetail.info.parentId" v-model="zoneDetail.info.parentId" />
                </div>
                <div class="form-group" v-for="lang in appSettings.languages">
                    <label>Tên {{lang.viName}}</label>
                    <input type="text" v-model="zoneByLangs[lang.code]" class="form-control" />
                </div>
                <div class="form-group">
                    <label>Thứ tự</label>
                    <input type="text" v-model="zoneDetail.info.priority" class="form-control" />
                </div>
                <div class="form-group">
                    <label>Trạng thái</label>
                    <select v-model="zoneDetail.info.status" class="form-control">
                        <option value="1">Hiển thị</option>
                        <option value="0">Không hiển thị</option>
                    </select>
                </div>
            </form>
            <div slot="footer">
                <span class="btn btn-primary has-text" @click="save()">
                    <i class="fa fa-save"></i>{{$i("Save")}}
                </span>
            </div>
        </modal>
    </div>
</template>
<style scoped>
    .card-body > ul { padding-left: 0; }
</style>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import zoneItem from './zone-item';
    import treeSelect from '../_common/tree-select';
    export default {
        name: 'zone',
        components: {
            zoneItem,
            treeSelect
        },
        data() {
            return {
                popupAdd: false,
                newTree: {},
                zoneDetail: {
                    info: {
                        id: 0,
                        typeName: 'NEWS',
                        status: 1,
                        parentId: 0
                    }
                },
                zoneByLangs: {},
                listZone: null
            }
        },
        methods: {
            openPopup(id) {
                this.zoneDetail.id = id || 0;
                this.popupAdd = true;
                if (this.zoneDetail.id > 0)
                    this.getDetail();
                else {
                    this.zoneDetail = {
                        info: {
                            id: 0,
                            typeName: 'NEWS',
                            status: 1,
                            parentId: 0
                        }
                    };
                    this.zoneByLangs = {};
                }
            },
            closePopup() {
                this.popupAdd = false;
            },
            getList() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'zone',
                        fn: 'get_list_with_tree'
                    }
                }).then((response) => {
                    loading.hide();
                    if (response.success) {
                        this.listZone = response.data;
                    }
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            getDetail() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'zone',
                        fn: 'get_by_id',
                        id: this.zoneDetail.id
                    }
                }).then((response) => {
                    if (response.success) {
                        this.zoneDetail = response.data;
                        this._.each(this.zoneDetail.zoneByLangs, (o) => {
                            this.zoneByLangs[o.languageCode] = o.name;
                        });
                    }
                    loading.hide();
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            save() {
                var me = this;
                let loading = this.$loading.show();
                let zoneLangs = [];
                Object.keys(this.zoneByLangs).forEach((key) => {
                    zoneLangs.push({
                        languageCode: key,
                        name: this.zoneByLangs[key]
                    });
                });
                this.zoneDetail.zoneByLangs = zoneLangs;
                this.$http({
                    data: {
                        m: 'zone',
                        fn: 'update',
                        data: JSON.stringify(this.zoneDetail)
                    }
                }).then((res) => {
                    loading.hide();
                    this.closePopup();
                    this.$message(this.$i("Successful"));
                    me.getList();
                }).catch(err => {
                    return this.$message(err.message, 'error');
                    loading.hide();
                });
            },
            remove(id) {
                this.$confirm('Xóa danh mục này?').then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'zone',
                            fn: 'update_status',
                            id: id
                        }
                    }).then((response) => {
                        if (response.success) {
                            loading.hide();
                            this.getList();
                        }
                        loading.hide();
                    }).catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
                });
            }
        },
        created() {
            this.getList();
        }
    }

</script>