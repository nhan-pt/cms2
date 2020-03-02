<template>
    <div>
      <button type="button" @click="dialog = true" class="btn-map">{{$i('cms_map')}}</button>
      <el-dialog class="dialog-map"
                 :title="$i('SelectLocation')"
                 :visible.sync="dialog" width="60%"
                 :close-on-click-modal="false"
      >
        <div class="row display-flex">
        <div style="margin-left:10px">
            <label class="label-name">{{provinceName}}</label>
            <label class="label-name">{{districtName}}</label>
            <label class="label-name">{{townName}}</label>
        </div>
        <!-- <label class="label-name" v-if="townName">{{townName}}</label> -->
          <div class="col-5">
          
            <input type="text" class="form-control" v-model="query" :placeholder="$i('Search')">
          </div>
          <div class="col-1">
            <button class="btn text-white bg-confirm" type="button" @click="getLocationGoogleMap">{{$i('Search')}}</button>
          </div>
          <div class="col-4 text-right">
            <button class="btn text-white bg-save" type="button" @click="confirm">{{$i('Confirm')}}</button>
            <button class="btn text-black" type="button" @click="dialog = false">{{$i('Cancel')}}</button>
          </div>
        </div>
        <div class="form-group mt-3">
          <GoogleMap v-model="data"/>
        </div>
      </el-dialog>
    </div>
</template>
<script>
    const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
    var xhr = new XMLHttpRequest();
    import config from '../../../config'

    export default {
        name: "SelectLocation",
        props: {
            value: {
                type: Number | String
            },
            provinceName : {
                type: Number | String
            },
            districtName : {
                type: Number | String
            },
            townName : {
                type: Number | String
            },
        },
        data() {
            return {
                dialog: false,
                data: {
                    lat: '',
                    lng: ''
                },
                query: ''
            }
        },
        components: {
            GoogleMap: () => import('../_common/googleMap')
        },
        watch: {
            'value': {
                handler: function (value) {
                    this.query = value;
                },
                deep: true,
            },
            'dialog': {
                handler: function (value) {
                    if(value) this.getLocationGoogleMap()
                },
                deep: true,
            },
        },
        methods: {
            confirm() {
                this.$emit('confirm', this.data)
                this.$emit('input', this.query)
                this.dialog = false
            },
            getLocationGoogleMap() {
                if (!this.query) return;
                xhr.open('GET', `${GOOGLE_API}?address=${this.provinceName + this.districtName + this.townName + this.query}&key=AIzaSyD6-oe8iHcuEowYjeB9uGI6LKNb5r3D9z0`, true);
                xhr.send(null);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        this.data = JSON.parse(xhr.responseText).results[0].geometry.location;
                    }
                }
            }
        },
        mounted() {
           this.query = this.value;
        }
    }
</script>