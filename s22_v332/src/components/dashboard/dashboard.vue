<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>Your email address: {{ email }}</p>
  </div>
</template>

<script>
import axios from 'axios'; 
//import axios from 'axios' jest tu potrzebne - mimo, iż jest też w main.js
//bo dla axiosa nie robimy w main.js: Vue.use(axios)
//ani potem nie dodajemy axios do new Vue()
//czyli teraz nie można użyć this.$axios - tylko trzeba w każdym komponencie importować axios'a.
//(ale instancja axiosa będzie i tak tylko jedna)

export default {
    data() {
        return {
            email: ''
        }
    },
    created() {
        //axios.get('https://vue-axios-b53b6.firebaseio.com/users.json')
        axios.get('/users.json')
            .then(response => {
                console.log(response);
                const data = response.data;
                const users = [];
                for (let key in data) { //INSTRUKCJA FOR-IN TWORZY PRZY KAŻDYM WYKONANIU NOWY BLOCK SCOPE!!! ('normalny' for nie!)...
                    //users.push(data[key].email);
                    const user = data[key];  //...i dlatego może być to 'const' w pętli
                    user.id = key;
                    users.push(user);
                }
                console.log(users);
                this.email = users[0].email;
            })
            .catch(error => console.log(error))
    }
}
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>