import * as actions from './action';

const store = {
    state: {
        tabApplication: {
            status: 10,
            checktab: true
        },
        objSearchApplication: {
            pageSize: 10,
            pageIndex: 1,
            employerId: null,
            provinceId: null,
            districtId: null,
            stationIds: [],
            trainLineId: null,
            minSalary: null,
            maxSalary: null,
            orderType: 'DESC',
            orderBy: 'CREATEDDATE',
            staties: 10,
            startDate: null,
            endDate: null,
        },
    },
    mutations: {
        SAVE_SEARCH_APPLICATION: (state, payload) => {
            state.objSearchApplication = payload;
        },
        SAVE_TAB_APPLICATION: (state, payload) => {
            state.tabApplication = payload;
        },
    },
    actions,
    getters: {
        objSearchApplication: state => state.objSearchApplication,
        tabApplication: state => state.tabApplication
    }
};

export default store;