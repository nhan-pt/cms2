import axios from '../../core/plugins/http';

export const getListArea = ({commit}, opts) => {
    return new Promise ((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/resource/searchArea',
                ...opts
            }
        }).then(response =>{
            commit("GET_LIST_AREA", response);
            return resolve(response);
        }).catch(err =>{
            commit("GET_LIST_AREA", null);
            return reject(err);
        })
    })
};
export const getDetailArea = ({commit}, opts) =>{
    return new Promise ((resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/resource/detailArea',
                ...opts
            }
        }).then(response => {
            commit("GET_DETAIL_AREA", response.data);
            return resolve(response);
        }).catch(err => {
            commit("GET_DETAIL_AREA", null);
            return resolve(err);
        })
    })
};
export const saveEditArea = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateArea',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddArea = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addArea',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};