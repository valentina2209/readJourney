import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 1. Request Interceptor
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
);

// 2. Response Interceptor (Без циклічного refresh)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Очищаємо застарілі токени
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');

            // Якщо ми ще не на сторінці входу — перенаправляємо
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);