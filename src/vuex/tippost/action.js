import axios from '../../core/plugins/http';

export const getListTipPost = ({commit}, opts)=> {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/tip-post/search-tips-post'
            },
            method: 'get',
            params: opts,
        }).then(response => {
            commit('GET_LIST_TIP_POST', response);
            return resolve(response);
        }).catch(err => {
            commit('GET_LIST_TIP_POST', null);
            return reject(err);
        });
    })
}

export const addTipPost = ({commit}, opts) =>{
    return new Promise((resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/tip-post/add-tips-post',
                ...opts
            }
        }).then(response => {
            return resolve(response.data);
        }).catch(err => {
            return reject(err);
        });
    })
}

export const detailTipPost = ({commit}, opts) =>{
    return new Promise((resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/tip-post/detail-tips-post',
            },
            method: 'get',
            params: opts,
        }).then(response => {
            commit('GET_DETAIL_TIP_POST', response);
            return resolve(response.data);
        }).catch(err => {
            commit('GET_DETAIL_TIP_POST', null);
            return reject(err);
        });
    })
}

export const updateTipPost = ({commit}, opts) =>{
    return new Promise((resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/tip-post/update-tips-post',
                ...opts
            }
        }).then(response => {
            return resolve(response.data);
        }).catch(err => {
            return reject(err);
        });
    })
}
