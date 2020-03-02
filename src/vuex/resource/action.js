import axios from '../../core/plugins/http';

export const getListZipCode = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/resource/zip-code-search'
            },
            method: 'get',
            params: {
                zipCode: opts,
                pageIndex: 1,
                pageSize: 50
            },
        }).then(response => {
            commit('GET_LIST_ZIPCODE', response);
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const getAllTag = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/resource/get-all-tag'
            },
            method: 'post'
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const getInterviewDate = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/resource/interview-date'
            },
            method: 'get'
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const getDateWeeks = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/resource/date-weeks'
            },
            method: 'get'
        }).then(response => {
            commit('GET_DATE_WEEK', response);
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const getAllResource = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/resource/get-all-resource'
            },
            method: 'post'
        }).then(response => {
            commit('GET_ALL_RESOURCE', response);
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};