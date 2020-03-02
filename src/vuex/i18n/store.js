import * as actions from './actions'
import _ from 'lodash';
//import { app } from '../../app';

const store = {
    mutations: {
        // SET_LANG: (state, payload) => {
        //     app.$i18n.locale = payload
        // }
    },
    actions,
    getters: {
        // locale() {
        //     return app.$i18n.locale;
        // }
    }
};

export default store;