<template>
  <div v-if="objData">
      <div class="container-fluid mb-4">
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_recruitment_type')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 row">
            <div class="col-6">
              <select class="form-control" v-model="objData.jobModelId">
                <option value=null> {{$i('Select')}} </option>
                <option v-for="v in jobModel" :key="'model' +  v.id" :value="v.id">{{v.name}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('JobType')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 row">
            <div class="col-6">
              <select class="form-control" v-model="objData.jobTypeId">
                <option value=null> {{$i('Select')}} </option>
                <option v-for="v in jobType" :key="'model' +  v.id" :value="v.id">{{v.name}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_required_applicant_jp')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 row">
            <div class="col-6">
              <select class="form-control" v-model="objData.japaneseCertificationId">
                <option value=null> {{$i('Select')}} </option>
                <option v-for="v in japaneseCertification" :key="v.id" :value="v.id">{{v.name}}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 border-right-1">
          <div class="p-20-0 d-flex justify-content-between flex-wrap ">
            <div>{{$i('cms_recruitment_shift')}}</div>
            <p class="required">{{$i('Required')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <table class="table table-borderless">
              <tbody>
              <tr v-for="(e,i) in objData.shiftJobInPosts" :key="'ship' + i" :class="{'is-invalid has-danger': $v.objData.shiftJobInPosts.$each[i].$dirty && $v.objData.shiftJobInPosts.$each[i].$invalid}">
                <td>
                    <el-select filterable @change="changeShift(i)" remote clearable v-model="e.shiftJobId" :placeholder="$i('cms_recruitment_shift')">
                      <el-option
                        v-for="shiftJob in shiftJob"
                        :key="shiftJob.id"
                        :label="shiftJob.name"
                        :value="shiftJob.id">
                      </el-option>
                    </el-select>
                </td>
                <td>
                    <el-select filterable
                               remote
                               clearable
                               v-model="e.startWorking"
                               :placeholder="$i('Select')"
                               :disabled="!e.shiftJobId">
                      <el-option value=null :label="$i('Select')"></el-option>
                      <el-option
                        v-for="time in e.shiftJobStart"
                        :key="time.id"
                        :label="time.jobTimeValue"
                        :value="time.jobTimeValue">
                      </el-option>
                    </el-select>
                </td>
                <td class="w-15 text-center">{{$i('cms_to')}}</td>
                <td>
                    <el-select filterable
                               remote
                               clearable
                               v-model="e.endWorking"
                               :placeholder="$i('Select')"
                               :disabled="!e.shiftJobId">
                      <el-option value=null :label="$i('Select')"></el-option>
                      <el-option
                        v-for="time in e.shiftJobEnd"
                        :key="time.id"
                        :label="time.jobTimeValue"
                        :value="time.jobTimeValue">
                      </el-option>
                    </el-select>
                </td>
                <td class="w-15 text-right">
                  <div @click="removeShift(i)" class="minus__wrapper">
                    <i class="fas fa-2x fa-minus-circle ml-auto"></i>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="ml-3" >
              <i class="fas fa-2x fa-plus-circle" @click="addShift()"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_applied_days')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div class="row">
              <div class="col-2">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">All
                </el-checkbox>
              </div>
              <div class="col-10 d-flex flex-wrap">
                <el-checkbox-group v-model="postHiringDateIds" @change="handleCheckedDateChange">
                  <el-checkbox v-for="(e,i) in dateWeeks" :label="e.id" :key="i">{{e.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 border-right-1">
          <div class="p-20-0 d-flex justify-content-between flex-wrap ">
            <div>{{$i('cms_working_day')}}</div>
            <p class="required">{{$i('Required')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div class="row" :class="{'is-invalid has-danger': $v.objData.workingDayId.$dirty && $v.objData.workingDayId.$invalid}">
                <el-radio-group v-model="objData.workingDayId">
                  <el-radio class="col-3" v-for="(e,i) in workingDay" :key="i" :label="e.id">{{e.name}}</el-radio>
                </el-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_working_hour_per_day')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div class="row ">
              <div class="col-6 display-flex">
                <input type="number" class="input-1" v-model="objData.workingHourPerDay">
                <div class="ml-20">{{$i('hourOrMore')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 border-right-1">
          <div class="p-20-0 d-flex justify-content-between flex-wrap ">
            <div>{{$i('cms_post_job_salary')}}</div>
            <p class="required">{{$i('Required')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <div class="row mt-2" v-for="(e,i) in listSalaryType" :key="i+e.id">
              <div class="col-3 checkbox-salary" :class="{'is-invalid has-danger': $v.objData.salaryTypeId.$dirty && $v.objData.salaryTypeId.$invalid}">
                <label class="">
                  <input type="radio" name="paymentType" :value="e.id" checked="checked" v-model="objData.salaryTypeId">
                  <span class="span-checkbox">{{e.name}}</span>
                </label>
              </div>
              <div class="col-4 display-flex" :class="{'is-invalid has-danger': $v.objData.salary.$dirty && $v.objData.salary.$invalid}">
                <money
                  :disabled="(!objData.salaryTypeId||(objData.salaryTypeId && objData.salaryTypeId != e.id)) ? true : false"
                  class="input-1 w-100 salary-input"
                  :class="(!objData.salaryTypeId||(objData.salaryTypeId && objData.salaryTypeId != e.id)) ? 'disable-salary': '' "
                   name="salary"
                  v-model="objData.salary"
                  v-bind="money">
                </money>
              </div>
              <div class="ml-20 align-content-center">{{$i('yenOrMore')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_post_job_payment_method')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 px-3">
            <div class="row">
              <div class="col-3" v-for="(e,i) in paymentMethod" :key="i">
                <label class="text-normal list-radio">
                  <input type="radio" name="paymentMethodId" :value="e.id" checked="checked"
                         v-model="objData.paymentMethodId">{{e.name}}
                  <span class="radio-btn"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('cms_transportation_expense')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 px-3">
            <div class="row">
              <div class="col-3">
                <label class="text-normal list-radio">
                  <input type="radio" name="moneyForMove" value=1 checked="checked" v-model="checkTrans">{{$i('no')}}
                  <span class="radio-btn"></span>
                </label>
              </div>
              <div class="col-3">
                <label class="text-normal list-radio">
                  <input type="radio" name="moneyForMove" value=2 checked="checked" v-model="checkTrans">{{$i('yes')}}
                  <span class="radio-btn"></span>
                </label>
              </div>
              <div class="col-6">
                <div class="display-flex">
                  <money :disabled="checkTrans==1 ? true: false" class="input-1" v-model="objData.moneyForMove"
                         v-bind="money"></money>
                  <div class="ml-20">{{$i('cms_maximum_yen')}}</div>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('web_benefits_and_benefits')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0">
            <el-select v-model="regimeIds" multiple
                       :placeholder="$i('Select')">
              <el-option
                v-for="objData in regime"
                :key="objData.id"
                :label="objData.name"
                :value="objData.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row  basic-row">
        <div
          class="col-3 d-flex justify-content-between flex-wrap border-right-1">
          <div class="p-20-0">
            <p>{{$i('Tag')}}</p>
          </div>
        </div>
        <div class="col-9">
          <div class="p-20-0 d-flex justify-content-between">
            <el-select v-model="tagIds" multiple
                       :placeholder="$i('Select')"
            >
              <el-option
                v-for="item in tag"
                :key="'tag' + item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
          <button type="button" class="btn btn-links bg-next" @click="nextTab">{{$i('cms_next')}}
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
    import {mapActions, mapGetters} from 'vuex'
    import {Money} from 'v-money';
    import {
      required,
      minLength,
      minValue,
      between
    } from 'vuelidate/lib/validators'
    export default {
        name: "hiring-condition",
        props: ['value'],
        validations: {
          objData: {
            workingDayId: {
              required
            },
            salaryTypeId: {
              required
            },
            salary: {
              required,
              between: between(1, 10000000)
            },
            shiftJobInPosts: {
              minLength: minLength(1),
              required,
              $each: {
                shiftJobId:{
                  required
                },
                startWorking: {
                  required
                },
                endWorking: {
                  required
                },
              }
            },
          }
        },
        components: {Money},
        data() {
            return {
                checkVali:false,
                postHiringDateIds: [],
                tagIds: [],
                regimeIds: [],
                checkTrans: 1,
                objData: {},
                objDataCds: {
                    pageIndex: 1,
                    pageSize: 999
                },
                listShiftJobTimeStart: [],
                regimeValue: [],
                listShiftJobTimeEnd: [],
                listTag: [],
                listDateWeek: [],
                listPayment: [],
                isIndeterminate: true,
                listSalaryType: [],
                checkAll: false,
                money: {
                    decimal: ',',
                    thousands: '.',
                    precision: 0,
                    masked: false
                },

            }
        },
        computed: {
            ...mapGetters(['shiftJobStart','shiftJobEnd', 'shiftJob', 'workingDay', 'dateWeeks', 'tag' ,'paymentMethod', 'regime', 'jobModel', 'salaryType', 'japaneseCertification', 'jobType', 'listJapaneseCertification', 'listShiftJob', 'listWorkingDay', 'listJobModel', 'listJobType']),
        },
        watch: {
            'checkTrans'(value) {
                if (value == 1) this.objData.moneyForMove = 0
            },
            'postHiringDateIds': {
                handler: function (value) {
                    this.objData.postHiringDateIds = [...value];
                    this.$emit('input', this.objData)
                },
                deep: true,
            },
            'tagIds': {
                handler: function (value) {
                    this.objData.tagIds = [...value];
                    this.$emit('input', this.objData)
                },
                deep: true,
            },
            'regimeIds': {
                handler: function (value) {
                    this.objData.regimeIds = [...value];
                    this.$emit('input', this.objData)
                },
                deep: true,
            }
        },
        methods: {
            changeShift(value) {
                let data = this.objData.shiftJobInPosts[value]
                data.shiftJobStart = this.shiftJobStart.filter(e => e.shiftJobId == data.shiftJobId)
                data.shiftJobEnd = this.shiftJobEnd.filter(e => e.shiftJobId == data.shiftJobId)
            },
            confirm() {
              let invalid = this.$v.$invalid;
              console.log(invalid)
              if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'),'warning');
                return;
              } else {
                this.$emit('confirmTab')
              }
            },
            nextTab() {
              let invalid = this.$v.$invalid;
              if (invalid) {
                this.$v.$touch();
                this.$message(this.$i('cms_job_post_enter_required_fields'),'warning');
                return;
              } else {
                this.$emit('nextTab')
              }
            },
            previousTab() {
                this.$emit('previousTab')
            },
            handleCheckedDateChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.dateWeeks.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.listDateWeek.length;
            },
            handleCheckAllChange(val) {
                this.postHiringDateIds = val ? this.dateWeeks.map(e => e.id) : [];
                
                this.isIndeterminate = false;
            },
            getDataSalary() {
                if (!this.objData.listSalary) {
                    this.listSalaryType = [...this.salaryType]
                    this.listSalaryType.map(e => {
                        e.salary = 0
                        if(this.objData.salaryTypeId == e.id) e.salary = this.objData.salary
                    })
                    this.objData.listSalary = this.listSalaryType
                } else
                    this.listSalaryType = this.objData.listSalary
            },
            addShift() {
                this.objData.shiftJobInPosts.push({
                    shiftJobId: null,
                    startWorking: null,
                    endWorking: null,
                    shiftJobStart : [...this.shiftJobStart],
                    shiftJobEnd : [...this.shiftJobEnd]
                })
            },
            removeShift(index) {
                this.objData.shiftJobInPosts.splice(index, 1);
            },
            getData() {
                this.objData.shiftJobInPosts.map(e => {
                    if(e.shiftJobId) {
                        e.shiftJobStart = this.shiftJobStart.filter(i => i.shiftJobId == e.shiftJobId)
                        e.shiftJobEnd = this.shiftJobEnd.filter(i => i.shiftJobId == e.shiftJobId)
                    }
                })
                this.getDataSalary()
            },
        },
        mounted() {
            this.objData = this.value || {};
            this.postHiringDateIds = this.objData.postHiringDateIds;
            this.tagIds = this.objData.tagIds;
            this.regimeIds = this.objData.regimeIds;
            if (this.objData.moneyForMove && (this.objData.moneyForMove > 0)) this.checkTrans = 2
            this.getData();

        }
    }
</script>

<style scoped>
  .el-select {
    width: 100%;
  }
  
  .table td, .table th {
    border: none !important;
  }
  
  .el-checkbox {
    margin-right: 20px;
  }
  .erorr-text {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    left: 0;
    margin-left: 20px;
  }
  .span-checkbox {
    position: relative;
    padding-left: 27px;
  }
  .span-checkbox::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 17px;
    width: 17px;
    background-color: #eee;
    border-radius: 50%;
    border: 1px solid transparent;
  }
   .span-checkbox::before {
    content: '';
    position: absolute;
    top: 3.5px;
    left: 3.5px;
    height: 9px;
    width: 9px;
    background-color: #f89e1f;
    display: none;
    border-radius: 50%;
  }
  .checkbox-salary input {
    display: none;
  }
  .checkbox-salary input[type="radio"]:checked + span::before {
    display: block
  }
  .checkbox-salary input[type="radio"]:checked + span::after {
    background: transparent;
    border: 1px solid #6e6e6e;
  }
  .disable-salary {
    color: rgb(235, 235, 228) !important;
  }
  .has-danger .salary-input {
    border: 1px solid #e81f1a;
  }
  label {
    font-weight: normal !important;
  }
</style>