import * as actions from './actions'
import CONSTANTS from '../../core/utils/constants';

let initUser = null;
if (typeof (localStorage) !== 'undefined') {
    try {
        initUser = JSON.parse(localStorage.getItem(CONSTANTS.CURRENT_USER) || null);
    } catch (e) {

    }
}

const store = {
    state: {
        currentUser: initUser,
        isLoggedIn: false,
        listUserLessonLog : null,
        userPermission: null,
    },

    mutations: {
        LOGOUT: (state, payload) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },
        USER_INFO: (state, payload) => {
            state.currentUser = payload;
            state.isLoggedIn = payload != null;
        },
        LOGGEDIN: (state, payload) => {
            state.currentUser = payload;
            state.isLoggedIn = payload != null;
        },
        LOGGEDIN_ERROR: (state, payload) => {

        },
        USER_INFO_ERROR: (state, payload) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },
        GET_USER_LESSON_LOG: (state, payload) => {
            state.listUserLessonLog = payload;
        },
        CHANGE_PASS_USER: (state, payload) => {

        },
        USER_PERMISSION: (state, payload) => {
            state.userPermission = payload;
        }
    },
    actions,
    getters: {
        currentUser: state => state.currentUser,
        isLoggedIn: state => state.isLoggedIn,
        userPermission: state => state.userPermission,
    }
};

export default store;