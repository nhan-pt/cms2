import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const logOut = ({commit}) => {
    return new Promise((resolve, reject) => {
        if (typeof (localStorage) !== 'undefined') {
            localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
            localStorage.removeItem(CONSTANTS.CURRENT_USER);
        }
        commit("LOGOUT");
        resolve();
    })
};

export const logIn = ({commit}, data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            data: {
                m: 'user',
                fn: 'login',
                username: data.userName,
                password: data.password,
                captcha: data.captcha,
                md5Captcha: data.md5Captcha,
            }
        }).then(rs => {
            var response = rs.data;
            if (response.user && response.user.token && typeof (localStorage) !== 'undefined') {
                localStorage.setItem(CONSTANTS.AUTH_TOKEN, response.user.token);
            }
            commit("LOGGEDIN", response.user);
            if (typeof (localStorage) !== 'undefined') {
                localStorage.setItem(CONSTANTS.CURRENT_USER, JSON.stringify(response.user));
                localStorage.setItem(CONSTANTS.PERMISSIONS, JSON.stringify(response.allPermission));
                localStorage.setItem(CONSTANTS.USER_PERMISSIONS, JSON.stringify(response.userPermission));
            }
            return resolve(response);
        }).catch(err => {
            commit("LOGGEDIN_ERROR");
            return reject(err);
        });
    });
};

export const getUserInfo = ({commit}) => {
    return axios({url: '/User/Info'}).then(response => {
        commit("USER_INFO", response.data);
    }).catch(err => {
        if (err.status && err.status == 401 && typeof (localStorage) !== 'undefined') {
            localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
            localStorage.removeItem(CONSTANTS.CURRENT_USER);
        }
        commit("USER_INFO_ERROR", err);
    });
};

export const resetPassUser = ({commit}, data) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: "user",
                fn: "reset_pass",
                ...data
            }
        }).then(response => {
            commit("CHANGE_PASS_USER", response);
            return resolve(response.data);
        }).catch(err => {
            commit("ERROR", err);
            return reject(err);
        });
    })
};

export const getDetailUserPermission = ({commit}, memberId) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/user/permission-list-by-user',
                userId: memberId
            }
        }).then(response => {
            commit("USER_PERMISSION", response.data);
            return resolve(response);
        }).catch(error => {
            commit("USER_PERMISSION", null);
            return reject(error);
        })
    })
};
export const saveUserPermission = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/user/update-permission',
                ...opts
            }
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};
export const deleteUser= ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/user/delete/' + opts,
            }
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};

