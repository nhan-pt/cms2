import * as actions from './action';

const store = {
    state: {
        listJobType: null,
        listParentJobType: null,
        jobTypeCount: 0,
        detailJobType: {},
    },
    mutations: {
        GET_LIST_JOB_TYPE: (state, payload) => {
            state.listJobType = payload.data;
            state.jobTypeCount = payload.totalRow;
        },
        GET_LIST_PARENT_JOB_TYPE: (state, payload) => {
            state.listParentJobType = payload.data;
        },
        GET_DETAIL_JOB_TYPE: (state, payload) => {
            state.detailJobType = payload;
        }
    },
    actions,
    getters: {
        listJobType: state => state.listJobType,
        listParentJobType: state => state.listParentJobType,
        jobTypeCount: state => state.jobTypeCount,
        detailJobType: state => state.detailJobType,
    }
};
export default store;
