import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-370c6.firebaseio.com/'
});


export default instance;
