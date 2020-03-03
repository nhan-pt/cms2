<template>
  <div id="tab-candidate-3" class="tab-pane fade active show">
    <div class="group-basicInfo-candidate border-frame border-top__ha" v-if="objData.candidateLanguage">
      <div class="total-education">
        <div class="group-row">
          <div class="row">
            <div class="col-12">
              <div class="heading-3 text-bold p-15">{{$i('LanguageLevel')}}</div>
            </div>
          </div>
        </div>
        <div class="group-row">
          <div class="row">
            <div class="col-3 border-right__ha">
              <div class="content-candidate-left p-15">
                <div class="name-title"> {{$i('native_language')}}</div>
              </div>
            </div>
            <div class="col-9">
              <div class="content-candidate-right p-y-15">
                <div class="box-row rule">
                  <div class="row w-100">
                    <div class="col-4">
                      <div class="texts w-100">
                        <el-select
                          v-model="objData.candidateLanguage.memberLanguageId"
                          :placeholder="$i('Select')"
                        >
                          <el-option
                            v-for="(v,i) in memberLanguage"
                            :key="v.id"
                            :label="v.name"
                            :value="v.id">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="group-row">
          <div class="row">
            <div class="col-3 border-right__ha">
              <div class="content-candidate-left p-15">
                <div class="name-title">{{$i('japanese_level')}}</div>
              </div>
            </div>
            <div class="col-9">
              <div class="content-candidate-right p-y-15">
                <div class="box-row rule">
                  <div class="row w-100">
                    <div class="col-4">
                      <div class="texts w-100">
                        <el-select class="group-select__ha"
                                   clearable
                                   v-model="objData.candidateLanguage.japaneseCertificationId"
                                   :placeholder="$i('Select')"
                        >
                          <el-option
                            v-for="jp in japaneseCertification"
                            :key="jp.id"
                            :label="jp.name"
                            :value="jp.id">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="group-row">
          <div class="row">
            <div class="col-3 border-right__ha">
              <div class="content-candidate-left p-15">
                <div class="name-title">{{$i('cms_english_level')}}</div>
              </div>
            </div>
            <div class="col-9">
              <div class="content-candidate-right p-y-15">
                <div class="box-row rule">
                  <div class="row w-100">
                    <div class="col-4">
                      <div class="texts w-100">
                        <el-select
                          v-model="objData.candidateLanguage.languageLevelId"
                          :placeholder="$i('Select')"
                        >
                          <el-option
                            v-for="(v,i) in languageLevel"
                            :key="v.id"
                            :label="v.name"
                            :value="v.id">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="group-row">
          <div class="row">
            <div class="col-3 border-right__ha">
              <div class="content-candidate-left p-15">
                <div class="name-title">{{$i('other_language')}}</div>
              </div>
            </div>
            <div class="col-9">
              <div class="content-candidate-right p-y-15">
                <div class="box-row rule">
                  <div class="texts w-100">
                    <el-select
                      v-model="objData.candidateLanguage.otherLanguage"
                      :placeholder="$i('Select')"
                      multiple
                    >
                      <el-option
                        v-for="(v,i) in memberLanguage"
                        :key="v.id"
                        :label="v.name"
                        :value="v.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="total-education">
        <div class="group-row">
          <div class="row">
            <div class="col-12">
              <div class="heading-3 text-bold p-15">{{$i('cms_academic_records')}}</div>
            </div>
          </div>
        </div>
        <div class="group-row" v-for="(e,i) in objData.learningHistorys" :key="i">
          <div class="row">
            <div class="col-3 border-right__ha">
              <div class="content-candidate-left p-15">
                <div class="name-title">
                  <el-select
                    v-model="e.learningCategoryId"
                    :placeholder="$i('Select')"
                    @change="getTitleLearningHistorys(i)"
                  >
                    <el-option
                      v-for="v in learningCategory"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="col-9">
              <div class="content-candidate-right p-y-15">
                <div class="d-flex align-items-center w-100 mb-3">
                  <div class="title-text mr-3 w-200px"> {{$i('cms_school_name')}} :
                  </div>
                  <div class="value-title w-100">
                    <input type="text"
                           class="input-text__ha"
                           v-model="e.name">
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="d-flex align-items-center w-100">
                      <div class="title-text mr-3 w-200px"> {{$i('cms_enroll')}} :
                      </div>
                      <div class="value-title w-100">
                        <el-date-picker
                          v-model="e.startDate"
                          type="date"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                          class="width-date"
                          :placeholder="$i('cms_enroll')">
                        </el-date-picker>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="d-flex align-items-center w-100">
                      <div class="title-text mr-3 w-200px">
                        {{$i('cms_graduate')}} :
                      </div>
                      <div class="value-title w-100">
                        <el-date-picker
                          v-model="e.endDate"
                          type="date"
                          class="width-date"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                          :placeholder="$i('cms_graduate')">
                        </el-date-picker>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <div @click="removeLearningHistorys(i)" class="minus__wrapper ">
                      <i class="fas fa-2x fa-minus-circle"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="group-row ">
          <div class="row">
            <div class="col-3 border-right__ha"></div>
            <div class="col-9">
              <div class="my-3">
                <i class="fas fa-2x fa-plus-circle" @click="addLearningHistorys()"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="total-education">
        <div class="group-row">
          <div class="row">
            <div class="col-12">
              <div class="heading-3 text-bold p-15">{{$i('cms_work_records')}}</div>
            </div>
          </div>
        </div>
        <div class="group-row" v-for="(e,i) in objData.workingHistorys" :key="i">
          <div class="row">
            <div class="col-3 border-right__ha">
              <div class="content-candidate-left p-15">
                <div class="name-title">
                  <el-select
                    v-model="e.workingCategoryId"
                    :placeholder="$i('Select')"
                    @change="getTitleWorkingHistorys(i)"
                  >
                    <el-option
                      v-for="v in workingCategory"
                      :key="v.id"
                      :label="v.name"
                      :value="v.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="col-9">
              <div class="content-candidate-right p-y-15">
                <div class="d-flex align-items-center w-100 mb-3">
                  <div class="title-text mr-3 w-200px"> {{$i('cms_name_working')}} :
                  </div>
                  <div class="value-title w-100">
                    <input type="text"
                               class="input-text__ha"
                               v-model="e.name">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <div class="d-flex align-items-center w-100">
                      <div class="title-text mr-3 w-200px">  {{$i('start_time')}} :
                      </div>
                      <div class="value-title w-100">
                        <el-date-picker
                          v-model="e.startDate"
                          type="date"
                          class="width-date"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                          :placeholder="$i('start_time')">
                        </el-date-picker>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="d-flex align-items-center w-100">
                      <div class="title-text mr-3 w-200px">
                        {{$i('end_time')}} :
                      </div>
                      <div class="value-title w-100">
                        <el-date-picker
                          v-model="e.endDate"
                          type="date"
                          class="width-date"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                          :placeholder="$i('end_time')">
                        </el-date-picker>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <div @click="removeWorkingHistorys(i)" class="minus__wrapper">
                      <i class="fas fa-2x fa-minus-circle"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="group-row ">
          <div class="row">
            <div class="col-3 border-right__ha"></div>
            <div class="col-9">
              <div class="my-3">
                <i class="fas fa-2x fa-plus-circle" @click="addWorkingHistorys()"></i>
              </div>
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
          <a href="javascript:;" @click="$router.push('/candidatemember')" class="text-links btn-cancels">
            {{$i('Cancel')}} </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  export default {
    name: "education",
    props: ['value'],
    data() {
      return {
        objData: {},
      }
    },
    computed: {
      ...mapGetters(['workingCategory', 'learningCategory', 'japaneseCertification', 'memberLanguage', 'languageLevel'])
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
      addLearningHistorys() {
        this.objData.learningHistorys.push({
          learningCategoryId: null,
          title: '',
          name: '',
          startDate: null,
          endDate: null,
        })
      },
      getTitleLearningHistorys(index) {
        this.objData.learningHistorys[index].title = this.learningCategory.find(e => this.objData.learningHistorys[index].learningCategoryId == e.id).name
      },
      getTitleWorkingHistorys(index) {
        this.objData.workingHistorys[index].title = this.workingCategory.find(e => this.objData.workingHistorys[index].workingCategoryId == e.id).name
      },
      removeLearningHistorys(index) {
        this.objData.learningHistorys.splice(index, 1);
      },
      addWorkingHistorys() {
        this.objData.workingHistorys.push({
          workingCategoryId: null,
          title: '',
          name: '',
          startDate: null,
          endDate: null,
        })
      },
      removeWorkingHistorys(index) {
        this.objData.workingHistorys.splice(index, 1);
      }
    },
    mounted() {
      this.objData = this.value || {};
    }
  }
</script>

<style scoped>

</style>