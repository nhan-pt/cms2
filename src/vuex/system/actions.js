import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';



export const initLanguage = ({commit, getters}) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url:`/language/get-list-language-static?languageCode=${getters.currentLanguage}`
            },
            method:'get'
        }).then(response => {
            commit("INIT_LANGUAGE", response.data);
            return resolve(response.data);
        }).catch(err => {
            commit("INIT_LANGUAGE", null);
            return reject(err);
        });
    })
}

export const initSystem = ({ commit }) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'system',
                fn: 'init'
            }
        }).then(response => {
            commit("INIT_SYSTEM", response.data);
            return resolve(response.data);
        }).catch(err => {
            commit("INIT_SYSTEM", null);
            return reject(err);
        });
    })
}