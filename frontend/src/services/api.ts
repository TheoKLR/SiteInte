import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000"
});

//Permet d'inclure le token d'authentification automatiquement dans l'en-tête de nos requêtes axios
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



