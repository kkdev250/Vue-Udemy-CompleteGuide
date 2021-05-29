<template>
    <div>
        <div
                id="on"
                @click="switched(true)"
                :class="{active: value}">On</div>
        <div
                id="off"
                @click="switched(false)"
                :class="{active: !value}">Off</div>
    </div>
</template>

<script>
    export default {
        props: ['value'], //aby stworzyć własny komponent - musi mieć prop 'value' - koniecznie o takiej nazwie (symulujący value np. w inpucie)...
        methods: {
            switched(isOn) {
                this.$emit('input', isOn);  //...i musi emitować event o nazwie 'input' - wtedy w parencie zadziała v-model dla tego komponentu
            }
        }
    }
</script>

<style scoped>
    #on, #off {
        width: 40px;
        height: 20px;
        background-color: lightgray;
        padding: 2px;
        display: inline-block;
        margin: 10px -2px;
        box-sizing: content-box;
        cursor: pointer;
        text-align: center;
    }

    #on:hover, #on.active {
        background-color: lightgreen;
    }

    #off:hover, #off.active {
        background-color: lightcoral;
    }

    #on {
        border-top: 2px solid lightgray;
        border-bottom: 2px solid lightgray;
        border-left: 2px solid lightgray;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    #off {
        border-top: 2px solid lightgray;
        border-bottom: 2px solid lightgray;
        border-right: 2px solid lightgray;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
</style>