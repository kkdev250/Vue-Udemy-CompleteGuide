<template>
    <div class="col-sm-6 col-md-4 py-2">
        <div class="card" :class="{'border-success': modeBuy, 'border-info': modeSell}">
            <div class="card-header" :class="{'text-success': modeBuy, 'text-info': modeSell}">
                {{stock.name}}
                <small>(Price: {{stock.price | currency}}
                <template v-if="modeSell">| Quantity: {{stock.quantity}}</template>
                )</small>
            </div>
            <div class="card-body" :class="{'text-success': modeBuy, 'text-info': modeSell}">
                <div class="float-left">
                    <input type="number" class="form-control" v-model.number="quantity">
                </div>
                <div class="float-right">
                    <button 
                        class="btn" 
                        :class="{'btn-success': modeBuy, 'btn-info': modeSell}"
                        :disabled="quantity==0 || blockBuy || blockSell"
                        @click="buyOrSell"
                    >{{btnText}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['stock', 'mode'],
    data() {
        return {
            quantity: 0
        }
    },
    computed: {
        modeBuy() {
            return this.mode=='buy';
        },
        modeSell() {
            return this.mode=='sell';
        },
        funds() {
            return this.$store.getters.funds;
        },
        blockBuy() {
            if (this.modeBuy) {
                return this.stock.price * this.quantity > this.funds;
            }
            return false;
        },
        blockSell() {
            if (this.modeSell) {
                return this.quantity > this.stock.quantity;
            }
            return false;
        },
        btnText() {
            if (this.blockBuy) {
                return 'funds?';
            } else if (this.blockSell) {
                return 'stocks?';
            } else {
                return this.mode;
            }
        }
    },
    watch: {
        quantity(newQ,oldQ) {
            if (newQ < 0) {
                this.quantity = 0;
            }
        }
    },
    methods: {
        buyOrSell() {
            switch(this.mode) {
                case 'buy': this.buyStocks(); break;
                case 'sell': this.sellStocks(); break;
            }
        },
        buyStocks() {
            this.$store.dispatch('buyStocks', {
                id: this.stock.id,
                quantity: this.quantity,
                price: this.stock.price
            });
            this.quantity = 0;
        },
        sellStocks() {
            this.$store.dispatch('sellStocks', {
                id: this.stock.id,
                quantity: this.quantity,
                price: this.stock.price
            });
            this.quantity = 0;
        }
    }
}
</script>
    
<style scoped>
    button {
        text-transform: capitalize;
    }
</style>
