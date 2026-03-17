import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (typeof error.response === 'undefined') {
            alert("A server/network error occurred.");
            return Promise.reject(error);
        }

        if (error.response.status === 401 && originalRequest.url === baseURL + 'auth/token/refresh/') {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.data.code === 'token_not_valid' && error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    try {
                        const response = await axiosInstance.post('/auth/token/refresh/', { refresh: refreshToken });
                        localStorage.setItem('access_token', response.data.access);
                        localStorage.setItem('refresh_token', response.data.refresh);
                        
                        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
                        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
                        
                        return axiosInstance(originalRequest);
                    } catch (err) {
                        console.log("Refresh token failed", err);
                    }
                } else {
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = '/login/';
                }
            } else {
                console.log("Refresh token not available.");
                window.location.href = '/login/';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
