import axios from 'axios';

const api = axios.create({
    baseURL:'https://economia.awesomeapi.com.br/all'
})

export default api;