<template>
    <div>
        <p>Server Status: {{ status }}</p>
        <button @click="changeStatus">Change Status</button>
        <hr>
    </div>
</template>

<script> //ten komponent jest lokalnie rejestrowany (i używany) w Home.vue
    export default {
        data: function() {
            return {
                status: 'Critical'
            }
        },
        methods: {
            //changeStatus: function() {}  //ES5
            changeStatus() { //ES6
                this.status = 'Normal';
            }
        }
    }
</script>