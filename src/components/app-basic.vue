<template>
    <div id="app-basic">
        <router-view></router-view>
        <back2top></back2top>
    </div>
</template>
<script>
    import back2top from './_shared/back2top.vue';
    export default {
        name: 'app-basic',
        components: { back2top }
    }
</script>