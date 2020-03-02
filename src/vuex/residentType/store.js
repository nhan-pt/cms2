import * as actions from './action';

const store = {
    state: {
        listResidentType: null,
        residentTypeCount: 0,
        detailResidentType: {},
    },
    mutations: {
        GET_LIST_RESIDENT_TYPE: (state, payload) => {
            state.listResidentType = payload.data;
            state.residentTypeCount = payload.totalRow;
        },
        GET_DETAIL_RESIDENT_TYPE: (state, payload) => {
            state.detailResidentType = payload;
        }
    },
    actions,
    getters: {
        listResidentType: state => state.listResidentType,
        residentTypeCount: state => state.residentTypeCount,
        detailResidentType: state => state.detailResidentType,
    }
};
export default store;
