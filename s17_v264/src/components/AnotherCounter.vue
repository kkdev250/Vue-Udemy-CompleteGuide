<template>
    <div>
        <button class="btn btn-primary" @click="increment(1)">Increment</button>
        <button class="btn btn-primary" @click="decrement(10)">Decrement</button>
    </div>
</template>

<script>
    //import { mapMutations } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
        methods: {
            //...mapMutations(['increment', 'decrement'])
            //...mapActions(['increment', 'decrement']),
            increment(by) {
                this.$store.dispatch('increment, by');
            },
            decrement(by) {
                this.$store.dispatch('decrement, by');
            }
        }
    }
</script>