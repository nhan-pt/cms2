import axios from '../../core/plugins/http';

export const getListApplicationPost = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/post-applications'
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

export const getDetailApply = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/post-apply/detail-apply'
            },
            method: 'get',
            params: opts,
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};

export const updateApplications = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/post-apply/update-application-by-list',
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

export const updateStatusApply = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/post-apply/status-update',
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

export const saveShiftApply = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/post-apply/save-post-apply-shift-job',
                ...opts
            },
            params: opts
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const saveScheduleApply = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/post-apply/save-post-apply-interview-schedule',
                ...opts
            }
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const exportApplicant = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/post-apply/export-application'
            },
            method: 'get',
            params: opts,
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const saveSearchApplication = ({ commit }, data) => {
    return commit('SAVE_SEARCH_APPLICATION', data);
};

export const saveTabApplication = ({ commit }, data) => {
    return commit('SAVE_TAB_APPLICATION', data);
};