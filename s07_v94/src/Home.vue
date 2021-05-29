<template>
    <div>
        <app-server-status v-for="server in 5"></app-server-status>
    </div>
</template>

<script> //ten komponent jest globalnie rejestrowany w main.js i używany w App.vue
    import ServerStatus from './ServerStatus.vue';
    export default {
        components: {
            'app-server-status': ServerStatus
        }
    }
</script>