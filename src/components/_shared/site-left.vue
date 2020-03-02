<template>
<div class="left side-menu-left">
    <div class="humburger-menu">
        <a class="" href="javascript:;" @click="toggleMenuMode"><i class="mdi mdi-menu"></i></a>
    </div>
    <div class="slimscroll-menu" id="remove-scroll">
        <!--- Sidemenu -->
        <div id="sidebar-menu">
            <!-- Left Menu Start -->

            <ul class="metismenu" id="side-menu">
                <li class="laboro-cms-menu">
                    <a class="" href="javascript:;" @click="toggleMenuMode"><i class="mdi mdi-menu"></i></a>
                </li>
                <li class="menu-title" @click="reset">
                    {{$i('System')}}
                </li>
                <li v-if="$isPermiss(1)" @click="reset">
                    <router-link to="/role" :title="$i('PermissionManagement')">
                        <i class="mdi mdi-account-key"></i>
                        <span>{{$i('PermissionManagement')}}</span>
                    </router-link>
                </li>
                <li v-if="$isPermiss(2)" @click="reset">
                    <router-link to="/user" :title="$i('MemberManagement')">
                        <i class="mdi mdi-account-star-variant"></i>
                        <span>{{$i('MemberManagement')}}</span>
                    </router-link>
                </li>
                <li><a href="javascript:void(0);" @click="activate(`systemConfig`)" :title="$i('SystemConfig')">
                        <i class="mdi mdi-settings"></i><span>{{$i('SystemConfig')}}<span class="float-right menu-arrow">
                                <i class="mdi mdi-chevron-right" :class="{ 'mdi-rotate-90' : activeMenu === `systemConfig` && checkActiveParent }">
                                </i></span></span></a>
                    <ul class="submenu collapse" :class="{ in : activeMenu === `systemConfig` && checkActiveParent }">
                        <li @click="reset">
                            <router-link to="/config"><i class="fa fa-adjust"></i><span>{{$i('SystemConfig')}}</span>
                            </router-link>
                        </li>
                        <li v-if="$isPermiss(3)"><a href="javascript:void(0);" @click="activateSubmenu(`localisation`)"><i class="mdi mdi-map-marker-radius"></i><span>{{$i('Localisation')}}<span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" :class="{ 'mdi-rotate-90' : activeSubmenu === `localisation` && checkActiveChild }"></i></span></span></a>
                            <ul class="submenu collapse level2" :class="{ in : activeSubmenu === `localisation` && checkActiveChild }">
                                <li @click="reset">
                                    <router-link to="/national"><span>{{$i('National')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/area"><span>{{$i('Area')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/province"><span>{{$i('Province')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/district"><span>{{$i('District')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/station"><span>{{$i('Station')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/residentType"><span>{{$i('ResidentType')}}</span>
                                    </router-link>
                                </li>
                                <!-- <li>
                                    <router-link to="/reason">
                                        <span>{{$i('Reason')}}</span>
                                    </router-link>
                                </li> -->
                            </ul>
                        </li>
                        <li v-if="$isPermiss(4)"><a href="javascript:void(0);" @click="activateSubmenu(`job`)"><i class="mdi mdi-checkbox-multiple-blank-outline"></i><span>{{$i('Job')}}<span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" :class="{ 'mdi-rotate-90' : activeSubmenu === `job` && checkActiveChild }"></i></span></span></a>
                            <ul class="submenu collapse level2" :class="{ in : activeSubmenu === `job` && checkActiveChild }">
                                <li @click="reset">
                                    <router-link to="/jobModel"><span>{{$i('JobModel')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/jobTime"><span>{{$i('JobTime')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/shiftJob"><span>{{$i('ShiftJob')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/shiftJobTime"><span>{{$i('ShiftJobTime')}}</span>
                                    </router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/jobType"><span>{{$i('JobType')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/workingDay"><span>{{$i('WorkingDay')}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li v-if="$isPermiss(5)"><a href="javascript:void(0);" @click="activateSubmenu(`language`)">
                                <i class="fa fa-language"></i> <span>{{$i('Language')}}<span class="float-right menu-arrow"><i class="mdi mdi-chevron-right" :class="{ 'mdi-rotate-90' : activeSubmenu === `language` && checkActiveChild }"></i></span></span></a>
                            <ul class="submenu collapse level2" :class="{ in : activeSubmenu === `language` && checkActiveChild }">
                                <li @click="reset">
                                    <router-link to="/japaneseLevel"><span>{{$i('JapaneseLevel')}}</span>
                                    </router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/japaneseCertification">
                                        <span>{{$i('JapaneseCertification')}}</span></router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/languageLevel"><span>{{$i('LanguageLevel')}}</span>
                                    </router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/memberLanguage"><span>{{$i('MemberLanguage')}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li v-if="$isPermiss(6)">
                            <a href="javascript:void(0);" @click="activateSubmenu(`salary`)">
                                <i class="fa fa-flag"></i>
                                <span>{{$i('Salary')}}
                                    <span class="float-right menu-arrow">
                                        <i class="mdi mdi-chevron-right" :class="{ 'mdi-rotate-90' : activeSubmenu === `salary` && checkActiveChild }"></i>
                                    </span>
                                </span>
                            </a>
                            <ul class="submenu collapse level2" :class="{ in : activeSubmenu === `salary` && checkActiveChild }">
                                <li @click="reset">
                                    <router-link to="/salarySearch">
                                        <span>{{$i('SalarySearch')}}</span>
                                    </router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/salaryType">
                                        <span>{{$i('SalaryType')}}</span>
                                    </router-link>
                                </li>
                                <li @click="reset">
                                    <router-link to="/regime">
                                        <span>{{$i('Regime')}}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li @click="reset">
                            <router-link to="/tag">
                                <i class="fa fa-tag"></i>
                                <span>{{$i('Tag')}}</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="menu-title">{{$i('post')}}</li>
                <li v-if="$isPermiss(7)" @click="reset">
                    <router-link to="/tippost" :title="$i('TipPost')">
                        <i class="fa fa-info"></i>
                        <span>{{$i('TipPost')}}</span>
                    </router-link>
                </li>
                <li v-if="$isPermiss(7)" @click="reset">
                    <router-link to="/employerpost" :title="$i('EmployerPost')">
                        <i class="fa fa-archive"></i>
                        <span>{{$i('EmployerPost')}}</span>
                    </router-link>
                </li>
                <li class="menu-title">{{$i('member')}}</li>
                <li @click="reset">
                    <router-link to="/employermember" :title="$i('EmployerMember')">
                        <i class="fa fa-user-md"></i>
                        <span>{{$i('EmployerMember')}}</span>
                    </router-link>
                </li>
                <li @click="reset">
                    <router-link to="/candidatemember" :title="$i('CandidateMember')">
                        <i class="fa fa-user"></i>
                        <span>{{$i('CandidateMember')}}</span>
                    </router-link>
                </li>
                <li @click="reset">
                    <router-link to="/application" :title="$i('Application')">
                        <i class="fas fa-id-card"></i>
                        <span>{{$i('Application')}}</span>
                    </router-link>
                </li>
                <li @click="reset" class="menu-title">{{$i('contact')}}</li>
                <li @click="reset">
                    <router-link to="/contact" :title="$i('Contact')">
                        <i class="mdi mdi-account-box"></i>
                        <span>{{$i('Contact')}}</span>
                    </router-link>
                </li>
                <!--<li><router-link to="/system"><i class="mdi mdi-altimeter"></i><span>Tình trạng server</span></router-link></li>-->
                <li class="menu-title" @click="reset">{{$i('Others')}}</li>
                <li @click="reset">
                    <router-link to="/dashboard" class="waves-effect" :title="$i('MediaServerStatistics')">
                        <i class="mdi mdi-view-dashboard"></i>
                        <span>{{$i('MediaServerStatistics')}}</span></router-link>
                </li>
            </ul>
        </div>
        <!-- Sidebar -->
        <div class="clearfix"></div>
    </div>
    <!-- Sidebar -left -->
</div>
</template>

<style>
#remove-scroll {
    height: calc(100vh - 80px);
}
</style>

<script>
import Vue from 'vue'
import CONSTANTS from '../../core/utils/constants';
import {
    mapActions,
    mapGetters
} from 'vuex';

let menuMode = '';
if (typeof (localStorage) !== 'undefined') {
    try {
        menuMode = localStorage.getItem(CONSTANTS.MENU_MODE) || '';
    } catch (e) {
        console.log(e);
    }
}
export default {
    components: {
        
    },
    props: {
        open: {
            type: Boolean,
            default: true
        },
        docked: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isInFullScreen: false,
            showModal: false,
            showMenuUser: false,
            menuMode: menuMode,
            windowWidth: 0,
            menuVal: '#/',
            activeMenu: '',
            activeSubmenu: '',
            checkActiveParent: false,
            checkActiveChild: true,
            versions: [],
            ops: {
                rail: {
                    opacity: '0.5',
                    background: 'transparent',
                    keepShow: false
                },
                bar: {
                    background: '#ccc',
                    keepShow: false
                },
                scrollPanel: {
                    easing: 'easeInQuad',
                    speed: 800
                }
            }
        }
    },
    watch: {
        'menuMode'() {
            if (this.menuMode && this.menuMode == 'enlarged') {
                document.getElementById('aside-menu-fix').classList.add("width-70");
                document.getElementById('aside-menu-fix').classList.remove('aside-menu__ha');
                document.getElementsByTagName('body')[0].classList.add('enlarged');
            } else {
                document.getElementsByTagName('body')[0].classList.remove('enlarged');
                document.getElementById('aside-menu-fix').classList.remove('width-70');
                document.getElementById('aside-menu-fix').classList.add("aside-menu__ha");
            }
        }
    },
    computed: {
        ...mapGetters(['objSearchCandidate', 'objData']),
        lang() {
            return Vue.config.lang
        }
    },
    destroyed() {
        window.removeEventListener('resize', function () {
            this.handleResize();
            this.getWindowWidth();
        });
    },
    methods: {
        ...mapActions(['resetCandidate','resetEmployerSearch']),
        reset() {
            this.resetCandidate();
            this.resetEmployerSearch()
        },
        cancelFullScreen(el) {
            var requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
            if (requestMethod) { // cancel full screen.
                requestMethod.call(el);
            } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        },
        requestFullScreen(el) {
            // Supports most browsers and their versions.
            var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

            if (requestMethod) { // Native full screen.
                requestMethod.call(el);
            } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
            return false
        },
        toggleFullScreen() {
            var elem = document.body; // Make the body go full screen.
            // console.log(document.body);
            this.isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);
            if (this.isInFullScreen) {
                this.cancelFullScreen(document);
                this.isInFullScreen = false;
            } else {
                this.requestFullScreen(elem);
                this.isInFullScreen = true;
            }
            return false;
        },
        toggleMenuMode() {
            this.menuMode == 'enlarged' ? this.menuMode = '' : this.menuMode = 'enlarged';
            this.showMenuUser = !this.showMenuUser;
        },
        getWindowWidth() {
            this.windowWidth = document.documentElement.clientWidth;
            if (this.windowWidth < 768) {
                this.menuMode = 'enlarged';
            } else {
                this.menuMode = '';
            }
        },
        handleClose() {
            this.$emit('close')
        },
        handleMenuChange(val) {
            this.menuVal = val
            if (this.docked) {
                window.location.hash = this.menuVal
            } else {
                this.changeHref = true
            }
            this.changeHref = true
            this.$emit('change', val)
        },
        handleHide() {
            if (!this.changeHref) return
            window.location.hash = this.menuVal
            this.changeHref = false
        },
        changeLang(lang) {
            Vue.config.lang = lang
            window.localStorage.setItem('lang', lang)
        },
        handleMenuClick(item) {
            this.$emit('change', item.title);
        },
        activate: function (el) {
            if (this.activeMenu == el) {
                this.checkActiveParent = !this.checkActiveParent;
            } else {
                this.checkActiveParent = true;
            }
            this.activeMenu = el;
        },
        activateSubmenu: function (el) {
            if (this.activeSubmenu == el) {
                this.checkActiveChild = !this.checkActiveChild;
            } else {
                this.checkActiveChild = true;
            }
            this.activeSubmenu = el;
        },
        checkPermission(permissionIds) {
            if (typeof (permissionIds) != "object")
                permissionIds = [permissionIds];

            let permission = this._.filter(this.userPermissions, (item) => {
                return permissionIds.indexOf(item.id) >= 0;
            });
            return (permission && permission.length > 0);
        },

    }
}
</script>
