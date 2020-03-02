import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getConfig = ({ commit }) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'config',
                fn: 'list_json'
            }
        }).then(response => {
            commit("GET_CONFIG", response.data);
            return resolve(response.data);
        }).catch(err => {
            commit("GET_CONFIG", null);
            return reject(err);
        });
    })
}