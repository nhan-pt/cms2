<template>
  <div id="tab-candidate-2" class="tab-pane fade active show">
    <div class="group-basicInfo-candidate border-frame border-top__ha">
      <div class="group-workDesires__ha">
        <div class="list-workDesires__ha">
          <div class="item-workDesires__ha">
            <div class="row">
              <el-checkbox-group v-model="objData.regime">
                <el-checkbox class="col-md-3 col-6" v-for="(e,i) in listRegime" :label="e.id" :key="e.id + i">{{e.name}}</el-checkbox>
              </el-checkbox-group>
<!--              <div class="col-md-3 col-6" v-for="(e,i) in listRegime" :key="e.id + i" v-model="objData">-->
<!--                <label class="">{{e.name}}-->
<!--                  <input type="checkbox" :checked="e.status == 'active' ? true:false ">-->
<!--                  <span class="checkmark"></span>-->
<!--                </label>-->
<!--              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="group-btn-footer__ha">
      <div class="list-btn__ha">
        <div class="item-btn">
          <a href="javascript:;" class="text-links btn-back" @click="previousTab"> {{$i('back')}} </a>
        </div>
        <div class="item-btn">
          <a href="javascript:;" class="text-links btn-confirm" @click="confirm"> {{$i('Confirm')}} </a>
        </div>
        <div class="item-btn">
          <a href="javascript:;" class="text-links btn-next" @click="nextTab"> {{$i('cms_next')}} </a>
        </div>
        <div class="item-btn">
          <a href="javascript:;" @click="$router.push('/candidatemember')" class="text-links btn-cancels"> {{$i('Cancel')}} </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters,} from 'vuex'
    export default {
        name: "work-desires",
        props: ['value'],
        data() {
            return {
                listRegime: [],
                objData: []
            }
        },
        computed: {
            ...mapGetters(['regime']),
        },
        methods: {
            nextTab() {
                this.$emit('nextTab')
            },
            previousTab() {
                this.$emit('previousTab')
            },
            confirm() {
                this.$emit('confirmTab')
            },
        },
        mounted() {
            this.listRegime = [...this.regime];
            this.objData = this.value || []
        }
    }
</script>

<style scoped>

</style>