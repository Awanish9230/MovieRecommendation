import api from '../api/axios.js';

export const registerUser = async (userData) => {
    const response =await api.post('/auth/register', userData);
    return response.data;
}

export const loginUser = async (userData) => {
    const response =await api.post('/auth/login', userData);
    return response.data;
}

export const refreshToken= async (token) => {
    const response =await api.post('/auth/refresh', token);
    return response.data;
}

