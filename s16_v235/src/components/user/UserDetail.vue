<template>
    <div>
        <h3>Some User Details</h3>
        <p>User loaded has ID: {{ $route.params.id }}</p>
        <router-link 
            tag="button" 
            :to="link"
            class="btn btn-primary">Edit User</router-link> <!--było :to="$route.params.id+'/edit'"-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                link: {
                    /*path: */ 
                    name: 'userEdit', 
                    params: { 
                        id: this.$route.params.id 
                    }, 
                    query: { 
                        locale: 'en', 
                        q: 100 
                    },
                    hash: '#data' //scroll to fragment with id="data"
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            if (true) {
                next();
            } else {
                next(false);
            }
        }
    }
</script>
