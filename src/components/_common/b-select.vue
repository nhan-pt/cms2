<template>
    <div>
        <input class="form-control" :placeholder="placeholder" v-model="data" @focus="isShow = true" @blur="onBlur">
        <transition name="fade">
            <div v-if="value && isShow" class="dropdown">
                <div v-for="v in dropList" :key="v.id" class="p-2 dropdown-item" v-text="v[field]" @click="select(v)"></div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "b-select",
        props: {
            placeholder: {
                type: String
            },
            value: {
                type: String,
                default: null,
            },
            dropList: {
                type: Array,
                default: null
            },
            field: {
                type: String,
            }
        },
        data() {
            return {
                isShow: false,
            }
        },
        computed: {
            data: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        },
        methods: {
            select(e) {
                this.data = e[this.field];
                this.isShow = false;
                this.$emit('select', e.id);
            },
            onBlur() {
                this.isShow = false;
                if (!this.data) {
                    return this.$emit('select', null);
                }
            }
        }
    }
</script>

<style scoped>
    .dropdown {
        position: absolute;
        border: 1px solid #3eb7ba;
        -webkit-box-shadow: none;
        box-shadow: none;
        margin-top: 4px;
        border-radius: .25rem;
        z-index: 999;
    }

    .dropdown .dropdown-item {
        cursor: pointer;
    }
</style>