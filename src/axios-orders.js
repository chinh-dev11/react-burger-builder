import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://react-burger-builder-f2419.firebaseio.com'
    baseURL: 'https://burger-builder-react-8801d.firebaseio.com/'
});

export default instance;