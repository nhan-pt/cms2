import * as actions from './action';

const store = {
    state: {
        listJapaneseLevel: null,
        japaneseLevelCount: 0,
        detailJapaneseLevel: {}
    },
    mutations: {
        GET_LIST_JAPANESE_LEVEL: (state, payload) => {
            state.listJapaneseLevel = payload.data;
            state.japaneseLevelCount = payload.totalRow;
        },
        GET_DETAIL_JAPANESE_LEVEL: (state, payload) => {
            state.detailJapaneseLevel = payload;
        }
    },
    actions,
    getters:{
        listJapaneseLevel: state => state.listJapaneseLevel,
        japaneseLevelCount: state => state.japaneseLevelCount,
        detailJapaneseLevel: state => state.detailJapaneseLevel,
    }
};
export default store;