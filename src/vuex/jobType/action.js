import axios from '../../core/plugins/http';

export const getListJobType = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchJobType',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_JOB_TYPE", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_JOB_TYPE", null);
            return reject(error);
        })
    })
};
export const getListParentJobType = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchJobType',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_PARENT_JOB_TYPE", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_PARENT_JOB_TYPE", null);
            return reject(error);
        })
    })
};
export const getDetailJobType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailJobType',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_JOB_TYPE',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_JOB_TYPE', null);
            return reject(error);
        })
    })
};
export const saveEditJobType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateJobType',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddJobType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addJobType',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};