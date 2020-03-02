import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getListPage = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'page',
                fn: 'list',
                ...opts
            }
        }).then(response => {
            commit("GET_LIST_PAGE", response);
            return resolve(response);
        }).catch(err => {
            commit("GET_LIST_PAGE", null);
            return reject(err);
        });
    })
}

export const getPageDetail = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'page',
                fn: 'get_by_id',
                ...opts
            }
        }).then(response => {
            commit("GET_PAGE_DETAIL", response.data);
            return resolve(response.data);
        }).catch(err => {
            commit("GET_PAGE_DETAIL", null);
            return reject(err);
        });
    })
}

export const savePageByLang = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'page',
                fn: 'save',
                ...opts
            }
        }).then(response => {
            return resolve(response.data);
        }).catch(err => {
            return reject(err);
        });
    })
}