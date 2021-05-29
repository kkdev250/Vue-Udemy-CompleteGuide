<template>
    <ul class="nav nav-pills">
        <!--rozwiązanie bez <a>, klasa "router-link-active" jest nadawana wyrenderowanemu przez <router-link> aktywnemu <a> :-->
        <!--(ale aby nav-pill był aktywny <li> musi mieć klasę "active")-->
    <!--<li><router-link to="/">Home</router-link></li>
        <li><router-link to="user">User</router-link></li>  -->

        <!--usunięte <li>, dodane 'tag="li"' - <li> będzie wyrenderowane automatycznie, dodane active-class="active", dodane <a> -->
        <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link> <!--exact: aby była klasa 'active' url musi nie zawierać ale być=='/'-->
        <router-link to="/user/1" tag="li" active-class="active"><a>User 1</a></router-link>    <!--tag="li" - <router-link> zamieni się na <li>-->
        <router-link to="/user/2" tag="li" active-class="active"><a>User 2</a></router-link>
    </ul>  
</template>

<script>
    export default {

    }
</script>

<style>

</style>
