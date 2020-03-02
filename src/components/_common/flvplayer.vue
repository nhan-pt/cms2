<template>
    <video style="width:100%; height:50px" class="flv-player"
           controls></video>
</template>
<script>
    import flvjs from 'flv.js'
    export default {
        name: 'flvplayer',
        props: {
            mediaDataSource: {
                type: Object,
                required: true
            },
            config: {
                type: Object,
                required: false
            },
            autoplay: {
                type: Boolean,
                required: false,
            },
            poster: {
                type: String,
                required: false
            },
        },
        data() {
            return {
                isSupported: true,
                flvPlayer: {},
                state: {
                    load: false
                }
            }
        },
        methods: {
            constructor(mediaDataSource, config) {
                this.flvPlayer.constructor(mediaDataSource, config)
            },
            destroy() {
                this.flvPlayer.destroy()
            },
            on(event, listener) {
                this.flvPlayer.on(event, listener)
            },
            off(event, listener) {
                this.flvPlayer.off(event, listener)
            },
            load() {
                this.flvPlayer.load()
                this.state.load = true
                if (this.autoplay) {
                    this.play()
                }
            },
            unload() {
                this.flvPlayer.unload()
                this.state.load = false
            },
            play() {
                this.state.load || this.load()
                this.flvPlayer.play()
            },
            pause() {
                this.flvPlayer.pause()
            },
            refresh() {
                this.pause()
                this.unload()
                this.play()
            },
        },
        mounted() {
            this.flvPlayer.attachMediaElement(this.$el)
            if (this.autoplay) {
                this.play()
            }
        },
        created() {
            this.isSupported = flvjs.isSupported()

            this.flvPlayer = flvjs.createPlayer(this.mediaDataSource, this.config)
            console.log(this.mediaDataSource)
        }
    }
</script>