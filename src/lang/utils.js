import config from '../lang/config.json';
import { getCookie } from '../core/utils/index';
import CONSTANTS from '../core/utils/constants';
import app from '../main';
export function getLang() {
    let defaultLang = process.env.LANG;
    if (!defaultLang) {
        if (typeof (app.window) !== 'undefined')
            defaultLang = app.window.lang || getCookie(CONSTANTS.LANG);
        if (!defaultLang)
            defaultLang = config.def;
    }
    return defaultLang;
}