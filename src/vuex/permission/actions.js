import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getPermissions = ({ commit }) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'security',
                fn: 'user_permission_get_list'
            }
        }).then(response => {
            commit("GET_PERMISSION", response.data);
            if (typeof (localStorage) !== 'undefined') {
                localStorage.setItem(CONSTANTS.PERMISSIONS, JSON.stringify(response.data.allPermission));
                localStorage.setItem(CONSTANTS.USER_PERMISSIONS, JSON.stringify(response.data.userPermission));
            }
            return resolve(response.data);
        }).catch(err => {
            commit("ERROR", err);
            return reject(err);
        });
    })
};
export const getDetailRolePermission = ({commit}, roleId) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/role/permission-list-by-role',
                roleId: roleId
            }
        }).then(response => {
            commit("DETAIL_ROLE_PERMISSION", response.data);
            return resolve(response);
        }).catch(error => {
            commit("DETAIL_ROLE_PERMISSION", null);
            return reject(error);
        })
    })
};
export const getListRoles = ({commit}) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                url: '/cms/role/list'
            }
        }).then(response => {
            commit("LIST_ROLES", response.data);
            return resolve(response);
        }).catch(error => {
            commit("LIST_ROLES", null);
            return reject(error);
        })
    })
};