import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';
import * as app from '../../main.js';
console.log(app);

let appSettings = null;
if (typeof (app.window) !== 'undefined') {
    appSettings = app.window.appSettings;
}
const store = {
    state: {
        appSettings: appSettings
    },
    mutations: {
        UPDATE_APP_SETTINGS: (state, payload) => {
            state.appSettings = payload;
        }
    },
    actions,
    getters: {
        appSettings: state => state.appSettings
    }
};

export default store;