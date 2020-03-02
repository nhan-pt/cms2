import axios from '../../core/plugins/http';

export const getListLanguageLevel = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchLanguageLevel',
                ...opts
            }
        }).then(response => {
            commit("GET_LIST_LANGUAGE_LEVEL", response);
            return resolve(response);
        }).catch(error => {
            commit("GET_LIST_LANGUAGE_LEVEL", null);
            return reject(error);
        })
    })
};
export const getDetailLanguageLevel = ({commit}, opts) => {
    return new Promise( (resolve, reject) =>{
        axios({
            data: {
                url: '/cms/resource/detailLanguageLevel',
                ...opts
            }
        }).then(response => {
            commit("GET_DETAIL_LANGUAGE_LEVEL", response.data);
            return resolve(response);
        }).catch(error =>{
            commit("GET_DETAIL_LANGUAGE_LEVEL", null);
            return reject(error);
        })
    })
};
export const saveEditLanguageLevel = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateLanguageLevel',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddLanguageLevel = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addLanguageLevel',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};