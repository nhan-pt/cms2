<template>
    <datetime v-model="date" :type="type" input-class="form-control" :phrases="phrases" :auto="true" class="input-group">
        <div class="input-group-append" slot="after"><span class="input-group-text"><i class="mdi mdi-calendar"></i></span></div>
    </datetime>
</template>
<script>
    import 'vue-datetime/dist/vue-datetime.css';
    import { Datetime } from 'vue-datetime';

    export default {
        name: 'datetimepicker',
        components: {
            datetime: Datetime
        },
        props: {
            type: {
                type: String,
                default: 'datetime'
            },
            value: {
                default: null
            },

        },
        data() {
            return {
                date: this.value,
                phrases: { ok: 'Ok', cancel: 'Cancel' }
            }
        },
        watch: {
            date(val) {
                if (val) {
                    this.$emit('input', val);
                }
            }
        },
        created() {
            this.date = this.value;
        }
    }
</script>