import axios from '../../core/plugins/http';

export const getListSalarySearch = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchSalarySearch',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_SALARY_SEARCH", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_SALARY_SEARCH", null);
            return reject(error);
        })
    })
};
export const getDetailSalarySearch = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailSalarySearch',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_SALARY_SEARCH',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_SALARY_SEARCH', null);
            return reject(error);
        })
    })
};
export const saveEditSalarySearch = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateSalarySearch',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddSalarySearch = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addSalarySearch',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};