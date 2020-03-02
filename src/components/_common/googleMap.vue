<template>
  <GmapMap style="width: 100%; height: 300px;" :zoom="12" :center="center" @click="setLocation">
    <GmapMarker :draggable="true" :position="marker" @drag="setLocation"/>
  </GmapMap>
</template>

<script>

    export default {
        props: ['value'],
        data() {
            return {
                center: { lat: 35.6585848, lng: 139.7432 },
                marker: null,
                place: null,
            }
        },
        watch: {
            'marker'() {
                this.$emit('input', this.marker);
            },
            'value.lat'() {
                this.setLocationDefault()
            }
        },
        methods: {
            setLocationDefault() {
                this.center = this.marker = this.value
            },
            setLocation(location) {
                let lat = location.latLng.lat();
                let lng = location.latLng.lng()
                this.marker = {
                    lat: lat,
                    lng: lng
                }
            },
            geolocate: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.marker = this.center
                });
            }
        },
        mounted() {
            this.geolocate();
        },

    }
</script>
