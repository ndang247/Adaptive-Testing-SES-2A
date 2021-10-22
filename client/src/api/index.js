import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// Authentication
export const login = (form) => API.post('/api/users/login', form);
export const register = (form) => API.post('/api/users/register', form);
export const hostLogin = (form) => API.post('/api/hosts/login', form);
export const hostRegister = (form) => API.post('/api/hosts/register', form);

// For Settings
export const getUserById = (id) => API.get(`api/users/${id}`);
export const updateUser = (id, form) => API.patch(`api/settings/${id}`, form);

// Exam
export const createExam = (newExam) => API.post('api/tests', newExam);
export const getExamsByCreator = (creatorId) => API.get(`api/tests/${creatorId}`);
export const validateExamPin = (form) => API.post('api/tests/validate', form);
export const getExamById = (id) => API.get(`api/tests/user/exam/${id}`);
export const getPastExams = () => API.get('api/tests/user/history');

// Query
export const createQuery = (newQuery) => API.post('api/queries', newQuery);