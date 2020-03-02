import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';

const store = {
    state: {
        system: null
    },
    mutations: {
        INIT_SYSTEM: (state, payload) => {
            state.system = payload;
        },
        INIT_LANGUAGE: (state, payload) => {
            state.languageStatic = payload;
        }
        
    },
    actions,
    getters: {
        system: state => state.system
    }
};

export default store;