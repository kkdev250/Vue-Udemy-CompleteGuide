<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Built-in Directives</h1>
                <p v-text="'Some Text'"></p>
                <p v-html="'<strong>Some strong text</strong>'"></p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Custom Directives</h1>
                <p v-highlight:background="'red'">Color this</p>
                <p v-highlight="'red'">Color this</p>
                <p v-highlight:background.delayed="'green'">Color this</p>
                <p v-local-highlight:background.delayed.blink="{mainColor: 'red', secondColor: 'green', delay: 500}">Coloured with local directive</p>
            </div>
        </div>
    </div>
</template>

<script>
//szablon dyrektywy: v-dyrektywa:arg.modifier="value"

    export default {
        directives: {  //rejestracja lokalna dyrektyw
            'local-highlight': {
                bind(el, binding, vnode) { 
                    var delay = 0;
                    if (binding.modifiers['delayed']) {
                        delay = 3000;
                    }
                    if (binding.modifiers['blink']) {
                        let mainColor = binding.value.mainColor;
                        let secondColor = binding.value.secondColor;
                        let currentColor = mainColor;
                        setTimeout(()=>{
                            setInterval(()=>{
                                currentColor = currentColor==secondColor ? mainColor : secondColor;
                                if (binding.arg == 'background') {
                                    el.style.backgroundColor = currentColor;
                                } else {
                                    el.style.color = currentColor;
                                }
                            } , binding.value.delay);
                        }, delay)
                    } else {
                        setTimeout(()=>{
                            if (binding.arg == 'background') {
                                el.style.backgroundColor = binding.value.mainColor;
                            } else {
                                el.style.color = binding.value.mainColor;
                            }
                        }, delay);
                    }
                }
            }
        }
    }
</script>

<style>

</style>
