import axios from 'axios';

const http = axios.create({
    // baseURL: 'http://localhost:5005',
    baseURL: 'http://35.224.83.14:5005'
    // baseURL: '../../zipnews.postman_collection.json'
});

export {http};