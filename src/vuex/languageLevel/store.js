import * as actions from './action';

const store = {
    state: {
        listLanguageLevel: null,
        languageLevelCount: 0,
        detailLanguageLevel: {}
    },
    mutations: {
        GET_LIST_LANGUAGE_LEVEL: (state, payload) => {
            state.listLanguageLevel = payload.data;
            state.languageLevelCount = payload.totalRow;
        },
        GET_DETAIL_LANGUAGE_LEVEL: (state, payload) => {
            state.detailLanguageLevel = payload;
        }
    },
    actions,
    getters:{
        listLanguageLevel: state => state.listLanguageLevel,
        languageLevelCount: state => state.languageLevelCount,
        detailLanguageLevel: state => state.detailLanguageLevel,
    }
};
export default store;