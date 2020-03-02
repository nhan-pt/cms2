<template>
    <div id="app-full" >
        <div id="wrapper" v-if="currentUser">
            <!-- HEADER -->
            <header id="header" class="site-header-fix">
                <div class="row m-0 p-0-35">
                    <div class="col-3 p-0 ">
                        <a href="#" class="ml-5">
                            <img src="../../src/assets/images/laboro.png" alt="logo">
                        </a>
                    </div>
                    <div class="col-9 d-flex justify-content-between align-items-center p-0 ">
                        <div class="ml-2">
                        </div>
                        <div class="info d-flex align-items-center mr-5">
                            <a class="avatar dropdown-toggle nav-link arrow-none waves-effect nav-user"
                               data-toggle="dropdown" href="javascript:;" role="button" aria-haspopup="false"
                               aria-expanded="false" @click="showMenuUser = !showMenuUser">
                                <img src="../../src/assets/images/laboro.png" alt="avatar">
                                <!--                  <avatar id="current_member_avatar" style="" slot="right"-->
                                <!--                          :username="currentUser.fullName == null ? 'M' : currentUser.fullName"-->
                                <!--                          :src="currentUser.avatar" :size="40"></avatar>-->
                            </a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown display-b"
                                 v-show="showMenuUser">
                                <a class="dropdown-item" href="javascript:;" @click="popupChangePassword=true"><i
                                  class="mdi mdi-lock-open-outline m-r-5"></i> {{$i('ChangePassword')}}</a>
                                <a class="dropdown-item text-danger" href="javascript:;" @click="signOut()"><i
                                  class="mdi mdi-power text-danger"></i> {{$i('Logout')}}</a>
                               
                            </div>
                            <div class="author-name">
                                {{currentUser.fullName}}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <!--     MENU LEFT     -->
            <div class="row m-0 content-body ">
                <div id="aside-menu-fix" class="aside-menu__ha p-0 ">
                    <keep-alive>
                        <menuLeft></menuLeft>
                    </keep-alive>
                </div>
                <div class="content-page-fix max-width-f" id="content-page-fix">
                    <div class="content">
                        <div class="container-fluid">
                            <router-view :key="$route.path"></router-view>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        <modal v-if="popupChangePassword" @close="popupChangePassword = false" :width="325" :footer="false"
               :title="$i('ChangePassword')">
            <div slot="body">
                <div class="form-group">
                    <label for="currentPassword">{{$i('CurrentPassword')}}</label>
                    <input type="password" class="form-control" id="currentPassword" :placeholder="$i('InputPassword')" v-model="form.oldPassword" />
                </div>
                <div class="form-group">
                    <label for="newPassword">{{$i('NewPassword')}}</label>
                    <input type="password" class="form-control" id="newPassword" :placeholder="$i('InputPassword')" v-model="form.newPassword" />
                </div>
                <div class="form-group">
                    <label for="confirmPassword">{{$i('ConfirmPassword')}}</label>
                    <input type="password" class="form-control" id="confirmPassword" :placeholder="$i('InputPassword')" v-model="form.newPassword2" />
                </div>
                <div class="form-group text-right">
                    <span class="btn btn-primary w-md waves-effect waves-light" @click="submitChangePassword">{{$i('Save')}}</span>
                </div>
            </div>
        </modal>
        <!-- <notifications group="foo"/> -->
    
    
    
    
    
    
    <p>nhanpt</p>
    </div>
    
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import CONSTANTS from '../core/utils/constants';
    import languageSelect from './_shared/language-select.vue';
    import menuLeft from './_shared/site-left';
    
    let menuMode = '';
    if (typeof (localStorage) !== 'undefined') {
        console.log(localStorage);
        try {
            menuMode = localStorage.getItem(CONSTANTS.MENU_MODE) || '';
        } catch (e) {
        
        }
    }
    export default {
        name: 'app',
        components: {
            languageSelect,
            menuLeft
        },
        computed: {
            ...mapGetters(['currentUser'])
        },
        data() {
            return {
                popupChangePassword: false,
                form: {
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: ''
                },
                isInFullScreen: false,
                showModal: false,
                showMenuUser: false,
                menuMode: menuMode,
                windowWidth: 0,
            }
        },
        created(){
            
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
        methods: {
            ...mapActions(['logOut']),
            signOut() {
                this.logOut().then(() => {
                    this.$router.push(`/login`);
                });
            },
            submitChangePassword() {
                if (!this.form.oldPassword || !this.form.newPassword || !this.form.newPassword2)
                    return this.$message(this.$i('PleaseEnterCompleteInfomations'), 'error');
                if (this.form.newPassword != this.form.newPassword2)
                    return this.$message(this.$i('PasswordDoesNotMatch'), 'error');
                this.$http({
                    data: {
                        m: "user",
                        fn: "reset-password",
                        userId: this.currentUser.id,
                        password: this.form.newPassword
                    }
                }).then((response) => {
                    if (response.success) {
                        this.popupChangePassword = false;
                        this.form = {
                            oldPassword: '',
                            newPassword: '',
                            newPassword2: ''
                        };
                        return this.$message(this.$i('ChangePasswordSuccessfully'));
                    }
                }).catch(err => {
                    return this.$error(this.$i('CurrentPasswordIsIncorrect'));
                });
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
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);
                this.getWindowWidth()
            })
        },
        destroyed() {
            window.removeEventListener('resize', function () {
                this.handleResize();
                this.getWindowWidth();
            });
        }
    }
</script>
<style scoped>
    .content-page .content {
        margin-top: 0px;
    }
</style>
