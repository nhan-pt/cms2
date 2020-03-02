import * as actions from './action';

const store = {
    state: {
        listSalaryType: null,
        salaryTypeCount: 0,
        detailSalaryType: {},
    },
    mutations: {
        GET_LIST_SALARY_TYPE: (state, payload) => {
            state.listSalaryType = payload.data;
            state.salaryTypeCount = payload.totalRow;
        },
        GET_DETAIL_SALARY_TYPE: (state, payload) => {
            state.detailSalaryType = payload;
        }
    },
    actions,
    getters: {
        listSalaryType: state => state.listSalaryType,
        salaryTypeCount: state => state.salaryTypeCount,
        detailSalaryType: state => state.detailSalaryType,
    }
};
export default store;
