import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getZoneTree = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'zone',
                fn: 'get_list_with_tree',
                ...opts
            }
        }).then(response => {
            commit("GET_ZONE_TREE", response.data);
            return resolve(response.data);
        }).catch(err => {
            commit("GET_ZONE_TREE", null);
            return reject(err);
        });
    });
}