<template>
    <div class="container">
        <app-header></app-header>
        <div class="row">
            <div class="col-12">
                <transition name="slideX" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        
    </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
    data () {
        return {
            test: 'asfdsfa'
        }
    },
    components: {
        appHeader: Header
    },
    created() {
        this.$store.dispatch('initStocks');
    }
}
</script>

<style>
    body {
        padding: 30px;
    } 
    .slideX-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }
    .slideX-leave-active {
        animation: slide-out 200ms ease-out forwards;
    } 
    @keyframes slide-in {
        from {
            transform: translateX(-30px);
            opacity: 0;
        }
        to {
            transform: translateX(0px);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateX(0px);
            opacity: 1;
        }
        to {
            transform: translateX(30px);
            opacity: 0;
        }
    } 
</style>
