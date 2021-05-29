<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" v-model="user.username">
                </div>
                <div class="form-group">
                    <label>Mail</label>
                    <input type="text" class="form-control" v-model="user.email">
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <hr>
                <select class="form-control" v-model="node">
                    <option value="data">data</option>
                    <option value="alternative">alternative</option>
                </select>
                <button class="btn btn-primary" @click="fetchData">Get Data</button>
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(u, ix) in users" :key="ix">{{ u.username }} - {{ u.email }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    email: ''
                },
                users: [],
                resource: {},
                node: 'data'
            }
        },
        methods: {
            submit() {
                //console.log(this.user);
                /*this.$http.post('data.json', this.user) // funkcjonalność 'this.$http' jest dodana przez vue-resource
                    .then(response => {
                        console.log(response);
                    }, error => {
                        console.log(error);
                    });*/
                //albo inaczej - zamiast $http.post można użyć resource'ów:
                //this.resource.save({}, this.user); 
                //albo custom resources:
                this.resource.saveAlt({node: this.node}, this.user) //funkcjonalność 'saveAlt' dodana w hooku 'created'
            },
            fetchData() {
                /*this.$http.get('data.json') //bazowa część url zapisana w main.js
                .then(response => {
                    //console.log(response);
                    //console.log(response.json());
                    return response.json();
                }).then(data => {
                    //console.log(data);
                    const resultArray = [];
                    for (let key in data) {
                        resultArray.push(data[key]);
                    }
                    this.users = resultArray;
                });*/
                this.resource.getData({node: this.node})
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        const resultArray = [];
                        for (let key in data) {
                            resultArray.push(data[key]);
                        }
                        this.users = resultArray;
                    });
            }
        },
        created() {
            const customActions = {
                saveAlt: {method: 'POST' /*, url: 'alternative.json'*/},
                getData: {method: 'GET'}
            };
            //this.resource = this.$resource('data.json', {}, customActions); // funkcjonalność 'this.$resource' jest dodana przez vue-resource
            this.resource = this.$resource('{node}.json', {}, customActions);
        }
    }
</script>

<style>
</style>
