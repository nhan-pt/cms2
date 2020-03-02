import * as actions from './action';

const store = {
    state: {
        listJobTime: null,
        jobTimeCount: 0,
        detailJobTime: {},
    },
    mutations: {
        GET_LIST_JOB_TIME: (state, payload) => {
            state.listJobTime = payload.data;
            state.jobTimeCount = payload.totalRow;
        },
        GET_DETAIL_JOB_TIME: (state, payload) => {
            state.detailJobTime = payload;
        }
    },
    actions,
    getters: {
        listJobTime: state => state.listJobTime,
        jobTimeCount: state => state.jobTimeCount,
        detailJobTime: state => state.detailJobTime,
    }
};
export default store;
