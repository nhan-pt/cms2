import * as actions from './action';

const store = {
    state: {
        listShiftJob: null,
        shiftJobCount: 0,
        detailShiftJob: {},
    },
    mutations: {
        GET_LIST_SHIFT_JOB: (state, payload) => {
            state.listShiftJob = payload.data;
            state.shiftJobCount = payload.totalRow;
        },
        GET_DETAIL_SHIFT_JOB: (state, payload) => {
            state.detailShiftJob = payload;
        }
    },
    actions,
    getters: {
        listShiftJob: state => state.listShiftJob,
        shiftJobCount: state => state.shiftJobCount,
        detailShiftJob: state => state.detailShiftJob,
    }
};
export default store;
