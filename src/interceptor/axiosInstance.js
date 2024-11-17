import axios from 'axios';

const API_URL = 'http://5.34.201.164:3000/api';

//  axios
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// intercepto
axiosInstance.interceptors.request.use(
    (config) => {
        //  localStorage
        const token = localStorage.getItem('authToken');

        //  Authorization
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.warn("No auth token found in localStorage");
        }


        return config;
    },
    (error) => {

        console.error("Request error:", error);
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Redirecting to login.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
