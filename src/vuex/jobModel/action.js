import axios from '../../core/plugins/http';

export const getListJobModel = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchJobModel',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_JOB_MODEL", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_JOB_MODEL", null);
            return reject(error);
        })
    })
};
export const getDetailJobModel = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailJobModel',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_JOB_MODEL',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_JOB_MODEL', null);
            return reject(error);
        })
    })
};
export const saveEditJobModel = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateJobModel',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddJobModel = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addJobModel',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};