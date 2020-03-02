import * as actions from './action';

const store = {
    state: {
        objData: {
            pageSize: 10,
            pageIndex: 1,
            provinceId: null,
            districtId: null,
            stationId: [],
            trainLineId: null,
            section: null,
            status: null,
            minEmployee: null,
            maxEmployee: null,
            minCapital: null,
            maxCapital: null,
        },

        employerMemberList: null,
        employerMemberDetail: null,
        employerMemberCount: 0,
    },
    mutations: {
        GET_LIST_EMPLOYER_MEMBER: (state, payload) => {
            state.employerMemberList = payload.data;
            state.employerMemberCount = payload.totalRow;
        },
        SAVE_OBJECT_SEARCH: (state, payload) => {
            state.objData = payload;
        },
        GET_DETAIL_EMPLOYER_MEMBER: (state, payload) => {
            state.employerMemberDetail = payload.data;
        },
        RESET_SEARCH_EMPLOYER: (state, payload) => {
            state.objData = payload;
        },
    },
    actions,
    getters: {
        objData: state => state.objData,

        employerMemberList: state => state.employerMemberList,
        employerMemberDetail: state => state.employerMemberDetail,
        employerMemberCount: state => state.employerMemberCount,
    }
};

export default store;