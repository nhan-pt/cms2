import * as actions from './action';

const store = {
    state: {
        listContact: null,
        contactCount: 0,
        detailContact: {},
    },
    mutations: {
        GET_LIST_CONTACT: (state, payload) => {
            state.listContact = payload.data;
            state.contactCount = payload.totalRow;
        },
        GET_DETAIL_CONTACT: (state, payload) => {
            state.detailContact = payload;
        }
    },
    actions,
    getters: {
        listContact: state => state.listContact,
        contactCount: state => state.contactCount,
        detailContact: state => state.detailContact,
    }
};
export default store;