<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light mb-4">
        <router-link to="/" tag="a" class="navbar-brand">Stock Trader</router-link>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <router-link class="nav-item" to="/portfolio" tag="li" activeClass="active">
                    <a class="nav-link">Portfolio</a>
                </router-link>
                <router-link class="nav-item" to="/stocks" tag="li" activeClass="active">
                    <a class="nav-link">Stocks</a>
                </router-link>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="endDay">End Day</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" 
                        @click="showDropdown = !showDropdown"
                        href="#">Save & Load
                    </a>
                    <div class="dropdown-menu" :class="{show: showDropdown}">
                        <a class="dropdown-item" @click="saveData">Save Data</a>
                        <a class="dropdown-item" @click="loadData">Load Data</a>
                    </div>
                </li>
            </ul>
            <strong class="navbar-text ml-3">Funds: {{funds | currency}}</strong>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            showDropdown: false
        }
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        }
    },
    methods: {
        endDay() {
            this.$store.dispatch('rndStocks');
        },
        saveData() {
            this.$store.dispatch('saveData');
            this.showDropdown = false;
        },
        loadData() {
            this.$store.dispatch('loadData');
            this.showDropdown = false;
        }
    }
}
</script>

<style>
</style>
