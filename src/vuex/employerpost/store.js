import * as actions from './action';

const store = {
    state: {
        employerPostList: null,
        employerPostDetail: null,
        employerPostCount: 0,
    },
    mutations: {
        GET_LIST_EMPLOYER_POST: (state, payload) => {
            state.employerPostList = payload.data;
            state.employerPostCount = payload.totalRow;
        },
        GET_DETAIL_EMPLOYER_POST: (state, payload) => {
            state.employerPostDetail = payload.data;
        },
    },
    actions,
    getters: {
        employerPostList: state => state.employerPostList,
        employerPostDetail: state => state.employerPostDetail,
        employerPostCount: state => state.employerPostCount,
    }
};

export default store;