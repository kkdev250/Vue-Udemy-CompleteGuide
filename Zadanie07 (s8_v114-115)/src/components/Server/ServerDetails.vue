<template>
    <div class="col-xs-12 col-sm-6">
        <p v-if="!updated">Server Details are currently not updated</p>
        <template v-else>
            <p>Server no.: {{id}}</p>
            <p>status: {{status}}</p>
            <button 
                v-if="status!='Normal'"
                @click="restartServer">Restart server</button>
        </template>
    </div>

</template>

<script>
    import { eventBus } from '../../main';

    export default {
        data: function() {
            return {
                updated: false,
                id: null,
                status: null
            }
        },
        created() {
            eventBus.$on('serverClicked', (data) => {
                this.updated = true;
                this.id = data.id;
                this.status = data.status;
            })
        },
        methods: {
            restartServer() {
                eventBus.$emit('serverRestarted', this.id);
            }
        }
    }
</script>

<style>
</style>
