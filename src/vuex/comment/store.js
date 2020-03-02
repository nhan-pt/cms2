import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';
const store = {
    state: {
        commentList: null,
        commentCount:0,
        commentDetail: {}
    },
    mutations: {
        GET_LIST_COMMENT: (state, payload) => {
            state.commentList = payload.data;
            state.commentCount = payload.totalRow;
        },
        GET_COMMENT_DETAIL: (state, payload) => {
            state.commentDetail = payload;
        },
    },
    actions,
    getters: {
        commentList: state => state.commentList,
        commentCount: state => state.commentCount,
        commentDetail: state => state.commentDetail
    }
};

export default store;