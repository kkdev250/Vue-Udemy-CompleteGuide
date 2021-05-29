<template>
    <div>
        <p>Counter is: {{ doubleCounter }}</p>
        <p>Number of Clicks: {{ stringCounter }}</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        /*computed: {
            counter() {
                //return this.$store.state.counter * 2;
                return this.$store.getters.doubleCounter;
            },
            clicks() {
                return this.$store.getters.stringCounter;
            }
        }*/
        computed: {
            ...mapGetters([  //mapGetters zwraca obiekt z computed properties (taki jak wyżej). Spread operator (...) wyciąga pary key-value z tego obiektu i umieszcza na zewnątrz
                'doubleCounter',
                'stringCounter'
            ]),
            anotherComputedProperty() {}
        }
    }
</script>