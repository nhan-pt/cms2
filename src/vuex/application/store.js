import * as actions from './action';
import { PostApply } from '../../types/enum'
const store = {
    state: {
        tabApplication: {
            status: 10,
            checktab: true
        },
        objSearchApplication: {
            pageSize: 10,
            pageIndex: 1,
            employerId: null,
            provinceId: null,
            districtId: null,
            stationIds: [],
            trainLineId: null,
            minSalary: null,
            maxSalary: null,
            orderType: 'DESC',
            orderBy: 'CREATEDDATE',
            staties: 10,
            startDate: null,
            endDate: null,
            branchId: null,
        },
        listPostApply: [{
                status: PostApply.PENDDINGUPDATEINFO,
                label: 'pendding_update_info'
            },
            {
                status: PostApply.WAITINGCONFIRM,
                label: 'waiting_confirm'
            },
            {
                status: PostApply.INTERVIEWING,
                label: 'Interview_setup'
            },
            {
                status: PostApply.APPLIED,
                label: 'Applied'
            },
            {
                status: PostApply.HIDE,
                label: 'Hide'
            },
            {
                status: PostApply.REJECT,
                label: 'web_rejected'
            },
            {
                status: PostApply.DECLINE,
                label: 'DECLINE'
            },
            {
                status: PostApply.QUIT,
                label: 'QUIT'
            },
            {
                status: PostApply.FIRED,
                label: 'FIRED'
            }
        ],
    },
    mutations: {
        SAVE_SEARCH_APPLICATION: (state, payload) => {
            state.objSearchApplication = payload;
        },
        SAVE_TAB_APPLICATION: (state, payload) => {
            state.tabApplication = payload;
        },
    },
    actions,
    getters: {
        objSearchApplication: state => state.objSearchApplication,
        tabApplication: state => state.tabApplication,
        listPostApply: state => state.listPostApply,
    }
};

export default store;