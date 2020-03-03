import * as actions from './action';
import { TransactionCompleteStatus, TransactionType } from '../../types/enum'

const store = {
    state: {
        listCompleteStatus: [{
                id: TransactionCompleteStatus.PENDDING,
                name: 'cms_status_pendding_transaction'
            },
            {
                id: TransactionCompleteStatus.COMPLETE,
                name: 'cms_status_complete_transaction'
            },
            {
                id: TransactionCompleteStatus.FAILED,
                name: 'cms_status_failed_transaction'
            }
        ],
        listType: [{
                id: TransactionType.OUT,
                name: 'OUT'
            },
            {
                id: TransactionType.IN,
                name: 'IN'
            },
        ],
    },
    mutations: {},
    actions,
    getters: {
        listCompleteStatus: state => state.listCompleteStatus,
        listType: state => state.listType,
    }
};

export default store;