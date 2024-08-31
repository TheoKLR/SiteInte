import { api } from '../api';

export const createFaction = async (name: string) => {
    return await api.post('faction', { name });
}

export const deleteFaction = async (id: number) => {
    return await api.delete('faction/' + id);
}

export const getAllFactions = async () => {
    try {
        const response = await api.get('faction/all');
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des factions");
    }
}