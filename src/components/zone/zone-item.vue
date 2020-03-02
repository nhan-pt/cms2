<template>
    <li>
        <div :class="{'hide-zone': model.info.status!=1,'zone-item':true}">
            <span class="badge badge-dark">{{model.info.typeName}}</span>
            <span content="Không hiển thị" primary v-if="model.info.status!=1"></span>
            {{getDisplayName(model.zoneByLangs)}}
            <span class="btn btn-secondary" icon="edit" @click="$emit('editZone',model.info.id)">Sửa</span>
        </div>
        <ul v-show="open" v-if="isFolder">
            <zone-item class="zone-item-child"
                       v-for="(model, index) in model.children"
                       :key="index"
                       :model="model" v-on:editZone="editZone">
            </zone-item>
        </ul>
    </li>
</template>
<style scoped>
    ul { padding-left: 50px; }
    li { list-style-type: none; }
    .zone-action { cursor: pointer; }
</style>
<style>
    .zone-item { padding: 10px; margin-bottom: 10px; line-height: 38px; background: #f1f1f1; color: #333; font-size: 16px; border: 1px solid #e8e8e8; }
        .zone-item:hover { background: #f7f7f7; }
        .zone-item span.btn { float: right; }
    .hide-zone { opacity: 0.5; }
</style>
<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'zone-item',
        props: {
            model: Object
        },
        data() {
            return {
                open: true
            }
        },
        computed: {
            isFolder: function () {
                return this.model.children && this.model.children.length;
            }
        },
        methods: {
            editZone(id) {
                this.$emit('editZone', id);
            },
            toggle: function () {
                if (this.isFolder) {
                    this.open = !this.open
                }
            },
            getDisplayName(zoneByLangs) {
                let lang = [];
                this._.each(zoneByLangs, (o) => {
                    lang.push(o.name);
                });
                return lang.join(' / ');
            }
        }
    }
</script>
