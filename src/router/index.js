import Vue from 'vue';
import VueRouter from 'vue-router';

const _import = require('./_import_sync');
import App from '../components/app.vue';
import AppBasic from '../components/app-basic.vue';
import CONSTANTS from '../core/utils/constants';
import ENUM from '../../config/enum';

Vue.use(VueRouter);

let _routers = [{
        path: '/',
        component: App,
        children: [{
                path: '/',
                component: _import('system/index'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/dashboard',
                component: _import('system/index'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/user',
                component: _import('user/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.UserManagement,
                }
            },
            {
                path: '/role',
                component: _import('role/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.RoleManagement,
                }
            },
            {
                path: '/config',
                component: _import('config/manager'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/area',
                component: _import('localisation/area/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LocalisationManagement,
                }
            },
            {
                path: '/province',
                component: _import('localisation/province/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LocalisationManagement,
                }
            },
            {
                path: '/district',
                component: _import('localisation/district/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LocalisationManagement,
                }
            },
            {
                path: '/national',
                component: _import('localisation/national/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LocalisationManagement,
                }
            },
            {
                path: '/station',
                component: _import('localisation/station/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LocalisationManagement,
                }
            },
            {
                path: '/residentType',
                component: _import('localisation/residentType/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LocalisationManagement,
                }
            },
            {
                path: '/language',
                component: _import('languages/language/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LanguageManagement,
                }
            },
            {
                path: '/japaneseLevel',
                component: _import('languages/japaneseLevel/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LanguageManagement,
                }
            },
            {
                path: '/japaneseCertification',
                component: _import('languages/japaneseCertification/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LanguageManagement,
                }
            },
            {
                path: '/languageLevel',
                component: _import('languages/languageLevel/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LanguageManagement,
                }
            },
            {
                path: '/memberLanguage',
                component: _import('languages/memberLanguage/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LanguageManagement,
                }
            },
            {
                path: '/jobModel',
                component: _import('job/jobModel/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.JobManagement,
                }
            },
            {
                path: '/jobType',
                component: _import('job/jobType/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.JobManagement,
                }
            },
            {
                path: '/jobTime',
                component: _import('job/jobTime/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.JobManagement,
                }
            },
            {
                path: '/shiftJob',
                component: _import('job/shiftJob/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.JobManagement,
                }
            },
            {
                path: '/shiftJobTime',
                component: _import('job/shiftJobTime/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.JobManagement,
                }
            },
            {
                path: '/workingDay',
                component: _import('job/workingDay/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.JobManagement,
                }
            },
            {
                path: '/salarySearch',
                component: _import('salary/salarySearch/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.SalaryManagement,
                }
            },
            {
                path: '/salaryType',
                component: _import('salary/salaryType/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.SalaryManagement,
                }
            },
            {
                path: '/regime',
                component: _import('salary/regime/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.SalaryManagement,
                }
            },
            {
                path: '/system',
                component: _import('system/index'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/tag',
                component: _import('tag/index'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/test',
                component: _import('test/index'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/tippost',
                component: _import('tippost/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.PostManagement,
                }
            },
            {
                path: '/tippost/add',
                component: _import('tippost/edit'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.PostManagement,
                }
            },
            {
                path: '/tippost/edit/:id',
                component: _import('tippost/edit'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.PostManagement,
                }
            },
            {
                path: '/employerpost',
                component: _import('employerpost/index'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/employerpost/create',
                component: _import('employerpost/create'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/employerpost/create-same/:sameid',
                component: _import('employerpost/edit'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/employerpost/edit/:id',
                component: _import('employerpost/edit'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/employerpost/show/:id',
                component: _import('employerpost/show'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'employerpost/translate/:id',
                component: _import('employerpost/translate/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LanguageManagement,
                }
            },
            {
                path: '/employerpost/translate',
                component: _import('employerpost/translate/info-translate'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.LanguageManagement,
                }
            },
            {
                path: '/application',
                component: _import('application/index'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/application/detail',
                component: _import('application/detail'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/employermember',
                component: _import('employermember/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.MemberManagement,
                }
            },
            // {
            //     path: '/employermember/edit',
            //     component: _import('employermember/edit'),
            //     meta: {
            //         requiresAuth: true,
            //         permission: ENUM.Permission.MemberManagement,
            //     }
            // },
            {
                path: '/employermember/edit/:id',
                component: _import('employermember/edit'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.MemberManagement,
                }
            },
            {
                path: '/employermember/detail/:id',
                component: _import('employermember/detail'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.MemberManagement,
                }
            },
            {
                path: '/employermember/create',
                component: _import('employermember/create'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.MemberManagement,
                }
            },
            {
                path: '/candidatemember',
                component: _import('candidatemember/index'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.MemberManagement,
                }
            },
            {
                path: '/candidatemember/detail/:id',
                component: _import('candidatemember/detail'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.MemberManagement,
                }
            },
            {
                path: '/candidatemember/edit/:id',
                component: _import('candidatemember/edit'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.MemberManagement,
                }
            },
            {
                path: '/candidatemember/create',
                component: _import('candidatemember/edit'),
                meta: {
                    requiresAuth: true,
                    permission: ENUM.Permission.MemberManagement,
                }
            },
            {
                path: '/reason',
                component: _import('reason/index'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: '/contact',
                component: _import('contact/index'),
                meta: {
                    requiresAuth: true,
                }
            },
        ]
    },
    {
        path: '/',
        component: AppBasic,
        children: [{
            path: '/login',
            component: _import('login/index')
        }]
    },
    {
        path: '*',
        component: App,
        children: [{
                path: '/',
                component: _import('_shared/404')
            },
            {
                path: '/not-allow-access',
                component: _import('_shared/not-allow-access')
            }
        ]
    },
];
const router = new VueRouter({
    mode: 'history',
    //base: '/',
    // errorHandler(to, from, next, error) {

    // },
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: _routers
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            if (!process.env.VUE_ENV) {
                if (localStorage.getItem(CONSTANTS.AUTH_TOKEN)) {
                    if (to.meta.permission) {
                        let isPermiss = false;
                        if (typeof(localStorage) && localStorage.getItem(CONSTANTS.CURRENT_USER)) {
                            let userCurrent = JSON.parse(localStorage.getItem(CONSTANTS.CURRENT_USER));
                            let permission = JSON.parse(localStorage.getItem(CONSTANTS.USER_PERMISSIONS));
                            for (let i = 0; i < permission.length; i++) {
                                if (permission[i].userId == userCurrent.id && permission[i].permissionId == to.meta.permission) {
                                    isPermiss = true;
                                    break;
                                }
                            }
                            if (isPermiss) {
                                return next();
                            } else {
                                router.push({ path: '/not-allow-access' });
                            }
                        } else {
                            router.push({ path: '/not-allow-access' });
                        }
                    } else {
                        return next();
                    }
                    // return next();
                } else {
                    router.push({ path: '/login', query: { returnUrl: to.fullPath } });
                }
            } else {
                if (to.meta.permission) {
                    let isPermiss = false;
                    if (typeof(localStorage) && localStorage.getItem(CONSTANTS.CURRENT_USER)) {
                        let userCurrent = JSON.parse(localStorage.getItem(CONSTANTS.CURRENT_USER));
                        let permission = JSON.parse(localStorage.getItem(CONSTANTS.USER_PERMISSIONS));
                        for (let i = 0; i < permission.length; i++) {
                            if (permission[i].userId == userCurrent.id && permission[i].permissionId == to.meta.permission) {
                                isPermiss = true;
                                break;
                            }
                        }
                        if (isPermiss) {
                            return next();
                        } else {
                            router.push({ path: '/not-allow-access' });
                        }
                    } else {
                        router.push({ path: '/not-allow-access' });
                    }
                } else {
                    return next();
                }
            }
        } catch (e) {
            next();
        }
    } else {
        next();
    }
});

export default router;