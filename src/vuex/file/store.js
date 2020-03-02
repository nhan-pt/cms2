import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';
const store = {
    state: {
        files: null,
        fileCount:0
    },
    mutations: {
        GET_FILES: (state, payload) => {
            state.files = payload.data;
            state.fileCount = payload.totalRow;
        }
    },
    actions,
    getters: {
        files: state => state.files,
        fileCount: state => state.fileCount
    }
};

export default store;