import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';
const store = {
    state: {
        listZone: null
    },
    mutations: {
        GET_ZONE_TREE: (state, payload) => {
            state.listZone = payload;
        }
    },
    actions,
    getters: {
        listZone: state => state.listZone
    }
};

export default store;