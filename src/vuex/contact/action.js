import axios from '../../core/plugins/http';

export const getListContact = ({commit}, opts) => {
    return new Promise ((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/contact/search-contact'
            },
            method: 'get',
            params: opts
        }).then(response =>{
            commit("GET_LIST_CONTACT", response);
            return resolve(response);
        }).catch(err =>{
            commit("GET_LIST_CONTACT", null);
            return reject(err);
        })
    })
};
export const getDetailContact = ({commit}, opts) =>{
    return new Promise ((resolve, reject) =>{
        return axios({
            data: {
                url: '/cms/contact/detail-contact/' + opts
            },
            method: 'get',
        }).then(response => {
            commit("GET_DETAIL_CONTACT", response.data);
            return resolve(response);
        }).catch(err => {
            commit("GET_DETAIL_CONTACT", null);
            return reject(err);
        })
    })
};
export const updateContact = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/contact/update-contact',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};