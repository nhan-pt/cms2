import axios from '../../core/plugins/http';

export const getListSalaryType = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchSalaryType',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_SALARY_TYPE", response);
            return resolve(response);
        }).catch(error =>{
            commit("GET_LIST_SALARY_TYPE", null);
            return reject(error);
        })
    })
};
export const getDetailSalaryType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/detailSalaryType',
                ...opts
            }
        }).then(response =>{
            commit('GET_DETAIL_SALARY_TYPE',response.data);
            return resolve(response);
        }).catch(error => {
            commit('GET_DETAIL_SALARY_TYPE', null);
            return reject(error);
        })
    })
};
export const saveEditSalaryType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateSalaryType',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddSalaryType = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addSalaryType',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};