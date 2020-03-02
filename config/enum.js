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
    }
};

module.exports = Enum;