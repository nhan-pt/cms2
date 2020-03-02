import * as actions from './action';

const store = {
    state: {
        listJapaneseCertification: null,
        japaneseCertificationCount: 0,
        detailJapaneseCertification: {}
    },
    mutations: {
        GET_LIST_JAPANESE_CERTIFICATION: (state, payload) => {
            state.listJapaneseCertification = payload.data;
            state.japaneseCertificationCount = payload.totalRow;
        },
        GET_DETAIL_JAPANESE_CERTIFICATION: (state, payload) => {
            state.detailJapaneseCertification = payload;
        }
    },
    actions,
    getters:{
        listJapaneseCertification: state => state.listJapaneseCertification,
        japaneseCertificationCount: state => state.japaneseCertificationCount,
        detailJapaneseCertification: state => state.detailJapaneseCertification,
    }
};
export default store;