import * as actions from './action';

const store = {
    state: {
        listZipcode: null,
        listDateWeek: null,
        jobModel: null,
        jobType: null,
        japaneseCertification: null,
        salaryType: null,
        paymentMethod: null,
        tag: null,
        regime: null,
        dateWeeks: null,
        workingDay: null,
        shiftJob: null,
        shiftJobStart: null,
        shiftJobEnd: null,
        residentType: null,
        interviewScheduleDate: null,
        province: null,
        memberLanguage: null,
        national: null,
        languageLevel: null,
        district: null,
        learningCategory: null,
        workingCategory: null,
    },
    mutations: {
        GET_LIST_ZIPCODE: (state, payload) => {
            state.listZipcode = payload.data;
        },
        GET_DATE_WEEK: (state, payload) => {
            state.listDateWeek = payload.data;
        },
        GET_ALL_RESOURCE: (state, payload) => {
            state.jobModel = payload.data.jobModel;
            state.jobType = payload.data.jobType;
            state.japaneseCertification = payload.data.japaneseCertification;
            state.salaryType = payload.data.salaryType;
            state.paymentMethod = payload.data.paymentMethod;
            state.tag = payload.data.tag;
            state.regime = payload.data.regime;
            state.dateWeeks = payload.data.dateWeeks;
            state.workingDay = payload.data.workingDay;
            state.shiftJob = payload.data.shiftJob;
            state.shiftJobStart = payload.data.shiftJobTime.filter(e => e.type == 1);
            state.shiftJobEnd = payload.data.shiftJobTime.filter(e => e.type == 2);
            state.interviewScheduleDate = payload.data.interviewScheduleDate;
            state.province = payload.data.province;
            state.residentType = payload.data.residentType;
            state.memberLanguage = payload.data.memberLanguage;
            state.national = payload.data.national;
            state.languageLevel = payload.data.languageLevel;
            state.district = payload.data.district;
            state.learningCategory = payload.data.learningCategory;
            state.workingCategory = payload.data.workingCategory;
        }
    },
    actions,
    getters: {
        listZipcode: state => state.listZipcode,
        listDateWeek: state => state.listDateWeek,
        jobModel: state => state.jobModel,
        jobType: state => state.jobType,
        japaneseCertification: state => state.japaneseCertification,
        salaryType: state => state.salaryType,
        paymentMethod: state => state.paymentMethod,
        tag: state => state.tag,
        regime: state => state.regime,
        dateWeeks: state => state.dateWeeks,
        workingDay: state => state.workingDay,
        shiftJob: state => state.shiftJob,
        shiftJobStart: state => state.shiftJobStart,
        shiftJobEnd: state => state.shiftJobEnd,
        interviewScheduleDate: state => state.interviewScheduleDate,
        province: state => state.province,
        residentType: state => state.residentType,
        memberLanguage: state => state.memberLanguage,
        national: state => state.national,
        languageLevel: state => state.languageLevel,
        district: state => state.district,
        learningCategory: state => state.learningCategory,
        workingCategory: state => state.workingCategory
    }
};
export default store;