import * as actions from './action';

const store = {
    state: {
        listShiftJobTime: null,
        listShiftJobTimeStart: null,
        listShiftJobTimeEnd: null,
        shiftJobTimeCount: 0,
        shiftJobTimeStartCount: 0,
        shiftJobTimeEndCount: 0,
        detailShiftJobTime: {},
    },
    mutations: {
        GET_LIST_SHIFT_JOB_TIME: (state, payload) => {
            state.listShiftJobTime = payload.data;
            state.shiftJobTimeCount = payload.totalRow;
        },
        GET_LIST_SHIFT_JOB_TIME_START: (state, payload) => {
            state.listShiftJobTimeStart = payload.data;
            state.shiftJobTimeStartCount = payload.totalRow;
        },
        GET_LIST_SHIFT_JOB_TIME_END: (state, payload) => {
            state.listShiftJobTimeEnd = payload.data;
            state.shiftJobTimeEndCount = payload.totalRow;
        },
        GET_DETAIL_SHIFT_JOB_TIME: (state, payload) => {
            state.detailShiftJobTime = payload;
        }
    },
    actions,
    getters: {
        listShiftJobTime: state => state.listShiftJobTime,
        listShiftJobTimeStart: state => state.listShiftJobTimeStart,
        listShiftJobTimeEnd: state => state.listShiftJobTimeEnd,
        shiftJobTimeCount: state => state.shiftJobTimeCount,
        shiftJobTimeStartCount: state => state.shiftJobTimeStartCount,
        shiftJobTimeEndCount: state => state.shiftJobTimeEndCount,
        detailShiftJobTime: state => state.detailShiftJobTime,
    }
};
export default store;
