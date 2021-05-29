<template>
    <div class="col-xs-12 col-sm-6">
        <ul class="list-group">
            <app-server-item 
                v-for="server in servers" :key="server.id" 
                :id="server.id" 
                :status="server.status"></app-server-item>
        </ul>
    </div>
</template>

<script>
    import { eventBus } from '../../main';
    import ServerItem from './ServerItem.vue';

    export default {
        components: {
            'app-server-item': ServerItem
        },
        data: function() {
            return {
                servers: [
                    {id: 1, status: 'Normal'},
                    {id: 2, status: 'Critical'},
                    {id: 3, status: 'Unknown'},
                    {id: 4, status: 'Normal'},
                    {id: 5, status: 'Critical'},
                ]
            };
        },
        created() {
            eventBus.$on('serverRestarted',(id)=>{
                this.servers.find(obj => obj.id==id).status='Normal';
            })
        }
    }
</script>

<style>
</style>
