import axios from '../../core/plugins/http';

export const getListShiftJobTime = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchShiftJobTime',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_SHIFT_JOB_TIME", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_SHIFT_JOB_TIME", null);
            return reject(error);
        })
    })
};
export const getListShiftJobTimeStart = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchShiftJobTime',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_SHIFT_JOB_TIME_START", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_SHIFT_JOB_TIME_START", null);
            return reject(error);
        })
    })
};
export const getListShiftJobTimeEnd = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchShiftJobTime',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_SHIFT_JOB_TIME_END", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_SHIFT_JOB_TIME_END", null);
            return reject(error);
        })
    })
};
export const getDetailShiftJobTime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailShiftJobTime',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_SHIFT_JOB_TIME',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_SHIFT_JOB_TIME', null);
            return reject(error);
        })
    })
};
export const saveEditShiftJobTime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateShiftJobTime',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddShiftJobTime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addShiftJobTime',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddMultiShiftJobTime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addMultiShiftJobTime',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const deleteShiftJobTimeByShiftJobAndType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/deleteShiftJobTimeByShiftJobAndType',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};