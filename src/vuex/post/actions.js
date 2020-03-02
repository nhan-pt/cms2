import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getListPost = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/post/search',
                ...opts
            }
        }).then(response => {
            commit("GET_LIST_POST", response);
            return resolve(response);
        }).catch(err => {
            commit("GET_LIST_POST", null);
            return reject(err);
        });
    })
}

export const getPostDetail = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'post',
                fn: 'detail',
                ...opts
            }
        }).then(response => {
            commit("GET_POST_DETAIL", response.data);
            return resolve(response.data);
        }).catch(err => {
            commit("GET_POST_DETAIL", null);
            return reject(err);
        });
    })
}

export const savePostByLang = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'post',
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

export const isPostPublish = ({ commit}, opts) => {
    return new Promise( (resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/post/publish',
                ...opts
            }
        })
    }).then(responese =>{
        return resolve(response.data);
    }).catch(err => {
        return reject(err);
    });
}