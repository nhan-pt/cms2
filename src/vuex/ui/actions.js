import axios from '../../core/plugins/http';

export const toggleDoExamNow = ({ commit }) => {
    commit("TOGGLE_DO_EXAM_NOW");
}
