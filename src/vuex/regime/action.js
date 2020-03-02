import axios from '../../core/plugins/http';

export const getListRegime = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchRegime',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_PROVINCE", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_PROVINCE", null);
            return reject(error);
        })
    })
};
export const getDetailRegime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailRegime',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_PROVINCE',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_PROVINCE', null);
            return reject(error);
        })
    })
};
export const saveEditRegime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateRegime',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddRegime = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addRegime',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};