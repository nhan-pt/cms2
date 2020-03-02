<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group">
                    <label>{{$i('LanguageKey')}}</label>
                    <input type="text" class="form-control"
                           v-model="objData.languageKey"/>
                </div>
                <div class="form-group">
                    <label>{{$i('LanguageDefaultValue')}}</label>
                    <input type="text" class="form-control"
                           v-model="objData.languageDefaultValue"/>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="addLanguageStatic()">
                <span>{{ $i('Add') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        props: ['languageStaticId'],
        data() {
            return {
                objData: {
                    languageKey: '',
                    languageDefaultValue: '',
                },
            }
        },
        computed: {
            ...mapGetters(['detailLanguageStatic']),
        },
        watch: {},
        methods: {
            ...mapActions(['saveAddLanguageStatic']),
            addLanguageStatic() {
                if (!this.objData.languageKey || !this.objData.languageDefaultValue) {
                    return this.$message(this.$i('LabelErrorEmptyName'), 'error');
                }
                this.saveAddLanguageStatic(this.objData).then((response) => {
                    if (response.success) {
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            }
        },
        created() {

        }
    }
</script>