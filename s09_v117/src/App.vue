<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <button @click="selectedComponent='appQuote'">Quote</button>
                <button @click="selectedComponent='appAuthor'">Author</button>
                <button @click="selectedComponent='appNew'">New</button>
                <hr>
                <p>{{ selectedComponent }}</p>
                <keep-alive>
                    <component :is="selectedComponent">Default Content</component>
                </keep-alive>
                <!-- <app-quote quote="A new wonderful quote! (passed by props)">
                   <h1 slot="title">{{ quoteTitle }}</h1>
                   <p slot="content">passed by named slot</p>
                   <p>content for unnamed (default) slot</p>
                   <p>additional content for unnamed (default) slot</p>
                </app-quote> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Quote from './components/Quote.vue';
    import Author from './components/Author.vue';
    import New from './components/New.vue';

    export default {
        data: function() {
            return {
                quoteTitle: 'The Quote',
                selectedComponent: 'appQuote'
            }
        },
        components: {
            appQuote: Quote,
            appAuthor: Author,
            appNew: New
        }
    }
</script>

<style>
</style>
