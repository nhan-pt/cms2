<template>
    <div class="video-wrapper" v-if="src">
        <div class="video-sizer">
            <div class="video-player-box vjs-16-9" v-video-player:myVideoPlayer="playerOptions" v-if="playerOptions.playable" ref="myVideoPlayer">
            </div>
        </div>
        <!--<iframe class="video-item" frameborder="0" allowfullscreen :src="displayUrl" @load="loaded" v-if="false"></iframe>-->
    </div>
</template>
<style>
    .video-js .vjs-big-play-button { top: calc(50% - 1em) !important; left: calc(50% - 1.5em) !important; }
    .video-wrapper { position: relative; width: 853px; max-width: 100%; }
    .video-sizer { position: relative; width: 100%; height: 0; overflow: hidden; padding-top: 56.25%; }
        .video-sizer .video-player-box, .video-sizer .video-player-box iframe, .video-sizer .video-player-box .video-js { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
</style>
<script>
    export default {
        name: 'player',
        props: {
            poster: {
                type: String,
                default: ''
            },
            src: {
                type: String
            },
            width: {
                type: Number,
                default: 50
            },
            height: {
                type: Number,
                default: 50
            },
            autoplay: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loading: false,
                playerOptions: {
                    autoplay: false,
                    muted: false,
                    language: 'vi',
                    poster: "",
                    playable: false,
                    techOrder: ["youtube", "vimeo", "html5"],
                    sources: [{ "type": "video/mp4", "src": "" }]
                }
            }
        },
        computed: {
            displayUrl() {
                return '';
            },
            type() {
                if (this.src) {
                    if (/youtube.com|youtu.be/.test(this.src))
                        return 'video/youtube';
                    if (/vimeo.com/.test(this.src))
                        return 'video/vimeo';
                    return 'video/mp4';
                }
                return 'video/mp4';
            },
            player() {
                return this.$refs.myVideoPlayer.player || this.myVideoPlayer;
            }
        },
        methods: {
            loaded() {
                this.loading = false;
                this.$emit('load');
            },
            init() {
                this.playerOptions.playable = false;
                this.$nextTick().then(() => {
                    this.playerOptions.poster = this.poster.lastIndexOf('http') == -1 ? this.appSettings.storageDomain + this.poster : this.poster;
                    this.playerOptions.sources[0].src = this.src;
                    this.playerOptions.sources[0].type = this.type;
                    this.playerOptions.playable = true;
                    this.playerOptions.autoplay = this.autoplay;
                    this.$emit('load');
                });
            }
        },
        watch: {
            'src'() {
                this.init();
            }
        },
        created() {
            this.init();
        },
        beforeDestroyed() {
            if (this.player)
                this.player.dispose();
        }
    }
</script>
