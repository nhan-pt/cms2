import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getListComment = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/comment/search',
                ...opts
            }
        }).then(response => {
            commit("GET_LIST_COMMENT", response);
            return resolve(response);
        }).catch(err => {
            commit("GET_LIST_COMMENT", null);
            return reject(err);
        });
    })
}