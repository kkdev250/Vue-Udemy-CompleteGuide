<template>
    <div>
        <button class="btn btn-primary" @click="increment">Increment</button>
        <button class="btn btn-primary" @click="decrement">Decrement</button>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        /*methods: {
            increment() {
                //this.$store.state.counter++;
                //this.$store.mutations.increment;  //NIE
                this.$store.commit('increment');
            },
            decrement() {
                //this.$store.state.counter--;
                this.$store.commit('decrement');
            }
        }*/
        methods: {
            ...mapMutations(['increment', 'decrement'])  //podobnie jak w mapowaniu getterów - tworzone są metody (tu o nazwach 'increment' i 'decrement') które commitują mutacje
        }
    }
</script>