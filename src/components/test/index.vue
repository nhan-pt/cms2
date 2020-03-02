<template>
    <div>
        <div class="row">
            <div class="col-sm-12">
                <div class="page-title-box">
                    <h4 class="page-title">Test page</h4>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="card m-b-30">
                    <div class="card-body">
                        <h4 class="mt-0 header-title">File manager</h4>
                        <p class="text-muted m-b-30">
                            Demo sử dụng filemanager
                        </p>
                        <div class="button-items">
                            <button type="button" class="btn btn-primary waves-effect waves-light" @click="showFileManager=true">Mở quản lý file</button>
                            <div>{{selectedFiles}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card m-b-30">
                    <div class="card-body">
                        <h4 class="mt-0 header-title">Modal</h4>
                        <p class="text-muted m-b-30">
                            Demo sử dụng modal
                        </p>
                        <div class="button-items">
                            <button type="button" class="btn btn-primary waves-effect waves-light" @click="showModal1=true">Mặc định</button>
                            <button type="button" class="btn btn-secondary waves-effect" @click="showModal2=true">Tùy chỉnh các vùng</button>
                            <button type="button" class="btn btn-success waves-effect waves-light" @click="showModal3=true">Ẩn footer</button>
                            <button type="button" class="btn btn-info waves-effect waves-light" @click="showModal4=true">Footer nhiều nút xem sao</button>
                            <button type="button" class="btn btn-warning waves-effect waves-light" @click="showModal5=true">Modal large</button>
                            <button type="button" class="btn btn-danger waves-effect waves-light" @click="showModal6=true">Modal huge</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card m-b-30">
                    <div class="card-body">
                        <h4 class="mt-0 header-title">Pager</h4>
                        <p class="text-muted m-b-30">
                            Demo sử dụng pager phân trang
                        </p>
                        <div>
                            <pager :total="300" :pageIndex="pageIndex" @change="pageChange" />
                        </div>
                        <p>
                            Không có next back
                        </p>
                        <p>
                            <pager :total="300" :pageIndex="pageIndex" @change="pageChange" :showNextPrev="false" />
                        </p>
                        <p>
                            Không có số
                        </p>
                        <p>
                            <pager :total="300" :pageIndex="pageIndex" @change="pageChange" :showNumber="false" />
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card m-b-30">
                    <div class="card-body">
                        <h4 class="mt-0 header-title">Datetimepicker</h4>
                        <p class="text-muted m-b-30">
                            Demo sử dụng datetimepicker
                        </p>
                        <div>
                            <div class="form-group">
                                <label>Date + Time</label>
                                <datetimepicker />
                            </div>
                            <div class="form-group">
                                <label>Date only</label>
                                <datetimepicker type="date" />
                            </div>
                            <div class="form-group">
                                <label>Time only</label>
                                <datetimepicker type="time" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card m-b-30">
                    <div class="card-body">
                        <h4 class="mt-0 header-title">Editor</h4>
                        <p class="text-muted m-b-30">
                            Demo sử dụng editor
                            <b><code>&lt;editor id="editor2" :height="300" /&gt;</code></b>
                        </p>
                        <div>
                            <editor id="editor2" :height="300" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card m-b-30">
                    <div class="card-body">
                        <h4 class="mt-0 header-title">Language Label</h4>
                        <p class="text-muted m-b-30">
                            Demo sử dụng language label (Chuyển từ language code thành name)
                            <b><code>&lt;language-label code="vi-VN" /&gt;</code></b>
                        </p>
                        <div>
                            <language-label code="vi-VN" /> <language-label code="en-US" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <file-manager v-if="showFileManager" @close="showFileManager=false" v-on:insert="processData" />

        <modal v-if="showModal1" @close="showModal1=false"></modal>

        <modal v-if="showModal2" @close="showModal2=false" title="có custom title">
            <div slot="body">có slot body</div>
            <div slot="footer">có slot footer</div>
        </modal>

        <modal v-if="showModal3" @close="showModal3=false" :footer="false" title="Không có footer">
            <div slot="body">
                <p>Để thuộc tính <code>:footer="false"</code> để ẩn footer!</p>
            </div>
            <div slot="footer">có slot footer</div>
        </modal>

        <modal v-if="showModal4" @close="showModal4=false" title="Thử phát nhiều nút">
            <div slot="body">Thử thôi, không có gì đâu!</div>
            <div slot="footer">
                <button type="button" class="btn btn-success waves-effect waves-light">Success</button>
                <button type="button" class="btn btn-info waves-effect waves-light">Info</button>
                <button type="button" class="btn btn-warning waves-effect waves-light">Warning</button>
                <button type="button" class="btn btn-danger waves-effect waves-light">Danger</button>
            </div>
        </modal>

        <modal v-if="showModal5" @close="showModal5=false" size="large"></modal>

        <modal v-if="showModal6" @close="showModal6=false" size="huge">
            <div slot="body">
                <p>Nulla quis lorem ut libero malesuada feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit tortor eget felis porttitor volutpat.</p>

                <p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <p>Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.</p>

                <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>
            </div>
        </modal>
    </div>
</template>
<script>
    import editor from '../_common/editor';

    export default {
        name: 'test-index',
        components: { editor },
        data() {
            return {
                showFileManager: false,
                showModal1: false,
                showModal2: false,
                showModal3: false,
                showModal4: false,
                showModal5: false,
                showModal6: false,
                pageIndex: 3,
                selectedFiles: []
            }
        },
        methods: {
            pageChange(val) {
                this.pageIndex = val;
            },
            processData(files) {
                this.selectedFiles = files;
            }
        }
    }
</script>