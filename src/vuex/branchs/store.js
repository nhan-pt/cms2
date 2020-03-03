import * as actions from './action';

const store = {
    state: {
        branchList: null,

    },
    mutations: {
        GET_LIST_BRANCH: (state, payload) => {
            state.branchList = payload.data;
        },
    },
    actions,
    getters: {
        branchList: state => state.branchList,

    }
};

export default store;