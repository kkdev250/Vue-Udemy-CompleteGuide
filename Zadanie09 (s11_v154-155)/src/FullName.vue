<template>
    <div>
        <div class="form-group">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" class="form-control" v-model="value.first">
        </div>
        <div class="form-group">
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" class="form-control" v-model="value.last">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['value'],
        watch: {
            value() {
                this.$emit('input', value);
            }
        }
    }
</script>

<style>

</style>
