import axios from 'axios';
import cookie from 'js-cookie'
import { USER_TOKEN } from '../constants';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 10000,
    headers: {
        Authorization: `Bearer ${cookie.get(USER_TOKEN)}`
    }
})

export default instance