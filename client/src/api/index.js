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

//Settings
export const userSettings = (email) => API.get(`api/settings/${email}`);

// Exam
export const questions = (testId, questionId) => API.get(`api/questions/${testId}/${questionId}`);

// Create Test
export const createTest = (form) => API.post('api/questions/test_id', form);
export const joinexam = (form) => API.post('api/tests/join', form);