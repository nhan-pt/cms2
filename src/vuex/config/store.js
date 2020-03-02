import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';

const store = {
    state: {
        config: null
    },
    mutations: {
        GET_CONFIG: (state, payload) => {
            state.config = payload;
        }
    },
    actions,
    getters: {
        config: state => state.config
    }
};

export default store;