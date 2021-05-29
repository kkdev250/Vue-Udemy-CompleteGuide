<template>
    <div>
        <h1>Filters & Mixins</h1>
        <input v-model="filterText">
        <ul>
            <li v-for="(fruit, ix) in filteredFruits" :key="ix">{{ fruit }}</li>
        </ul>
    </div>
</template>

<script>
    import { fruitMixin } from './fruitMixin';
    export default {
        mixins: [fruitMixin], //nie ['fruitMixin']!!!
        created() {
            console.log('Inside List Created Hook');
        }
    }
</script>

<style>

</style>
