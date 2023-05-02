import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5005',
    // baseURL: '../../zipnews.postman_collection.json'
});

export {http};