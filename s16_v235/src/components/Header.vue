<template>
    <ul class="nav nav-pills">
        <!--rozwiązanie bez <a>, klasa "router-link-active" jest nadawana wyrenderowanemu przez <router-link> aktywnemu <a> :-->
        <!--(ale aby nav-pill był aktywny <li> musi mieć klasę "active")-->
    <!--<li><router-link to="/">Home</router-link></li>
        <li><router-link to="user">User</router-link></li>  -->

        <!--usunięte <li>, dodane 'tag="li"' - <li> będzie wyrenderowane automatycznie, dodane active-class="active", dodane <a> -->
        <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link> <!--exact: aby była klasa 'active' url musi nie zawierać ale być=='/'-->
        <router-link to="/user" tag="li" active-class="active"><a>User</a></router-link>    <!--tag="li" - <router-link> zamieni się na <li>-->
    </ul>  
</template>

<script>
    export default {

    }
</script>

<style>

</style>
