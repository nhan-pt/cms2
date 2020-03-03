import axios from '../../core/plugins/http';
export const getBranch = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: 'cms/branchs/mini-list-branch'
            },
            method: 'get',
            params: opts
        }).then(response => {
            commit('GET_LIST_BRANCH', response);
            return resolve(response);
        }).catch(err => {
            return reject(err);
        })
    })
};