import { toggleDoExamNow } from './actions'
import _ from 'lodash';
import minBy from 'lodash/minBy';

const store = {
    state: { isModalOpen: false, isShowDoExamNow: false },

    mutations: {
        TOGGLE_DO_EXAM_NOW: (state, payload) => {
            state.isShowDoExamNow = !state.isShowDoExamNow;
            state.isModalOpen = state.isShowDoExamNow;
        }
    },

    actions: {
        toggleDoExamNow
    },

    getters: {
        isModalOpen: state => state.isModalOpen,
        isShowDoExamNow: state => state.isShowDoExamNow
    }
};

export default store;