import * as actions from './action';

const store = {
    state: {
        listWorkingDay: null,
        workingDayCount: 0,
        detailWorkingDay: {},
    },
    mutations: {
        GET_LIST_WORKING_DAY: (state, payload) => {
            state.listWorkingDay = payload.data;
            state.workingDayCount = payload.totalRow;
        },
        GET_DETAIL_WORKING_DAY: (state, payload) => {
            state.detailWorkingDay = payload;
        }
    },
    actions,
    getters: {
        listWorkingDay: state => state.listWorkingDay,
        workingDayCount: state => state.workingDayCount,
        detailWorkingDay: state => state.detailWorkingDay,
    }
};
export default store;
