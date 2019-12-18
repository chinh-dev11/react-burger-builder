import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-8801d.firebaseio.com/'
});

export default instance;