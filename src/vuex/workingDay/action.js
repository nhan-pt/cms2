import axios from '../../core/plugins/http';

export const getListWorkingDay = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchWorkingDay',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_WORKING_DAY", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_WORKING_DAY", null);
            return reject(error);
        })
    })
};
export const getDetailWorkingDay = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailWorkingDay',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_WORKING_DAY',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_WORKING_DAY', null);
            return reject(error);
        })
    })
};
export const saveEditWorkingDay = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateWorkingDay',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddWorkingDay = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addWorkingDay',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};