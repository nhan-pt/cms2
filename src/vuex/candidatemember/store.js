import * as actions from './action';

const store = {
    state: {
        candidateMemberList: null,
        candidateMemberDetail: null,
        candidateMemberCount: 0,
        memberLanguages: [],
        tab: {
            isAvailable: 1,
            checktab: true
        },
        objSearchCandidate: {
            pageSize: 10,
            pageIndex: 1,
            searchKey: null,
            phone: null,
            isAvailable: -1,
            birthDate: null,
            katakana: null,
            name: null,
            provinceId: null,
            districtId: null,
            stationIds: [],
            japaneseSkill: [],
            resident: null,
            gender: null
        },
    },
    mutations: {
        GET_LIST_CANDIDATE_MEMBER: (state, payload) => {
            state.candidateMemberList = payload.data;
            state.candidateMemberCount = payload.totalRow;
        },
        GET_DETAIL_CANDIDATE_MEMBER: (state, payload) => {
            state.candidateMemberDetail = payload.data;
        },
        GET_LIST_MEMBER_LANGUAGE: (state, payload) => {
            state.memberLanguages = payload.data;
        },
        SAVE_SEARCH_CANDIDATE: (state, payload) => {
            state.objSearchCandidate = payload;
        },
        SAVE_TAB: (state, payload) => {
            state.tab = payload;
        },
        RESET_SEARCH_CANDIDATE: (state, payload) => {
            state.objSearchCandidate = payload;
        },
    },
    actions,
    getters: {
        candidateMemberList: state => state.candidateMemberList,
        candidateMemberDetail: state => state.candidateMemberDetail,
        candidateMemberCount: state => state.candidateMemberCount,
        memberLanguages: state => state.memberLanguages,
        objSearchCandidate: state => state.objSearchCandidate,
        tab: state => state.tab
    }
};

export default store;