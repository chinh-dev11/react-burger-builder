import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-f2419.firebaseio.com'
});

export default instance;