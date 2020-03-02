import Vue from 'vue';


Vue.mixin({
    methods: {
        $i(key) {

            if (this.currentLanguage) {
                if (this.appSettings && this.appSettings.staticTexts) {
                    return this.appSettings.staticTexts[key] || key;
                }
            }
            return key;
        }
    }
});