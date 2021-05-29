<template>
    <div class="row">
        <app-quote v-for="(quote, ix) in quotes" :key="ix" @click.native="deleteQuote(ix)">{{ quote }}</app-quote>
    </div>
</template>

<script>
    import Quote from './Quote.vue';

    export default {
        props: ['quotes'],
        components: {
            appQuote: Quote
        },
        methods: {
            deleteQuote(ix) {
                //this.quotes.splice(ix, 1); //tak też można: quotes jest obiektem przekazanym jako prop - czyli mamy tu wskaźnik na niego i modyfikujemy tak naprawdę obiekt źródłowy w App.vue
                this.$emit('quoteDeleted', ix);
            }
        }
    }
</script>

<style>

</style>
