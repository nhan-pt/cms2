<template>
  <div class="content__job-detail__right p-y-15" v-if="data">
    <div class="row mb-3">
        <div class="col-6">
            <div class="group-rule-text">
                <div class="name-title">{{$i('cms_employer_create_zipcode')}}</div>
                <div class="name-value w-100 d-flex align-items-center" :class="{'is-invalid has-danger': $v.data.zipCode.$dirty && $v.data.zipCode.$invalid}">
                    <el-select class="w-100" v-model="data.zipCode" 
                        filterable 
                        clearable
                        :loading="loadZipcode"
                        @input="$v.data.zipCode.$touch()"
                        :disabled="checkDisable"
                        :placeholder="$i('Select')" 
                        :remote-method="remoteZipcode" 
                        remote>
                        <el-option value="-1" :label="$i('Select')"></el-option>
                        <el-option v-for="zc in listZipCode" :key="zc.id" :label="zc.zipCode + ' - ' + zc.districtName + ' - ' + zc.townName" :value="zc.zipCode">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="group-rule-text">
                <div class="name-title">{{$i('cms_employer_create_prefecture')}}</div>
                <div class="name-value w-100" :class="{'is-invalid has-danger': $v.data.provinceId.$dirty && $v.data.provinceId.$invalid}">
                    <el-select 
                        v-model="data.provinceId" 
                        filterable
                        :disabled="checkDisable"
                        :placeholder="$i('Select')" 
                        @input="$v.data.provinceId.$touch()"
                        remote>
                        <el-option value="-1" :label="$i('Select')"></el-option>
                        <el-option v-for="pr in province" :key="pr.id" :label="pr.name" :value="pr.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-6">
            <div class="group-rule-text">
                <div class="name-title">{{$i('cms_employer_create_city')}}</div>
                <div class="name-value w-100" :class="{'is-invalid has-danger': $v.data.districtId.$dirty && $v.data.districtId.$invalid}">
                    <el-select 
                        v-model="data.districtId" 
                        filterable
                        :placeholder="$i('Select')" 
                        :disabled="checkDisable"
                        @input="$v.data.districtId.$touch()"
                        remote>
                        <el-option value="-1" :label="$i('Select')"></el-option>
                        <el-option v-for="dt in listDistrict" :key="dt.id" :label="dt.name" :value="dt.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="group-rule-text">
                <div class="name-title">{{$i('cms_employer_create_town')}}</div>
                <div class="name-value w-100">
                    <el-input type="text" 
                        value="Takada" 
                        :disabled="checkDisable"
                        v-model="data.townName">
                        </el-input>
                </div>

            </div>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-12">
            <div class="group-rule-text">
                <div class="name-title">{{$i('cms_employer_create_detail_address')}}</div>
                <div class="name-value w-100" :class="{'is-invalid has-danger': $v.data.address.$dirty && $v.data.address.$invalid}">
                    <el-input type="text" 
                        class="" value="3 Chome 14-21 Noguchi Bld 2F"
                        :disabled="checkDisable"
                        @input="$v.data.address.$touch()"
                        v-model="data.address">
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
  import {
      mapGetters,
      mapActions
  } from 'vuex'
  import {
    required,
    minLength,
    email
  } from 'vuelidate/lib/validators'
  export default {
    validations: {
      data: {
        zipCode: {
            required
        },
        districtId: {
            required
        },
        provinceId: {
            required
        },
        address: {
            required
        },
      }
    },
    name:'form-address',
    props: {
      value: {
        type: Object
      },
      validate: {
        type: Boolean
      },
      sameAddress: {
        type: Boolean
      }
    },
    data() {
      return {
        data: {},
        loadZipcode: false,
        checkDisable: false,
        listZipCode: [],
        listDistrict: [],
      }
    },
    watch: {
      'validate' (value) {
        if(value) this.checkValidate()
      },
      'sameAddress' (value) {
        this.checkDisable = value
      },
      'data.provinceId'(value) {
        if(value) {
          this.$emit('getStation')
          this.listDistrict = this.district.filter(d => d.provinceId == value)
        }
      },
      'data.zipCode'(value, oldValue) {
        if(oldValue) {
            this.$emit('revertStation')
        }
        if (value == -1 || !value) {
          this.data.districtId = null;
          this.data.provinceId = null;
          this.data.townName = null;
        } else {
          setTimeout(() => {
            this.listZipCode.forEach(e => {
              if (e.zipCode == this.data.zipCode) {
                this.data.districtId = null
                this.data.districtId = e.districtId
                this.data.townName = e.townName
                if(this.data.provinceId == e.provinceId) this.$emit('getStation');
                else this.data.provinceId = e.provinceId
              }
            });
          }, 200);
        }
      },
    },
    computed: {
      ...mapGetters(['province', 'district']),
    },
    methods: {
      ...mapActions(['getListZipCode']),
      checkValidate() {
          let invalid = this.$v.$invalid;
          if (invalid) {
              this.$v.$touch();
              return;
          }
      },
      remoteZipcode(query) {
        setTimeout(() => {
            this.getZipCode(query);
        }, 200);
      },
      getZipCode(code) {
          this.loadZipcode = true
          this.getListZipCode(code).then(res => {
              this.loadZipcode = false
              this.listZipCode = res.data
              let index = 1
              this.listZipCode.map(e => {
                  e.id = index
                  index++
              })
          }).catch(err => {
              this.loadZipcode = false
              return this.$error(err.message);
          })
      },
    },
    mounted() {
      this.data = this.value || {}
      this.checkDisable = this.sameAddress
      this.getZipCode(null)
    } 
  }
</script>  