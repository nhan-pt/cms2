import * as actions from './action';

const store = {
    state: {
        listNational: null,
        nationalCount: 0,
        detailNational: {}
    },
    mutations: {
        GET_LIST_NATIONAL: (state, payload) => {
            state.listNational = payload.data;
            state.nationalCount = payload.totalRow;
        },
        GET_DETAIL_NATIONAL: (state, payload) => {
            state.detailNational = payload;
        }
    },
    actions,
    getters:{
        listNational: state => state.listNational,
        nationalCount: state => state.nationalCount,
        detailNational: state => state.detailNational,
    }
};
export default store;