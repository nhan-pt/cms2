import * as actions from './action';

const store = {
    state: {
        listReason: null,
        reasonCount: 0,
        detailReason: {},
    },
    mutations: {
        GET_LIST_REASON: (state, payload) => {
            state.listReason = payload.data;
            state.reasonCount = payload.totalRow;
        },
        GET_DETAIL_REASON: (state, payload) => {
            state.detailReason = payload;
        }
    },
    actions,
    getters: {
        listReason: state => state.listReason,
        reasonCount: state => state.reasonCount,
        detailReason: state => state.detailReason,
    }
};
export default store;
