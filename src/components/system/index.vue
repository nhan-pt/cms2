<template>
    <wrapper :title="$i('Dashboard')" sapo="">        
       <iframe style="width:100%; height:600px; border:none" :src="appSettings.mediaMonitorUrl"></iframe>
    </wrapper>
</template>
<script>
    export default {
        name: 'system'
    }
</script>