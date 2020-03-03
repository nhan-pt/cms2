import CONSTANTS from '../../core/utils/constants';
import { getCookie, setCookie } from '../../core/utils/index';
export const setLang = ({ commit }, payload) => {
    if (typeof (window) !== 'undefined')
        setCookie(CONSTANTS.LANG, payload, 30);
    commit("SET_LANG", payload);
}