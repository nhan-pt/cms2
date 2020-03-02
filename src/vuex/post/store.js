import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';
const store = {
    state: {
        postList: null,
        postCount:0,
        postDetail: {}
    },
    mutations: {
        GET_LIST_POST: (state, payload) => {
            state.postList = payload.data;
            state.postCount = payload.totalRow;
        },
        GET_POST_DETAIL: (state, payload) => {
            state.postDetail = payload;
        },
    },
    actions,
    getters: {
        postList: state => state.postList,
        postCount: state => state.postCount,
        postDetail: state => state.postDetail
    }
};

export default store;