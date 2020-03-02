import axios from '../../core/plugins/http';

export const getListDistrict = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchDistrict',...opts
            },
        }).then(response => {
            commit("GET_LIST_DISTRICT", response);
            return resolve(response);
        }).catch(error => {
            commit("GET_LIST_DISTRICT", null);
            return reject(error);
        })
    })
};
export const searchListDistrict = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/resource/district-search'
            },
            method: 'get',
            params: opts,
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};
export const getDetailDistrict = ({commit}, opts) => {
    return new Promise( (resolve, reject) =>{
        axios({
            data: {
                url: '/cms/resource/detailDistrict',
                ...opts
            }
        }).then(response => {
            commit("GET_DETAIL_DISTRICT", response.data);
            return resolve(response);
        }).catch(error =>{
            commit("GET_DETAIL_DISTRICT", null);
            return reject(error);
        })
    })
};
export const saveEditDistrict = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateDistrict',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddDistrict = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addDistrict',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};