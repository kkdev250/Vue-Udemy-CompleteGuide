<template>
    <div class="container">
        <form v-if="!submitted">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <app-full-name v-model="person.name"></app-full-name>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" id="email" class="form-control" v-model="person.email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="person.password">
                    </div>
                    <label>Store Data?
                        <div class="form-group">
                            <label for="yes">Yes</label>
                            <input type="radio" id="yes" value="Yes" v-model="person.store">
                            <label for="no">No</label>
                            <input type="radio" id="no" value="No" v-model="person.store">
                        </div>
                    </label>
                    <div class="form-group">
                        <button class="btn btn-primary" @click.prevent="submitted=true">Submit</button>
                    </div>
                    <!-- Exercise 1 -->
                    <!-- Create a Signup Form where you retrieve the following Information -->
                    <!-- Full Name (First Name + Last Name) -->
                    <!-- Mail -->
                    <!-- Password -->
                    <!-- Store Data? Yes/No -->

                    <!-- Exercise 2 -->
                    <!-- Only display the Form if it has NOT been submitted -->
                    <!-- Display the Data Summary ONCE the Form HAS been submitted -->

                    <!-- Exercise 3 -->
                    <!-- Edit the Example from above and create a custom "Full Name" Control -->
                    <!-- which still holds the First Name and Last Name Input Field -->
                </div>
            </div>
        </form>
        <hr>
        <div class="row" v-if="submitted">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Full Name: {{person.name.first}} {{person.name.last}}</p>
                        <p>Mail: {{person.email}}</p>
                        <p>Password: {{person.password}}</p>
                        <p>Store in Database?: {{person.store}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FullName from './FullName.vue';
    export default {
        data() {
            return {                
                person: {
                    name: {
                        first: '',
                        last: ''
                    },
                    email: '',
                    password: '',
                    store: 'Yes'
                },
                submitted: false
            }
        },
        components: {
            appFullName: FullName
        }
    }
</script>

<style>
</style>
