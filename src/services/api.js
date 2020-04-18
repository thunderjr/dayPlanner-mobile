import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.10:3333'
    // baseURL: 'http://192.168.42.139:3333'
})

export default api;