'use strict';

const Enum = {
    StreamType: {
        AudioOnly: 0,
        VideoOnly: 1,
        AudioAndVideo: 2
    },
    Permission:{
        RoleManagement : 1,
        UserManagement : 2,
        LocalisationManagement : 3,
        JobManagement : 4,
        LanguageManagement : 5,
        SalaryManagement : 6,
        PostManagement : 7,
        MemberManagement : 9,
    },
    PostApply:{
      PENDDINGUPDATEINFO : 5,
      WAITINGCONFIRM : 6,
      INTERVIEWING : 7,
      HIDE : 8,
      DELETE : 0,
      APPLIED : 10,
      HIRED : 11,
      REJECT : 12
    },
    CandidateInfoAvailable:{
        AVAILABEL : 1,
        UNAVAILABEL : 0,
        PENDDINGUPDATEINFO : 3,
        WAITINGCONFIRM : 4
    },

    Gender:[
        {
            id:1,
            name:'male'
        },
        {
            id:2,
            name:'female'
        },
        {
            id:3,
            name:'other'
        }
    ]
};

module.exports = Enum;