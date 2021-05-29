import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://vue-axios-b53b6.firebaseio.com'
}); //zwraca nową instancję axios'a

instance.defaults.headers.common['SOMETHING'] = 'something';

export default instance;