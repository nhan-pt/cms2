import * as actions from './action';

const store = {
    state: {
        listJobModel: null,
        jobModelCount: 0,
        detailJobModel: {},
    },
    mutations: {
        GET_LIST_JOB_MODEL: (state, payload) => {
            state.listJobModel = payload.data;
            state.jobModelCount = payload.totalRow;
        },
        GET_DETAIL_JOB_MODEL: (state, payload) => {
            state.detailJobModel = payload;
        }
    },
    actions,
    getters: {
        listJobModel: state => state.listJobModel,
        jobModelCount: state => state.jobModelCount,
        detailJobModel: state => state.detailJobModel,
    }
};
export default store;
