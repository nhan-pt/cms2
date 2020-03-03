import Vue from 'vue';
//import { Tabs } from 'bootstrap-vue/es/components'
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2Filters from 'vue2-filters';
import lodash from 'lodash';
import VueLodash from 'vue-lodash';
import { sync } from 'vuex-router-sync';
import VueScrollTo from 'vue-scrollto';
import VueMoment from 'vue-moment';
import VueCookie from 'vue-cookie';
import store from './vuex/index';
import router from './router';
import debugMixin from './core/mixins/debug';
import appSettings from './core/mixins/appSettings';
import alert from './core/plugins/alert';
import http from './core/plugins/http';
import upload from './core/plugins/upload';
import Entry from './components/entry.vue';
import Avatar from './components/_common/avatar.vue';
import Price from './components/_common/price.vue';
import Photo from './components/_common/photo.vue';
import Pager from './components/_common/pager.vue';
import FileManager from './components/_common/file-manager/index.vue';
import ViewMore from './components/_common/viewmore.vue';
import DropDown from './components/_common/dropdown.vue';
import Modal from './components/_common/modal.vue';
import Wrapper from './components/_common/wrapper.vue';
import DateTimePicker from './components/_common/datetimepicker.vue';
// import { Datetime } from 'vue-datetime';
import ZoneSelect from './components/_common/zone-select';
import LanguageLabel from './components/_common/language-label';
import StatusLabel from './components/_common/status-label';
import TinyMce from './components/_common/tiny-mce.vue';
import routerLinkI18n from './components/_common/router-link-i18n.vue';
import CommonMixins from './core/mixins/common';
import formatPrice from './core/mixins/formatPrice';
import CurrentInfo from './core/mixins/currentInfo';
import CONSTANTS from './core/mixins/constants';
import lang from './core/mixins/lang';
import multiLanguage from './core/mixins/multiLanguage';
import checkPermission from './core/mixins/checkPermission';
import metaInfo from "./core/mixins/metaInfo";
import uploadImage from "./core/mixins/uploadImage";
import { VueEditor, Quill } from 'vue2-editor'
import Notifications from 'vue-notification';
import draggable from 'vuedraggable';
import VeeValidate from 'vee-validate';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
require('./assets/main.css')


Vue.use(VeeValidate);

VeeValidate.Validator.extend('validation_rule', {
    validate(value, [args]) {
        return Number(value) !== -1 && value !== '' && value != null && value != 'null'
    }
})

//config element ui
import { Progress, Radio, RadioGroup, Form, FormItem, Input, Upload, Select, Option, Dialog, CheckboxGroup, Checkbox, DatePicker, TimePicker, TimeSelect } from 'element-ui';
import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/radio-group.css';
import 'element-ui/lib/theme-chalk/radio.css';
import 'element-ui/lib/theme-chalk/checkbox.css';
import 'element-ui/lib/theme-chalk/checkbox-group.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/date-picker.css';
import 'element-ui/lib/theme-chalk/form-item.css';
import 'element-ui/lib/theme-chalk/form.css';
import 'element-ui/lib/theme-chalk/input.css';
import langEl from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css';
locale.use(langEl);

import EleUploadVideo from 'vue-ele-upload-video'
//

var Loading = null;
import 'vue-loading-overlay/dist/vue-loading.min.css';
// import 'vue-datetime/dist/vue-datetime.css';
// if (typeof (window) !== 'undefined') {
     Loading = require('vue-loading-overlay');
// }
// add google map

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD6-oe8iHcuEowYjeB9uGI6LKNb5r3D9z0',
        libraries: "places"
    }
});


Vue.mixin(metaInfo);
//Vue.use(Tabs);
Vue.use(BootstrapVue);
Vue.use(Loading);
Vue.use(VueCookie);
//Vue.use(formatPrice);
Vue.use(Vue2Filters);
Vue.use(VueLodash, lodash);
Vue.use(VueScrollTo);
//Vue.use(CommonMixins);
Vue.use(VueMoment);
Vue.use(draggable);
//Vue.use(CurrentInfo);
//Vue.use(multiLanguage);
//Vue.use(checkPermission);
Vue.filter('twoDigits', (value) => {
    if (value.toString().length <= 1) {
        return '0' + value.toString()
    }
    return value.toString()
});

Vue.use(Notifications);
Vue.component('el-upload', Upload);
Vue.component('el-progress', Progress);
Vue.component('el-upload', Upload);
Vue.component('el-upload-video', EleUploadVideo);
Vue.component('el-form', Form);
Vue.component('el-form-item', FormItem);
Vue.component('el-radio-group', RadioGroup);
Vue.component('el-time-picker', TimePicker);
Vue.component('el-time-select', TimeSelect);
Vue.component('el-radio', Radio);
Vue.component('el-input', Input);
Vue.component('el-select', Select);
Vue.component('el-option', Option);
Vue.component('el-dialog', Dialog);
Vue.component('el-checkbox-group', CheckboxGroup);
Vue.component('el-checkbox', Checkbox);
Vue.component('tiny-mce', TinyMce);
Vue.component('avatar', Avatar);
Vue.component('photo', Photo);
Vue.component('price', Price);
Vue.component('dropdown', DropDown);
Vue.component('file-manager', FileManager);
Vue.component('el-date-picker', DatePicker);
// Vue.component('datetime', Datetime);
Vue.component('viewmore', ViewMore);
Vue.component('modal', Modal);
Vue.component('wrapper', Wrapper);
Vue.component('pager', Pager);
Vue.component('router-link-i18n', routerLinkI18n);
Vue.component('zone-select', ZoneSelect);
Vue.component('language-label', LanguageLabel);
Vue.component('status-label', StatusLabel);
Vue.component('draggable', draggable);
Vue.filter('trimFloat', function (value) {
    if (!value) return 0;
    return Math.round(value * 100) / 100;
});

Vue.directive('loading', {
    update: (el, binding) => {
        if (binding.value === true) {
            el.classList.add("spinner")

        } else {
            el.classList.remove("spinner")

        }
    },
    inserted: el => {
        // console.log(el);
        // el.className = "el-loading-mask"
    }
})
const unsync = sync(store, router);

Vue.prototype.window = {
    appSettings: {
        apiUrl: "https://api-laboro.amela.vn",
        debug: true,
        version: "1.0.0.0",
        mode: "development"
    }
}



const app = new Vue({
    el: '#app',
    router,
    store,
    ...Entry
});

export default app;

