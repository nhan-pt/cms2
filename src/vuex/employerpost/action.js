import axios from '../../core/plugins/http';

export const getListEmployerPost = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/employer-post/search-employer-post'
            },
            method: 'get',
            params: opts,
        }).then(response => {
            commit('GET_LIST_EMPLOYER_POST', response);
            return resolve(response);
        }).catch(err => {
            commit('GET_LIST_EMPLOYER_POST', null);
            return reject(err);
        });
    })
};

export const getDetailEmployerPost = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/employer-post/detail-employer-post'
            },
            method: 'get',
            params: opts,
        }).then(response => {
            commit('GET_DETAIL_EMPLOYER_POST', response);
            return resolve(response);
        }).catch(err => {
            commit('GET_DETAIL_EMPLOYER_POST', null);
            return reject(err);
        });
    })
};

export const saveEditEmployerPost = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer-post/update-employer-post',
                ...opts
            }
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const saveAddEmployerPost = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer-post/add-employer-post',
                ...opts
            }
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const updateCensorshipOfEmployerPost = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer-post/update-censorship-employer-post',
                ...opts
            }
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const translateEmployerPost = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer-post/translate-employer-post',
                ...opts
            }
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const listApplyEmployer = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer-post/' + opts.id + '/applies'
            },
            method: 'get',
            params: opts
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const deleteEmployerPost = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer-post/' + id
            },
            method:'DELETE'
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const updateStatusEmployerPost = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer-post/update-employer-post-list-id',
                ...opts
            },
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const updateStatusDetailEmployerPost = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer-post/update-status-employer-post',
                ...opts
            },
            method:'put'
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
