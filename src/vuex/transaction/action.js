import axios from '../../core/plugins/http';

export const getListTransaction = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/transactions'
            },
            method: 'get',
            params: opts
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        })
    })
};

export const getTransaction = ({ commit }, transactionId) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: 'cms/transaction/' + transactionId
            },
            method: 'get',
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};

export const deleteTransaction = ({ commit }, transactionId) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: 'cms/transaction/' + transactionId
            },
            method: 'DELETE'
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const editTransaction = ({ commit }, opts) => {
    let transactionId = opts.id
    delete opts.id
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: 'cms/transaction/' + transactionId,
                ...opts
            },
            method: 'PUT'
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};