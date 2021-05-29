<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Edit me!</p>
        <p>User Age: {{ userAge }}</p>
        <button @click="editAge">Edit Age (and emit custom event)</button><br>
        <button @click="ageCallback(31)">Edit Age (and run parent callback)</button><br>
        <button @click="editAgeBus">Edit Age (and use the event bus)</button><br>
        <button @click="editAgeBus2">Edit Age (and use the event bus - v2)</button>
    </div>
</template>

<script>
    import { eventBus } from '../main'; 

    export default {
        props: ['userAge', 'ageCallback'],
        methods: {
            editAge() {
                this.userAge = 30;
                this.$emit('ageWasEdited', this.userAge);
            },
            editAgeBus() {
                eventBus.$emit('ageWasEdited', '32');
            },
            editAgeBus2() {
                eventBus.changeAge('33');
            }
        }
    }
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>
