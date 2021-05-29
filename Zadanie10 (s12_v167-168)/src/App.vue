<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1 >Directives Exercise</h1>
                <!-- Exercise -->
                <!-- Build a Custom Directive which works like v-on (Listen for Events) -->
                <button v-my-on:click="showAlert" class="btn btn-primary">Click me</button>
                <hr>
                <div 
                    v-my-on:mouseenter="mouseEnter" 
                    v-my-on:mouseleave="mouseLeave"
                    style="width: 100px; height:100px; background-color: lightgreen"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        directives: {
            'my-on': {
                bind(el, binding, vnode) {
                    /*el.onclick = function() {
                        binding.value();
                    }*/
                    el.addEventListener(binding.arg, binding.value);
                }
            }
        },
        methods: {
            showAlert() {
                alert('Clicked!')
            },
            mouseEnter() {
                console.log('Mouse entered');
            },
            mouseLeave() {
                console.log('Mouse left')
            }
        }
    }
</script>

<style>
</style>
