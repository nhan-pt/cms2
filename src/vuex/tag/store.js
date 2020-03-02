import * as actions from './actions';

const store = {
    state: {
        tagList: null,
        tagCount:0,
        tagDetail: {},
        tagUpdate: 0,
    },
    mutations: {
        GET_LIST_TAG: (state, payload) => {
            state.tagList = payload.data;
            state.tagCount = payload.totalRow;
        },
        GET_TAG_DETAIL: (state, payload) => {
            state.tagDetail = payload;
        },
        UPDATE_TAG: (state, payload) => {
            state.tagUpdate = payload;
        },
    },
    actions,
    getters: {
        tagList: state => state.tagList,
        tagCount: state => state.tagCount,
        tagDetail: state => state.tagDetail,
        tagUpdate: state => state.tagUpdate
    }
};

export default store;