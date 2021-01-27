import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dreezefy.herokuapp.com',
});

export default api;
