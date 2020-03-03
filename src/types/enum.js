'use strict';

const Enum = {
    StreamType: {
        AudioOnly: 0,
        VideoOnly: 1,
        AudioAndVideo: 2
    },
    Permission: {
        RoleManagement: 1,
        UserManagement: 2,
        LocalisationManagement: 3,
        JobManagement: 4,
        LanguageManagement: 5,
        SalaryManagement: 6,
        PostManagement: 7,
        MemberManagement: 9,
    },
    EmployerPost: {
        ACTIVE: 1,
        INACTIVE: 2,
        EXPIRED: 3,
        NONPOSTING: 4
    },
    PostApply: {
        PENDDINGUPDATEINFO: 5,
        WAITINGCONFIRM: 6,
        INTERVIEWING: 7,
        HIDE: 8,
        DELETE: 0,
        APPLIED: 10,
        HIRED: 11, // da dau phong van va nhan viec
        REJECT: 12, // truot phong van
        DECLINE: 21, // tu choi offer
        QUIT: 22, //bo viec
        FIRED: 23 // bi sa thai
    },
    CandidateInfoAvailable: {
        AVAILABEL: 1,
        UNAVAILABEL: 0,
        PENDDINGUPDATEINFO: 3,
        WAITINGCONFIRM: 4
    },
    EmployerSection: {
        PUBLIC: 1,
        PRIVATE: 0
    },
    EmployerStatus: {
        UNCONFIRM: 2,
        ACTIVE: 1,
    },
    BranchSection: {
        PRIVATE: 0,
        PUBLIC: 1
    },
    Gender: [{
            id: 1,
            name: 'male'
        },
        {
            id: 2,
            name: 'female'
        },
        {
            id: 3,
            name: 'other'
        }
    ],
    BranchStatus: {
        DELETE: 0,
        ACTIVE: 1
    },
    EmailStatus: {
        TO: 1,
        CC: 2,
        BCC: 3
    },
    TransactionCompleteStatus: {
        PENDDING: 1,
        COMPLETE: 10,
        FAILED: 11
    },
    TransactionType: {
        OUT: 0,
        IN: 1
    }
};

module.exports = Enum;