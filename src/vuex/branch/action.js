import axios from '../../core/plugins/http';

export const getListBranch = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/branchs'
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

export const getDetailBranch = ({ commit }, branchId) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: 'cms/branch/' + branchId
            },
            method: 'get',
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};

export const deleteBranch = ({ commit }, branchId) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: 'cms/branch/' + branchId
            },
            method: 'DELETE'
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const createBranch = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: 'cms/branch',
                ...opts
            },
            method: 'POST'
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const editBranch = ({ commit }, opts) => {
    let branchId = opts.id
    delete opts.id
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: 'cms/branch/' + branchId,
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