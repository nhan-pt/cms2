import axios from '../../core/plugins/http';

export const searchTrainLine = ({commit}, opts) => {
    return new Promise((resolve, reject) => {
        axios({
            data: {
                url: '/resource/train-line-search',
                ...opts
            },
            method: 'get',
            params: opts
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        })
    })
};