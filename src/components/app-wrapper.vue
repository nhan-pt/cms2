<template>
    <div id="app-entry" v-if="done">
        <router-view></router-view>
    </div>
</template>
<script>

    import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'app-wrapper',
        data() {
            return { done: false }
        },
        computed: {
            ...mapGetters(['system'])
        },
        methods: {
            ...mapActions(['initSystem', 'updateAppSettings', 'initLanguage', 'getAllResource']),
            async initAll(){
                
                // this.$loading.show().hide();
                const languageKey = await this.initLanguage();
                this.tempSettings.staticTexts = languageKey;
                const response = await this.initSystem();
                
                var configResult = {};
                for (var i = 0; i < this.system.configs.length; i++) {
                    configResult[this.system.configs[i].configKey] = this.system.configs[i].configValue;
                }
                this.tempSettings = Object.assign(this.tempSettings, configResult);
                
                this.tempSettings.languages = this.system.configs.languages;
                
                this.done = true;
                
            },
            async allResource() {
                this.getAllResource().then(() => {
                })
                  .catch(err => {
                      this.$error(err.message);
                  })
            }
        },
        created() {
            // this.$loading.show();
            console.log(this.window);
            this.tempSettings = this.window;
            this.initAll();
            this.allResource();
            this.updateAppSettings(this.tempSettings);

        }
        
    }
</script>