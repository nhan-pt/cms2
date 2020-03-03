import axios from '../../core/plugins/http';

export const getListCandidateMember = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/candidates'
            },
            method: 'get',
            params: opts,
        }).then(response => {
            commit('GET_LIST_CANDIDATE_MEMBER', response);
            return resolve(response);
        }).catch(err => {
            commit('GET_LIST_CANDIDATE_MEMBER', {});
            return reject(err);
        });
    })
};

export const getDetailCandidateMember = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/candidate/' + opts.id
            },
            method: 'get',
        }).then(response => {
            commit('GET_DETAIL_CANDIDATE_MEMBER', response);
            return resolve(response);
        }).catch(err => {
            commit('GET_DETAIL_CANDIDATE_MEMBER', {});
            return reject(err);
        });
    })
};

export const confirmCandidateProfile = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/candidate/confirm-profile',
                ...opts
            },
        }).then(response => {
            return resolve(response);
        }).catch(err => {
            return reject(err);
        });
    })
};

export const getListMemberLanguage = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/resource/searchMemberLanguage',
                ...opts,
            }
        }).then(response => {
            commit("GET_LIST_MEMBER_LANGUAGE", response);
            return resolve(response);
        }).catch(error => {
            commit("GET_LIST_MEMBER_LANGUAGE", null);
            return reject(error);
        })
    })
};

export const exportDetail = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/candidate/export-csv/' + id
            },
            method: 'get',
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const updateContactCandidate = ({ commit }, data) => {
    let id = data.id
    delete data.id
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/candidate/' + id,
                ...data,
            },
            method: 'patch',
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const createCandidate = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/member/create-candidate',
                ...opts,
            },
            method: 'post',
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const updateCandidate = ({ commit }, opts) => {
    let id = opts.id;
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/candidate/' + id,
                ...opts,
            },
            method: 'put',
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const updateStatusCandidateIds = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/candidate/update-status-candidate-ids',
                ...opts,
            },
            method: 'post',
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

export const saveSearchCandidate = ({ commit }, data) => {
    return commit('SAVE_SEARCH_CANDIDATE', data);
};

export const saveTab = ({ commit }, data) => {
    return commit('SAVE_TAB', data);
};
export const resetCandidate = ({ commit }, data) => {
    return commit('RESET_SEARCH_CANDIDATE', {
        pageSize: 10,
        pageIndex: 1,
        searchKey: null,
        phone: null,
        isAvailable: -1,
        birthDate: null,
        katakana: null,
        name: null,
        provinceId: null,
        districtId: null,
        stationIds: [],
        japaneseSkill: [],
        resident: null,
        gender: null

    });
};