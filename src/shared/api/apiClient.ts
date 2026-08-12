import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token && token !== 'null' && token !== 'undefined' && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        } else if (config.headers) {
            delete config.headers.Authorization;
        }   
    
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)