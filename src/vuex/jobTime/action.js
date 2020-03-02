import axios from '../../core/plugins/http';

export const getListJobTime = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchJobTime',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_JOB_TIME", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_JOB_TIME", null);
            return reject(error);
        })
    })
};
export const getDetailJobTime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailJobTime',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_JOB_TIME',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_JOB_TIME', null);
            return reject(error);
        })
    })
};
export const saveEditJobTime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateJobTime',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddJobTime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addJobTime',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};