import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';
const store = {
    state: {
        pageList: null,
        pageCount:0,
        pageDetail: {}
    },
    mutations: {
        GET_LIST_PAGE: (state, payload) => {
            state.pageList = payload.data;
            state.pageCount = payload.totalRow;
        },
        GET_PAGE_DETAIL: (state, payload) => {
            state.pageDetail = payload;
        }
    },
    actions,
    getters: {
        pageList: state => state.pageList,
        pageCount: state => state.pageCount,
        pageDetail: state => state.pageDetail
    }
};

export default store;