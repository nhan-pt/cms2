import axios from '../../core/plugins/http';

export const getListJapaneseCertification = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchJapaneseCertification',
                ...opts
            }
        }).then(response => {
            commit("GET_LIST_JAPANESE_CERTIFICATION", response);
            return resolve(response);
        }).catch(error => {
            commit("GET_LIST_JAPANESE_CERTIFICATION", null);
            return reject(error);
        })
    })
};
export const getDetailJapaneseCertification = ({commit}, opts) => {
    return new Promise( (resolve, reject) =>{
        axios({
            data: {
                url: '/cms/resource/detailJapaneseCertification',
                ...opts
            }
        }).then(response => {
            commit("GET_DETAIL_JAPANESE_CERTIFICATION", response.data);
            return resolve(response);
        }).catch(error =>{
            commit("GET_DETAIL_JAPANESE_CERTIFICATION", null);
            return reject(error);
        })
    })
};
export const saveEditJapaneseCertification = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/updateJapaneseCertification',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const saveAddJapaneseCertification = ({commit}, opts) =>{
    return new Promise((resolve, reject)=>{
        axios({
            data:{
                url: '/cms/resource/addJapaneseCertification',
                ...opts
            }
        }).then(response =>{
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};