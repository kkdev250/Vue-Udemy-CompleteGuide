<template>
    <div>
        <p>{{ quote }}</p>
        <slot></slot>
        <div class="title">
            <slot name="title"></slot>
            <span style="color: #ccc"><slot name="subtitle">default slot value</slot></span>
        </div>
        <hr>
        <div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['quote']
    }
</script>

<style scoped>
    div {
        border: 1px solid #ccc;
        box-shadow: 1px 1px 2px black;
        padding: 30px;
        margin: 30px auto;
        text-align: center;
    }

    h1 {
        color: red;
    }

    .title {
        font-style: italic;
    }
</style>
