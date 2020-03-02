import * as actions from './action';

const store = {
    state: {
        listStation: null,
        stationCount: 0,
        detailStation: {},
    },
    mutations: {
        GET_LIST_STATION: (state, payload) => {
            state.listStation = payload.data;
            state.stationCount = payload.totalRow;
        },
        GET_DETAIL_STATION: (state, payload) => {
            state.detailStation = payload;
        }
    },
    actions,
    getters: {
        listStation: state => state.listStation,
        stationCount: state => state.stationCount,
        detailStation: state => state.detailStation,
    }
};
export default store;
