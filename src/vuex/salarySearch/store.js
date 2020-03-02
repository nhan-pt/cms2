import * as actions from './action';

const store = {
    state: {
        listSalarySearch: null,
        salarySearchCount: 0,
        detailSalarySearch: {},
    },
    mutations: {
        GET_LIST_SALARY_SEARCH: (state, payload) => {
            state.listSalarySearch = payload.data;
            state.salarySearchCount = payload.totalRow;
        },
        GET_DETAIL_SALARY_SEARCH: (state, payload) => {
            state.detailSalarySearch = payload;
        }
    },
    actions,
    getters: {
        listSalarySearch: state => state.listSalarySearch,
        salarySearchCount: state => state.salarySearchCount,
        detailSalarySearch: state => state.detailSalarySearch,
    }
};
export default store;
