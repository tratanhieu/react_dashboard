import axios from 'axios';
import cookie from 'js-cookie'

const tokenAuth = cookie.get("USER_TOKEN")

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 10000,
    headers: {
        Authorization: `Beazer ${tokenAuth}`
    }
});

// if (tokenAuth) {
//     instance.defaults.headers.common['Authorization'] = `Beazer ${tokenAuth}`
// }

export default instance