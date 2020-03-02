<template>
    <div class="wrapper-page">
        <div class="card">
            <div class="card-body">
                <div class="p-3">
                    <form class="form-horizontal m-t-30" action="/">
                        <div class="form-group">
                            <label for="username">{{$i('UserName')}}</label>
                            <input type="text" class="form-control" id="username" :placeholder="$i('UserName')" v-model="loginData.userName" />
                        </div>
                        <div class="form-group">
                            <label for="userpassword">{{$i('Password')}}</label>
                            <input type="password" class="form-control" id="userpassword" :placeholder="$i('Password')" v-model="loginData.password" />
                        </div>
                        <div class="item-form">
                            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <input type="text" class="form-control" :placeholder="$i('Code')" v-model="loginData.captcha" @keyup.enter="doLogin" style="text-transform:uppercase;" />
                                <div id="img-captcha" style="height:38px;" v-html="imgCaptcha"></div>
                                <span title="" id="reloadCaptcha" @click="getCaptcha()"><i class="ion-refresh"></i></span>
                            </div>
                        </div>
                        <div class="form-group row m-t-20">
                            <div class="col-6">
                            </div>
                            <div class="col-6 text-right">
                                <span class="btn btn-primary w-md waves-effect waves-light" @click="doLogin">{{$i('Login')}}</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import CONSTANTS from '../../core/utils/constants';
    function getInitData() {
        return {
            isLoading: false,
            sitekey: '6Lf-c1wUAAAAAEpTwqZaAooV7_kFBChw9wjj1hP2',
            imgCaptcha: '',
            loginData: {
                userName: '',
                password: '',
                token: '',
                captcha: '',
                md5Captcha: ''
            }
        }
    }
    var opts = {
        name: 'login-index',
        data() {
            return getInitData();
        },
        computed: {
            ...mapGetters(['isLoggedIn']),
        },
        methods: {
            ...mapActions(['getUserInfo', 'logIn']),
            onSubmit: function () {
                this.doLogin();
            },
            onVerify(response) {
                this.isLoading = true;
                this.$http({
                    data: {
                        m: 'user',
                        fn: 'verify_captcha',
                        token: response
                    }
                }).then((response) => {
                    if (response.success) {
                        this.isLoading = false;
                        this.doLogin()
                    }
                }).catch((ex) => {
                    this.$message(ex.message, 'error');
                    this.resetRecaptcha()
                });
            },
            onExpired() {
                console.log('Expired')
            },
            resetRecaptcha() {
                this.$refs.invisibleRecaptcha.reset() // Direct call reset method
            },
            doLogin() {
                if (!this.loginData.userName || !this.loginData.password || !this.loginData.captcha) {
                    return this.$error(this.$i('FillAllFieldsPlease'));
                } else {
                    var obj = Object.assign({}, this.loginData);
                    this.isLoading = true;
                    this.logIn(obj).then(response => {
                        this.isLoading = false;
                        if (this.$route.query && this.$route.query.returnUrl)
                            this.$router.push(decodeURIComponent(this.$route.query.returnUrl));
                        else
                            this.$router.push('/');
                    }).catch(response => {
                        this.$error(response.message);
                        clearTimeout(this.timeDelay);
                        this.timeDelay = setTimeout(() => {
                            location.reload();
                        }, 800)
                    });
                }
            },
            getCaptcha() {
                this.$http({
                    data: {
                        m: "user",
                        fn: "get_captcha"
                    }
                }).then((response) => {
                    this.loginData.captcha = "";
                    this.imgCaptcha = response.data;
                    this.loginData.md5Captcha = response.content;
                }).catch(() => {

                });
            },
        },
        created() { 
            this.getCaptcha();
            if (!process.env.VUE_ENV)
                if (localStorage.getItem(this.CONSTANTS.AUTH_TOKEN)) {
                    if (this.$route.query && this.$route.query.returnUrl)
                        this.$router.push(decodeURIComponent(this.$route.query.returnUrl));
                    else
                        this.$router.push('/');
                }
            localStorage.setItem(this.CONSTANTS.CURRENT_VERSION, this.appSettings.Version);
        },
        watch: {
        }
    };
    export default opts;
</script>