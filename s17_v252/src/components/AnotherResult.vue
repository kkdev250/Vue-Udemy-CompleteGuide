<template>
    <div>
        <!--<p>Counter is: {{ counter }}</p>
        <p>Number of Clicks: {{ clicks }}</p>-->
        <p>Counter is: {{ doubleCounter }}</p>
        <p>Number of Clicks: {{ stringCounter }}</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        //props: ['counter']
        /*computed: {
            counter() {
                //return this.$store.state.counter * 2;
                return this.$store.getters.doubleCounter;
            },
            clicks() {
                return this.$store.getters.stringCounter;
            }
        }*/
        computed: mapGetters([   //ew.: //computed: mapGetters({
            'doubleCounter',            //  counter: 'doubleCounter',
            'stringCounter'             //  clicks: 'stringCounter'
        ])                              //})
    }
</script>