import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getLanguages = ({ commit }) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'language',
                fn: 'list'
            }
        }).then(response => {
            commit("GET_LANGUAGE", response.data);
            return resolve(response.data);
        }).catch(err => {
            commit("GET_LANGUAGE", null);
            return reject(err);
        });
    })
}

export const getLanguageStatic = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/language/language-static-search',
                ...opts
            }
        }).then(response => {
            commit("GET_LANGUAGE_STATIC", response);
            return resolve(response.data);
        }).catch(err => {
            return reject(err);
        });
    })
}

export const getListLanguageEnv = ({ commit }) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/language/list-language-env',
            }
        }).then(response => {
            return resolve(response.data);
        }).catch(err => {
            return reject(err);
        });
    })
}

export const insertLanguage = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'language',
                fn: 'insert',
                ...data
            }
        }).then(response => {
            return resolve(response.data);
        }).catch(err => {
            return reject(err);
        });
    })
}
export const updateLanguage = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'language',
                fn: 'update',
                ...data
            }
        }).then(response => {
            return resolve(response.data);
        }).catch(err => {
            return reject(err);
        });
    })
}

export const updateLanguageStatic = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/language/language-static-by-lang-save',
                ...data
            }
        }).then(response => {
            return resolve(response.data);
        }).catch(err => {
            return reject(err);
        });
    })
}

export const saveAddLanguageStatic = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/language/language-static-add',
                ...opts
            }
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
}

export const saveTranslateJobPost = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/cms/employer-post/translate-employer-post',
                ...data
            }
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};