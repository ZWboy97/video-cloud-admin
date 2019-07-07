import axios from 'axios';

export const UserApi = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true
});

export const API = axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`,
    withCredentials: true
});

export const SRSAPI = axios.create({
    baseURL: '',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})