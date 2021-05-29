<template>
    <div>
        <h1>The User Page</h1>
        <hr>
        <p>Loaded ID: {{id}}</p>
        <button class="btn btn-primary" @click="navigateToHome">Go to Home</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id //$route a nie $router!!!
            }
        },
        watch: {
            '$route'(to, from) { //bez tego 'loaded ID' się nie zmieniało
                this.id = to.params.id;
            }
        },
        methods: {
            navigateToHome() {
                this.$router.push('/'); //== {path: '/'}
            }
        }
        /*computed: {//zamiast watch
            cId() {
                return this.$route.params.id;
            }
        }*/
    }
</script>