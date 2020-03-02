import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const updateAppSettings = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        commit("UPDATE_APP_SETTINGS", payload);
        return resolve(payload);
    })
}