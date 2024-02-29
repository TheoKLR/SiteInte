import axios from "axios";
import { error } from "console";

export const api = axios.create({
    baseURL: "http://localhost:8000"
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
    );



