<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  @input_COMMENTED_OUT="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  v-model.lazy="email"> <!--modyfikator .lazy - model będzie update'owany (i walidowany) dopiero po opuszczeniu pola-->
          <p>{{email}}</p>
          <small v-if="!$v.email.mail">Please provide a valid email address.</small>
          <small v-if="!$v.email.req">This is a mandatory field</small>
<textarea rows="20" cols="50" v-text="JSON.stringify($v, null, 4)"></textarea>
<!--dla 'abc.pl' wpisanego jako email: 
zawartość obiektu $v:
{
	"email": { //dot. walidacji modelu 'email':
		"req": true, //walidator 'req' pokazuje, że jest ok - pole jest wymagane, i zostało wypełnione
		"mail": false, //walidator 'mail' pokazuje, że jest email jest niepoprawny
		"$model": "abc.pl",
		"$invalid": true, //no bo faktycznie nie mamy dobrego emaila (ale dla pustego pola invalid też jest true!!)
		"$dirty": true, //pole nie jest puste
		"$anyDirty": true,
		"$error": true, //to co wprowadziliśmy jest niepoprawne (dla pustego pola error jest false)
		"$anyError": true,
		"$pending": false,
		"$params": {
			"req": {
				"type": "required" //walidator o nazwie 'req' jest walidatorem typu 'required' z biblioteki vuelidate
			},
			"mail": {
				"type": "email" //walidator o nazwie 'req' jest walidatorem typu 'email' z biblioteki vuelidate
			}
		}
	},
	"$model": null,
	"$invalid": true, //cały formularz jest invalid
	"$dirty": true, //cały formularz jest dirty 
	"$anyDirty": true,
	"$error": true, //cały formularz ma error
	"$anyError": true,
	"$pending": false,
	"$params": {
		"email": null
	}
}-->
        </div>
        <div class="input" :class="{invalid: $v.age.$error}"> <!--aby działał $error musi być $dirty=true-->
          <label for="age">Your Age</label>
          <input
                  type="number"
                  id="age"
                  @blur="$v.age.$touch()"
                  v-model.number="age"> 
                  <!--przy pierwszym blur robimy touch() - ustawiamy $dirty na true (NIE jest to jednokrotne odpalenie walidatora przy blur!)-->
                  <!--walidacja i tak działa przy każdej zmianie w modelu - ale ustawienie dirty na true powoduje, że działa $error ($error=$invalid && $dirty-->)
          <small v-if="!$v.age.minVal">You have to be at least {{$v.age.$params.minVal.min}} years old.</small>
<div><small><pre>{{JSON.stringify($v.age, null, 4)}}</pre></small></div>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  @blur="$v.password.$touch()"
                  v-model="password">
<div><small><pre>{{JSON.stringify($v.password, null, 4)}}</pre></small></div>
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  @blur="$v.confirmPassword.$touch()"
                  v-model="confirmPassword">
<div><small><pre>{{JSON.stringify($v.confirmPassword, null, 4)}}</pre></small></div>
        </div>
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>
        <div class="hobbies">
          <h3>Add some Hobbies</h3>
          <button @click="onAddHobby" type="button">Add Hobby</button>
          <div class="hobby-list">
            <div
                    class="input"
                    v-for="(hobbyInput, index) in hobbyInputs"
                    :class="{invalid: $v.hobbyInputs.$each[index].value.$error}"
                    :key="hobbyInput.id">
                <!--$error==true gdy ($invalid==true AND $dirty==true)
                    $invalid reaguje na żywo (przy każdej zmianie w modelu), ale $dirty na początku jest cały czas false -> $error==false
                    wywołanie touch() ustawia $dirty na true (poniżej - na onBlur)
                    i od tego momentu $error reaguje tak samo jak $invalid
                -->
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                      type="text"
                      :id="hobbyInput.id"
                      @blur="$v.hobbyInputs.$each[index].value.$touch()"
                      v-model="hobbyInput.value">
              <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
            </div>
            <p v-if="!$v.hobbyInputs.minLen">You have to specify at least {{ $v.hobbyInputs.$params.minLen.min}} hobbies.</p> <!--minLen reaguje na żywo, nie ma związku z onBlur i touch()-->
            <p v-if="!$v.hobbyInputs.required">Please add hobbies</p> <!--required reaguje na żywo, nie ma związku z onBlur i touch()-->
          </div>
<div><small><pre>{{JSON.stringify($v.hobbyInputs, null, 4)}}</pre></small></div>
        </div>
        <div class="input inline" :class="{invalid: $v.terms.$error}">
          <input 
            type="checkbox" 
            id="terms" 
            @change="$v.terms.$touch()"
            v-model="terms">
          <label for="terms">Accept Terms of Use</label>
<div><small><pre>{{JSON.stringify($v.terms, null, 4)}}</pre></small></div>
        </div>
        <div class="submit">
          <button type="submit" :disabled="$v.$invalid">Submit</button> <!--$v.$invalid - ogólne invalid (całego formularza), będzie false, gdy cały form będzie wypełniony-->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, numeric, minValue, minLength, sameAs } from 'vuelidate/lib/validators';
  import axios from 'axios'

  export default {
    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        hobbyInputs: [],
        terms: false
      }
    },
    validations: { //dodane dzięki Vue.use(Vuelidate)
        email: {  //model, który walidujemy: nazwa musi być jak w 'data' powyżej (jak w v-model), potem w inpucie trzeba dodać np.: @blur="$v.email.$touch()" - aby ustawić $dirty
            req: required, //zaimportowany walidator typu required, nadana nazwa: req
            mail: email, //zaimportowany walidator typu email, nadana nazwa: mail
            /*najczęściej jednak nie nadaje się własnych nazw:
            required,  //czyli required: required,
            email      //i     email: email
            */
           unique: val => { //CUSTOM validator (funkcja zwracająca true/false (true - walidacja ok)) - ten walidator sprawdzi czy w bazie jest już user o takim emailu
                //przykład 1: return false
                //przykład 2: return val != 'test@test.com'
                if (val === '') return true; //gdy nic nie jest wprowadzone to ten walidator ma nie działać (nie ma co sprawdzać -> musi zwrócić ok)
                //przykład 3: 
                /*return new Promise((resolve, reject) => {
                    setTimeout(()=>{
                        resolve(val !== 'test@test.com')  //zamiast zwracać true/false można zwrócić Promise, który po pewnym czasie odpali resolve() z true/false
                    }, 2000);
                })*/
                //przykład 4:
                return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"') //zapytanie do Firebase'a o usera z danym emailem
                    .then(res => {                                         //w Firebase trzeba było dodać rule "users": {".indexOn": ["email"]} aby można był przeszukiwać node 'users' po emailu
                        console.log(res);
                        return Object.keys(res.data).length === 0 //jeśli zamiast obiektu usera z bazy otrzymano pusty obiekt -> nie znaleziono w bazie usera z takim mailem -> mail jest wolny
                    })
           } 
        },
        age: { //validation rules set (validation group) for the 'age' model:
            required,
            numeric,
            minVal: minValue(18)
        },
        password: {
            required,
            minLen: minLength(6)
        },
        confirmPassword: {
            //sameAs: sameAs('password')  //prostsza wersja...
            sameAs: sameAs(vm => {
                return vm.password + 'c'; //...lub tak, jeśli jest wymóg aby 'confirm password' było takie jak 'password' ale miało na koniec dodatkowo literę 'c'
            })
        },
        terms: {
            //checked(val) {return val;},  //CUSTOM validator o nazwie 'checked' - zwróci '' (false) dla pustego checkboxa (wywołamy go na onChange)
            checkedExceptDE: function(val) {
                return this.country === 'germany' ? true : val
            }  //CUSTOM validator - zwróci false dla pustego checkboxa, ale jeśli kraj to germany - zawsze zwróci true (wywołamy go na onChange)
        },
        hobbyInputs: {
            required,
            minLen: minLength(2),
            $each: { //tablica hobbyInputs składa się z obiektów {id: ..., value: ...} - i dla każdego z nich:
                value: {
                    required,
                    minLen: minLength(5)
                }
            }
        }
    },
    methods: {
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      onSubmit () {
        const formData = {
          email: this.email,
          age: this.age,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country,
          hobbies: this.hobbyInputs.map(hobby => hobby.value),
          terms: this.terms
        }
        console.log(formData);
        this.$store.dispatch('signup', formData);
      }
    }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input.invalid label {
      color: red;
  }

  .input.invalid input {
      border: 1px solid red;
      background-color: #ffc9aa;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>