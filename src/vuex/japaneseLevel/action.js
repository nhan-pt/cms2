import axios from '../../core/plugins/http';

export const getListJapaneseLevel = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchJapaneseLevel',
                ...opts
            }
        }).then(response => {
            commit("GET_LIST_JAPANESE_LEVEL", response);
            return resolve(response);
        }).catch(error => {
            commit("GET_LIST_JAPANESE_LEVEL", null);
            return reject(error);
        })
    })
};
export const getDetailJapaneseLevel = ({commit}, opts) => {
    return new Promise( (resolve, reject) =>{
        axios({
            data: {
                url: '/cms/resource/detailJapaneseLevel',
                ...opts
            }
        }).then(response => {
            commit("GET_DETAIL_JAPANESE_LEVEL", response.data);
            return resolve(response);
        }).catch(error =>{
            commit("GET_DETAIL_JAPANESE_LEVEL", null);
            return reject(error);
        })
    })
};
export const saveEditJapaneseLevel = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateJapaneseLevel',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddJapaneseLevel = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addJapaneseLevel',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};