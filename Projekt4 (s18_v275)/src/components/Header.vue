<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" tag="a" class="navbar-brand">Stock Trader</router-link>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <router-link to="/portfolio" tag="li" activeClass="active"><a>Portfolio</a></router-link>
                <router-link to="/stocks" tag="li" active-class="active"><a>Stocks</a></router-link>
            </ul>
            <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#" @click="endDay">End Day</a></li>
                <li class="dropdown" 
                    :class="{open: isDropdownOpen}" 
                    @click="isDropdownOpen=!isDropdownOpen">
                    <a 
                        href="#" 
                        class="dropdown-toggle" 
                        data-toggle="dropdown" 
                        role="button"
                        >Save & Load <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#" @click="saveData">Save Data</a></li>
                        <li><a href="#" @click="loadData">Load Data</a></li>
                    </ul>
                </li>
            </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            isDropdownOpen: false
        }
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        }
    },
    methods: {
        ...mapActions([
            'randomizeStocks'
        ]),
        endDay() {
            this.randomizeStocks();
        },
        saveData() {
            const data = {
                funds: this.$store.getters.funds,
                stockPortfolio: this.$store.getters.stockPortfolio,
                stocks: this.$store.getters.stocks
            };
            this.$http.put('data.json', data); //'data.json' - nazwa node'a w firebase: xxx.json (.json musi być!!)
        },
        loadData() {
            this.$store.dispatch('loadData');
        }
    }
}
</script>

<style>

</style>
