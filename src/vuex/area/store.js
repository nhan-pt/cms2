import * as actions from './action';

const store = {
    state: {
        listArea: null,
        areaCount: 0,
        detailArea: {},
    },
    mutations: {
        GET_LIST_AREA: (state, payload) => {
            state.listArea = payload.data;
            state.areaCount = payload.totalRow;
        },
        GET_DETAIL_AREA: (state, payload) => {
            state.detailArea = payload;
        }
    },
    actions,
    getters: {
        listArea: state => state.listArea,
        areaCount: state => state.areaCount,
        detailArea: state => state.detailArea,
    }
};
export default store;