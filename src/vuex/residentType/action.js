import axios from '../../core/plugins/http';

export const getListResidentType = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchResidentType',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_RESIDENT_TYPE", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_RESIDENT_TYPE", null);
            return reject(error);
        })
    })
};
export const getDetailResidentType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailResidentType',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_RESIDENT_TYPE',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_RESIDENT_TYPE', null);
            return reject(error);
        })
    })
};
export const saveEditResidentType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateResidentType',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddResidentType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addResidentType',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};