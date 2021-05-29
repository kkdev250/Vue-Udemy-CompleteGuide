<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <br>
                <button class="btn btn-primary" @click="componentToLoad='app-blue'">Load Blue Template</button>
                <button class="btn btn-success" @click="componentToLoad='app-green'">Load Green Template</button>
                <button class="btn btn-danger" @click="componentToLoad='app-red'">Load Red Template</button>
                <hr>
                <component :is="componentToLoad">
                    <h1>Some exemplary text</h1>
                </component>
            </div>
        </div>
    </div>
</template>

<script>
    import Blue from './components/Blue.vue';
    import Green from './components/Green.vue';
    import Red from './components/Red.vue';

    export default {
        components: {
            appBlue: Blue,
            appGreen: Green,
            appRed: Red
        },
        data() {
            return {
                componentToLoad: 'app-blue'
            }
        }
    }
</script>

<style>
</style>
