import axios from '../../core/plugins/http';

export const getListStation = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchStation',
                ...opts
            }
        }).then(response => {
            commit("GET_LIST_STATION", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_STATION", null);
            return reject(error);
        })
    })
};
export const searchListStation = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/resource/station-search',
                ...opts
            },
            method: 'get',
            params: opts
        }).then(response => {
            return resolve(response);
        }).catch(error =>{
            return reject(error);
        })
    })
};
export const getDetailStation = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailStation',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_STATION',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_STATION', null);
            return reject(error);
        })
    })
};
export const saveEditStation = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateStation',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddStation = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addStation',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};