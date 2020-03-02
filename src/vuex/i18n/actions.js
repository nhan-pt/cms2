import CONSTANTS from '../../core/utils/constants';
import { getCookie, setCookie } from '../../core/utils/index';
import * as app from '../../main.js';
console.log(app);

export const setLang = ({ commit }, payload) => {
    if (typeof (app.window) !== 'undefined')
        setCookie(CONSTANTS.LANG, payload, 30);
    commit("SET_LANG", payload);
}