import * as actions from './action';

const store = {
    state: {
        listDistrict: null,
        districtCount: 0,
        detailDistrict: {}
    },
    mutations: {
        GET_LIST_DISTRICT: (state, payload) => {
            state.listDistrict = payload.data;
            state.districtCount = payload.totalRow;
        },
        GET_DETAIL_DISTRICT: (state, payload) => {
            state.detailDistrict = payload;
        }
    },
    actions,
    getters:{
        listDistrict: state => state.listDistrict,
        districtCount: state => state.districtCount,
        detailDistrict: state => state.detailDistrict,
    }
};
export default store;