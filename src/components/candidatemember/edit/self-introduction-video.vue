<template>
  <div id="tab-candidate-5" class="tab-pane fade  active show">
    <div class="content-introduction-video">
    </div>
    <div class="group-basicInfo-candidate border-frame border-top__ha">
      <div class="group-workDesires__ha group-introduction-video">
        <div class="content-introduction-video">
          <el-upload class="avatar-uploader avatar-img" id="upload-one"
                     :style="'width:400px; height: 200px;'"
                     name="files"
                     :action="uploadAction"
                     :show-file-list="false"
                     :before-upload="beforeUploadVideo"
                     :on-success="handleOnUploadSuccess"
                     :on-remove="handleRemove"
                     :on-progress="uploadVideoProcess"
                     :headers="token">
            <video v-if="objData.video && !videoFlag" class="avatar-upload video-avatar" controls="controls">
              <source :src="objData.video" type="video/mp4">
              <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                >
                <i class="el-icon-delete"></i>
              </span>
            </video>
            <el-progress v-if="videoFlag == true"
                         type="circle"
                         :percentage="videoUploadPercent"
                         style="margin-top:30px;"></el-progress>
            <i v-else-if="!objData.video && !videoFlag"
               class="el-icon-plus avatar-uploader-icon fix-video"></i>
            
          </el-upload>
        </div>
      </div>
    </div>
    <div class="group-btn-footer__ha">
      <div class="list-btn__ha">
        <div class="item-btn">
          <a href="javascript:;" class="text-links btn-back" @click="previousTab"> {{$i('back')}} </a>
        </div>
        <div class="item-btn">
          <a href="javascript:;" class="text-links btn-confirm" @click="nextTab"> {{$i('Confirm')}}</a>
        </div>
        <div class="item-btn">
          <a href="javascript:;" @click="$router.push('/candidatemember')" class="text-links btn-cancels"> {{$i('Cancel')}} </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import config from '../../../../config';
    export default {
        name: "self-introduction-video",
        props: ['value'],
        data() {
            return {
                objData: {},
                videoFlag: false,
                videoUploadPercent:"",
                imageUrl: '',
                token: {secret_key: config.secret_key},
                uploadAction:  config.api.url  + '/upload',
            }
        },
        methods: {
            uploadVideoProcess (event, file, fileList) {
              this.videoUploadPercent = file.percentage.toFixed(0) * 1;
              this.videoFlag = true;
            },
            handleRemove(file, fileList) {
                this.imageUrl = ''
            },
            beforeUploadVideo (file) {
              const isLt20M = file.size / 1024 / 1024 < 20;
              if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/quicktime'].indexOf(file.type) == -1)  { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
                this.$message(this.$i('cms_file_not_video'),'error');
                return false;
              }
              if (!isLt20M) {
                this.$message(this.$i('cms_size_video_bigger_20mb'),'error');
                return false;
              }
            },
            nextTab() {
                this.$emit('nextTab')
            },
            previousTab() {
                this.$emit('previousTab')
            },
            handleOnUploadSuccess(response, file, fileList) {
              this.videoFlag = false;
              if( response.data  && response.data.length){
                this.objData.video = response.data[0]
              }
            },
        },
        mounted() {
            this.objData = this.value || {};
        }
    }
</script>

<style scoped>
  .fix-video {
    font-size: 60px;
    line-height: 190px;
  }
</style>