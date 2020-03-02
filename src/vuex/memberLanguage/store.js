import * as actions from './action';

const store = {
    state: {
        listMemberLanguage: null,
        memberLanguageCount: 0,
        detailMemberLanguage: {},
    },
    mutations: {
        GET_LIST_MEMBER_LANGUAGE: (state, payload) => {
            state.listMemberLanguage = payload.data;
            state.memberLanguageCount = payload.totalRow;
        },
        GET_DETAIL_MEMBER_LANGUAGE: (state, payload) => {
            state.detailMemberLanguage = payload;
        }
    },
    actions,
    getters: {
        listMemberLanguage: state => state.listMemberLanguage,
        memberLanguageCount: state => state.memberLanguageCount,
        detailMemberLanguage: state => state.detailMemberLanguage,
    }
};
export default store;
