import * as actions from './action';

const store = {
    state: {
        tipPostList: null,
        tipPostDetail: null,
        tipPostCount:0,
    },
    mutations: {
        GET_LIST_TIP_POST: (state, payload) => {
            state.tipPostList = payload.data;
            state.tipPostCount = payload.totalRow;
        },
        GET_DETAIL_TIP_POST: (state, payload) => {
            state.tipPostDetail = payload.data;
        },
    },
    actions,
    getters: {
        tipPostList: state => state.tipPostList,
        tipPostDetail: state => state.tipPostDetail,
        tipPostCount: state => state.tipPostCount,
    }
};

export default store;