import axios from 'axios'

export function saveToken(token) {
    localStorage.setItem("accessToken", token);
}

export function getToken() {
    return localStorage.getItem("accessToken");
}

export const baseApi = import.meta.env.VITE_API_URL;

export const axiosToken = axios.create({
    baseURL: baseApi
});

axiosToken.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        config.headers["Cache-Control"] = "no-cache";
        return config
    },
    (error) => Promise.reject(error)
);

