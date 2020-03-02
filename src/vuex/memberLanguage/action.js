import axios from '../../core/plugins/http';

export const getListMemberLanguage = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchMemberLanguage',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_MEMBER_LANGUAGE", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_MEMBER_LANGUAGE", null);
            return reject(error);
        })
    })
};
export const getDetailMemberLanguage = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailMemberLanguage',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_MEMBER_LANGUAGE',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_MEMBER_LANGUAGE', null);
            return reject(error);
        })
    })
};
export const saveEditMemberLanguage = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateMemberLanguage',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddMemberLanguage = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addMemberLanguage',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};