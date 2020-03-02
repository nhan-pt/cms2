import axios from '../../core/plugins/http';

export const getListProvince = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchProvince',
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
export const searchListProvince = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/resource/get-all-province',
            }
        }).then(response => {
            return resolve(response);
        }).catch(error =>{
            return reject(error);
        })
    })
};
export const getDetailProvince = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailProvince',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_PROVINCE',response);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_PROVINCE', null);
            return reject(error);
        })
    })
};
export const saveEditProvince = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateProvince',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddProvince = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addProvince',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};