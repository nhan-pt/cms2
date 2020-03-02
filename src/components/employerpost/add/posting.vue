<template>
  <div v-if="objData">
      <div class="container-fluid mb-4">
        <div class="row basic-row">
      <div
        class="col-3  border-right-1">
        <div class="p-20-0 d-flex justify-content-between flex-wrap">
          <div>{{$i('cms_photo')}}</div>
          <p class="required">{{$i('Required')}}</p>
        </div>
      </div>
      <div class="col-9">
        <div class="row p-20-0">
          <div class="col">
            <div class="upload-block min-height-190" :class="{'is-invalid has-danger': $v.employerPostImages2.$dirty && $v.employerPostImages2.$invalid}">
                <Upload :employerPostImages="employerPostImages" @emitImg="getImg"></Upload>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div class="row basic-row">
          <div
            class="col-3 border-right-1">
            <div class="p-20-0 d-flex justify-content-between flex-wrap ">
              <div>{{$i('cms_job_post_posting_period ')}}</div>
              <p class="required">{{$i('Required')}}</p>
            </div>
          </div>
          <div class="col-9">
            <div class="row p-20-0">
              <div class="col-6">
                <label class="text-normal">{{$i('cms_job_post_posting_date')}}</label>
                <div :class="{'is-invalid has-danger': $v.objData.startDate.$dirty && $v.objData.startDate.$invalid}">
                    <el-date-picker
                      v-model="objData.startDate"
                      :picker-options="datePickerStart"
                      type="date"
                      class="width-date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                      :placeholder="$i('cms_job_post_posting_date')">
                    </el-date-picker>
                </div>
              </div>
              <div class="col-6">
                <label class="text-normal">{{$i('cms_job_post_closing_date')}}</label>
                <div :class="{'is-invalid has-danger': $v.objData.endDate.$dirty && $v.objData.endDate.$invalid}">
                    <el-date-picker
                    v-model="objData.endDate"
                    :picker-options="datePickerEnd"
                    type="date"
                    class="width-date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    :placeholder="$i('cms_job_post_closing_date')">
                  </el-date-picker>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row basic-row">
          <div
            class="col-3 d-flex justify-content-between flex-wrap border-right-1">
            <div class="p-20-0">
              <p>{{$i('Status')}}</p>
            </div>
          </div>
          <div class="col-9">
            <div class="row p-20-0">
              <div class="col-6">
                <select class="form-control" v-model="objData.status">
                  <option v-for="item in listStatus"
                          :key="item.status"
                          :value="item.status">
                    {{ $i(item.label) }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="group-btn-footer">
        <div class="list-item-btn" >
          <div class="item-btn">
            <button type="button" class="btn btn-links bg-back" @click="previousTab">{{$i('back')}}
            </button>
          </div>
          <div class="item-btn">
            <button type="button" @click="confirm()" class="btn btn-links bg-confirm">{{$i('Confirm')}}
            </button>
          </div>
          <div class="item-btn">
            <button @click="$router.push('/employerpost')" type="button" class="btn btn-links bg-cancel">{{$i('Cancel')}}
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'
    export default {
        name: "posting",
        props: ['value'],
        validations: {
          objData: {
            endDate: {
              required
            },
            startDate: {
              required
            },
          },
          employerPostImages2: {
            required
          }
        },
        components: {
            Upload: () => import('../../_common/compress-file'),
        },
        data() {
            return {
                checkVali:false,
                objData: {},
                employerPostImages: [],
                employerPostImages2: [],
                datePickerEnd: {
                    disabledDate: this.disabledDueDate
                },
                datePickerStart: {
                    disabledDate: this.disabledDueDateStart
                },
                listStatus: [
                    {
                        status: 1,
                        label: 'Active'
                    },
                    {
                        status: 2,
                        label: 'Inactive'
                    },
                    {
                        status: 4,
                        label: 'Non-posting'
                    },
                ],
                rules: {
                }
            }
        },
        watch: {
            'objData.startDate'(value) {
                if(this.$route.params.id) {
                    setTimeout(() => {
                        let column = this.listStatus.find(e => {
                            return e.status == 1
                        })
                        let index = this.listStatus.indexOf(column)
                        let today = new Date()
                        today.setHours(0,0,0,0)
                        value = new Date(value)
                        if (value.getTime() - today.getTime() > 0) {
                            if (index != -1) this.listStatus.splice(index, 1);
                            this.objData.status = 4
                        } else  {
                            if (index != -1) this.listStatus.splice(index, 1);
                            this.listStatus.unshift({
                                status: 1,
                                label: 'Active'
                            });
                        }
                        if (value.getTime() > new Date(this.objData.endDate).getTime()) this.objData.endDate = null
                    }, 1000);
                }
            },
            'employerPostImages2': {
                handler: function (value) {
                    // transfer data employerPostImages2 to this.objData
                    this.objData.employerPostImages = [...value];
                    this.$emit('input', this.objData)
                },
                deep: true,
            },
        },
        methods: {
            getImg(value) {
                this.employerPostImages2 = value
            },
            confirm() {
              let invalid = this.$v.$invalid;
              if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'),'warning');
                return;
              } else {
                this.$emit('confirmTab')
              }
            },
            previousTab() {
                this.$emit('previousTab')
            },
            disabledDueDate (time) {
              let today = new Date(); 
              today.setHours(0,0,0,0);
              if(this.objData.startDate == null) return time.getTime() < today.getTime()
              return time.getTime() < new Date(this.objData.startDate).getTime()
            },
            disabledDueDateStart (time) {
              let today = new Date(); 
              today.setHours(0,0,0,0); 
              return time.getTime()  < today.getTime()
            },
            
        },
        mounted() {
            this.objData = this.value || {}
            this.employerPostImages = [...this.objData.employerPostImages]
            
  // employerPostImages2 get upload file in component upload
            this.employerPostImages2 = [...this.objData.employerPostImages]
            
            if(!this.$route.params.id) {
                this.objData.status = 2
                this.listStatus = [
                    {
                        status: 2,
                        label: 'Inactive'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>