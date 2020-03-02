import axios from '../../core/plugins/http';

export const getListReason = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchReason',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_REASON", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_REASON", null);
            return reject(error);
        })
    })
};

export const getDetailReason = ({commit}, opts) =>{
    return new Promise ((resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/resource/detailReason',
                ...opts
            }
        }).then(response => {
            commit("GET_DETAIL_REASON", response.data);
            return resolve(response);
        }).catch(err => {
            commit("GET_DETAIL_REASON", null);
            return resolve(err);
        })
    })
};
export const saveEditReason = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateReason',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddReason = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addReason',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};