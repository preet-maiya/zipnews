import axios from 'axios';

const http = axios.create({
    baseURL: '<base_url>',
    headers: {
    }
});

export default http