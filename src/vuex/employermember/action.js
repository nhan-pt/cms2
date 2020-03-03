import axios from '../../core/plugins/http';

export const getListEmployerMember = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/employer/search-employer-member'
            },
            method: 'get',
            params: opts,
        }).then(response => {
            commit('GET_LIST_EMPLOYER_MEMBER', response);
            return resolve(response);
        }).catch(err => {
            commit('GET_LIST_EMPLOYER_MEMBER', {});
            return reject(err);
        });
    })
};
export const getMiniEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/employer/list-employer-member'
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
export const updateSectionEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer/employers-section-update',
                ...opts
            },
            method: 'put',

        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const deleteEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/member/' + opts.id,
                ...opts
            },
            method: 'delete',

        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const saveSearchObj = ({ commit }, data) => {
    return commit('SAVE_OBJECT_SEARCH', data);
};

export const exportEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer/get-all-employer'
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


export const getDetailEmployerMember = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/employer/employer-info-get/' + opts.id
            },
            method: 'get',
        }).then(response => {
            commit('GET_DETAIL_EMPLOYER_MEMBER', response);
            return resolve(response);
        }).catch(err => {
            commit('GET_DETAIL_EMPLOYER_MEMBER', {});
            return reject(err);
        });
    })
};
export const editEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        let id = window.location.href.split("/")[5];
        return axios({
            data: {
                url: '/cms/employer/employer-info-update/' + id,
                ...opts
            },
            method: 'put',
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};

export const deleteMember = ({ commit }, opts) => {
    let status = { status: opts.status }
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/member/' + opts.memberId,
                ...status
            },
            method: 'DELETE'
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};

export const createEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/member/create-employer',
                ...opts
            },
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};

export const updateEmployer = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/employer/employer-info-update',
                ...opts
            },
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};

export const updatePass = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/member/update-password-member',
                ...opts
            },
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};
export const resetEmployerSearch = ({ commit }, data) => {
    return commit('RESET_SEARCH_EMPLOYER', {
        pageSize: 10,
        pageIndex: 1,
        provinceId: null,
        districtId: null,
        stationId: [],
        trainLineId: null,
        section: null,
        status: null,
        minEmployee: null,
        maxEmployee: null,
        minCapital: null,
        maxCapital: null,
    });
};