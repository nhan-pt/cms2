import * as actions from './action';

const store = {
    state: {
        listProvince: null,
        provinceCount: 0,
        detailProvince: {},
    },
    mutations: {
        GET_LIST_PROVINCE: (state, payload) => {
            state.listProvince = payload.data;
            state.provinceCount = payload.totalRow;
        },
        GET_DETAIL_PROVINCE: (state, payload) => {
            state.detailProvince = payload;
        }
    },
    actions,
    getters: {
        listProvince: state => state.listProvince,
        provinceCount: state => state.provinceCount,
        detailProvince: state => state.detailProvince,
    }
};
export default store;
