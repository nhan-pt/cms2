import axios from '../../core/plugins/http';

export const getListTag = ({commit}, opts)=> {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/resource/searchTag',
                ...opts
            }
        }).then(response => {
            commit('GET_LIST_TAG', response);
            return resolve(response);
        }).catch(err => {
            commit('GET_LIST_TAG', null);
            return reject(err);
        });
    })
}
export const getTagDetail = ({commit}, opts) =>{
    return new Promise((resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/resource/detailTag',
                ...opts
            }
        }).then(response => {
            commit("GET_TAG_DETAIL", response.data);
            return resolve(response.data);
        }).catch(err => {
            commit('GET_TAG_DETAIL', null);
            return reject(err);
        });
    })
}
export const updateTag = ({commit}, opts) =>{
    return new Promise((resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/resource/updateTag',
                ...opts
            }
        }).then(response => {
            commit("UPDATE_TAG", response);
            return resolve(response.data);
        }).catch(err => {
            commit('UPDATE_TAG', null);
            return reject(err);
        });
    })
}

export const addTag = ({commit}, opts) =>{
    return new Promise((resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/resource/addTag',
                ...opts
            }
        }).then(response => {
            commit("UPDATE_TAG", response);
            return resolve(response.data);
        }).catch(err => {
            commit('UPDATE_TAG', null);
            return reject(err);
        });
    })
}