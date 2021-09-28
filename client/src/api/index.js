import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});


export const login = (form) => API.post('/api/users/login', form);
export const register = (form) => API.post('/api/users/register', form);
export const hostLogin = (form) => API.post('/api/hosts/login', form);
export const hostRegister = (form) => API.post('/api/hosts/register', form);

// Exam
export const questions = (testId, questionId) => API.get(`api/questions/${testId}/${questionId}`); 
