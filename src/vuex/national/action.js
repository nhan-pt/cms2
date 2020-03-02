import axios from '../../core/plugins/http';

export const getListNational = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchNational',
                ...opts
            }
        }).then(response => {
            commit("GET_LIST_NATIONAL", response);
            return resolve(response);
        }).catch(error => {
            commit("GET_LIST_NATIONAL", null);
            return reject(error);
        })
    })
};
export const getDetailNational = ({commit}, opts) => {
    return new Promise( (resolve, reject) =>{
        axios({
            data: {
                url: '/cms/resource/detailNational',
                ...opts
            }
        }).then(response => {
            commit("GET_DETAIL_NATIONAL", response.data);
            return resolve(response);
        }).catch(error =>{
            commit("GET_DETAIL_NATIONAL", null);
            return reject(error);
        })
    })
};
export const saveEditNational = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateNational',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddNational = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addNational',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};