import * as actions from './action';

const store = {
    state: {
        listRegime: null,
        regimeCount: 0,
        detailRegime: {},
    },
    mutations: {
        GET_LIST_PROVINCE: (state, payload) => {
            state.listRegime = payload.data;
            state.regimeCount = payload.totalRow;
        },
        GET_DETAIL_PROVINCE: (state, payload) => {
            state.detailRegime = payload;
        }
    },
    actions,
    getters: {
        listRegime: state => state.listRegime,
        regimeCount: state => state.regimeCount,
        detailRegime: state => state.detailRegime,
    }
};
export default store;
