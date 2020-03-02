import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { getLang } from '../lang/utils';

Vue.use(VueI18n);


const i18n = new VueI18n({
    locale: getLang(),
    fallbackLocale: process.env.LANG ,
    missing: (locale, key, vm) => {
        console.log('%cmissing locale:', "color: red", locale, key);
    }
});

export default i18n;