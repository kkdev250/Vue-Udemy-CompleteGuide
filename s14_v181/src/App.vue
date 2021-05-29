<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Animations</h1>
                <hr>
                <select v-model="alertAnimation" class="form-control">
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                </select>
                <br><br>
                <button class="btn btn-primary" @click="show = !show">Show Alert</button>
                <br><br>
                <transition :name="alertAnimation">
                    <div class="alert alert-info" v-if="show">This is some Info (transition-fade or animation-slide)</div>
                </transition>
                <transition name="slide" type="animation"> <!--ważne gdy jest mix animation i transition z różnymi czasami: określamy kiedy ma zadziałać v-if/v-show, tu po 1s a nie po 3s-->
                    <div class="alert alert-success" v-if="show">This is another Info (animation+transition)</div>
                </transition>
                <transition 
                    appear
                    enter-class=""
                    enter-active-class="animated bounce"
                    enter-to-class=""
                    leave-class=""
                    leave-active-class="animated shake"
                    leave-to-class=""
                >   <!--appear - animacja nie tylko na v-if/v-show ale także na starcie-->
                    <!--no "name" attribute - vue will look for "v-enter, v-enter-active etc. classes"-->
                    <!--BUT we can override that and specify the animation classes by ourselves, like: 'enter-class="my-class" - instead of 'v-enter' there will be used 'my-class'-->
                    <!--"animation bounce", "animation shake" - animation classes from https://daneden.github.io/animate.css/ -->
                    <div class="alert alert-info" v-if="show">This is some Info (initial transition)</div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: true,
                alertAnimation: 'fade'
            }
        }
    }
</script>

<style>
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        transition: opacity 1s;
    }
    .fade-enter-to {
        opacity: 1;
    }
    .fade-leave {
        /*opacity: 1;*/
    }
    .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-leave-to {
        opacity: 0;
    }

    .slide-enter {
        opacity: 0;
        /*transform: translateY(20px);*/
    }
    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
        transition: opacity 0.5s;
    }
    .slide-leave {
        /*transform: translateY(0);*/
    }
    .slide-leave-active {
        animation: slide-out 1s ease-out forwards;
        transition: opacity 3s;
        opacity: 0;
    }
    @keyframes slide-in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }
    @keyframes slide-out {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(20px);
        }
    }
</style>
