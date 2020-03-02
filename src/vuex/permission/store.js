import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';

let initPermissions = null;
let initUserPermissions = null;
if (typeof (localStorage) !== 'undefined') {
    try {
        initPermissions = JSON.parse(localStorage.getItem(CONSTANTS.PERMISSIONS) || null); 
        initUserPermissions = JSON.parse(localStorage.getItem(CONSTANTS.USER_PERMISSIONS) || null);
    } catch (e) {

    }
}

const store = {
    state: {
        permissions: initPermissions,
        userPermissions: initUserPermissions,
        detailRolePermission: null,
        listRoles: null,
    },
    mutations: {
        GET_PERMISSION: (state, payload) => {
            state.permissions = payload.allPermission;
            state.userPermissions = payload.userPermissions;
        },
        DETAIL_ROLE_PERMISSION: (state, payload) => {
            state.detailRolePermission = payload;
        },
        LIST_ROLES: (state, payload) => {
            state.listRoles = payload;
        },
    },
    actions,
    getters: {
        permissions: state => state.permissions,
        userPermissions: state => state.userPermissions,
        detailRolePermission: state => state.detailRolePermission,
        listRoles: state => state.listRoles,
    }
};

export default store;