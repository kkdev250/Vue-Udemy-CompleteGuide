<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name (reversed): {{ reverseName() }}</p>
        <p>User Age: {{ userAge }}</p>
        <button @click="resetName">Reset Name (and emit custom event)</button><br>
        <button @click="resetFn()">Reset Name (and run parent callback function)</button>
    </div>
</template>

<script>
    import { eventBus } from '../main';

    export default {
        //props: ['myName'], - array of props, without validation
        props: {
            myName: {
                type: String, //valid type
                //type: [String, Array] //multiple valid types
                required: true, //in parent you'll HAVE TO pass this prop
                //default: 'Maximilian' //when required==false
            },
            resetFn: Function,
            userAge: Number
        },
        methods: {
            reverseName() {
                return this.myName.split("").reverse().join("");
            },
            resetName() {
                this.myName = 'Max'; //Uwaga: gdyby prop 'myName' był typu array/object to de facto byłby wskaźnikiem na obiekt/array w parencie - i zmiana tu zmieniłaby parenta. 
                                     //Dla typów prymitywnych zmiana propsa w childzie nie ma wpływu na parenta.
                this.$emit('nameWasReset', this.myName);
            }
        },
        created() {
            eventBus.$on('ageWasEdited', (age) => {
                this.userAge = age;
            });
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
