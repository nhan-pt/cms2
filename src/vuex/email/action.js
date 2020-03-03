import axios from '../../core/plugins/http';

export const getListEmailEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: 'cms/employer/list-mail-setting'
            },
            method: 'get',
            params: opts
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};
export const deleteEmailEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/mail-setting/' + opts
            },
            method: 'delete',

        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};
export const addEmailEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/employer/add-mail-setting',
                ...opts

            },
            method: 'post',
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};
export const editEmailEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/employer/update-mail-setting',
                ...opts

            },
            method: 'post',
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};