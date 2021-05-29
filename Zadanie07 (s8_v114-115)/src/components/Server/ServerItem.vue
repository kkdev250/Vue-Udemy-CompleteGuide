<template>
    <li @click="showDetails" class="list-group-item">
        Server #{{id}} - status: {{status}}
    </li>
</template>

<script>
    import { eventBus } from '../../main';

    export default {
        props: ['id', 'status'],
        methods: {
            showDetails() {
                eventBus.$emit('serverClicked', {'id': this.id, 'status': this.status});
            }
        }
    }
</script>

<style scoped>
    li {
        cursor: pointer;
    }
</style>
