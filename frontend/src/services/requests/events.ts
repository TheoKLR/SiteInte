import { api } from '../api';

export const getActiveEvents = async () => {
    try {
        const response = await api.get('/event/active');
        return response?.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des events actifs");
    }
}

export const getInactiveEvents = async () => {
    try {
        const response = await api.get('/event/inactive');
        return response?.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des events actifs");
    }
}

export const setActiveEvent = async (id: number) => {
    return await api.put('/event/start', { id });
    
}

export const setInactiveEvent = async (id: number) => {
    return await api.put('/event/finish', { id });
}


