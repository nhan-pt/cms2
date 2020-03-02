<template>
  <el-select filterable remote clearable reserve-keyword
             :remote-method="remoteMethod" @focus.once="getData"
             :placeholder="placeholder" :loading="loading" v-model="data" v-if="list" @change="onchange">
    <el-option v-for="(v, k) in list"
               :key="'remote' + v.id"
               :value="v.id"
               :label="v[label]"></el-option>
  </el-select>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number | String
            },
            defaultValue: {
                type: Number | String | Array | Object
            },
            method: {
                type: Function
            },
            keyword: {
                type: String,
                default: 'name'
            },
            code: {
                type: String,
                default: 'id'
            },
            label: {
                type: String,
                default: 'name'
            },
            placeholder: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                data: '',
                thatKey: '',
                thatCode: '',
                thatLabel: '',
                objData: {
                    pageSize: 10,
                    pageIndex: 1,
                },
                list: [],
                loading: false,
            }
        },
        methods: {
            getData() {
                this.loading = true;
                this.method(this.objData)
                    .then(res => {
                        this.list = res.data
                    })
                    .catch(err => {
                        this.$error(err.message);
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            },
            remoteMethod(query) {
                if (!query) return;
                clearTimeout(this.timeDelay);
                
                this.timeDelay = setTimeout(() => {
                    this.objData[this.keyword] = query;
                    this.getData();
                }, 500);
            },
            onchange(res) {
                return this.$emit('input', res);
            }
        },
        mounted() {
            if (this.value) {
                this.data = this.value;
                this.getData();
            }
            if (this.defaultValue) {
                let data = {};
                data[this.code] = this.value;
                data[this.label] = this.defaultValue;
                this.list = [data];
            }
            this.objData[this.keyword] = '';
        }
    }
</script>
