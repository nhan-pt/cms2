import axios from '../../core/plugins/http';

export const getListShiftJob = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchShiftJob',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_SHIFT_JOB", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_SHIFT_JOB", null);
            return reject(error);
        })
    })
};
export const getDetailShiftJob = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailShiftJob',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_SHIFT_JOB',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_SHIFT_JOB', null);
            return reject(error);
        })
    })
};
export const saveEditShiftJob = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateShiftJob',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddShiftJob = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addShiftJob',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};