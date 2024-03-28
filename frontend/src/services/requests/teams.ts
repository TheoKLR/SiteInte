import { api } from '../api';

export const createTeam = async (name: string) => {
    return await api.post('team', { name })
}

export const deleteTeam = async (id: number) => {
    return await api.delete('team/' + id)
}

export const addToFaction = async (teamIds: number[], factionId: number) => {
    await api.put('team/addtofaction', {
        teamIds,
        factionId,
    })
}

export const setTimestamp = async (timestamp: number) => {
    try {
        const response = await api.put('/team/timestamp');
        return response?.data.data;
    } catch (error) {
        console.error("Erreur lors de l'envoi de la candidature CE lors du shotgun");
    }
}

// Obtention de la liste des équipes enregistrées dans la db
export const getAllTeams = async () => {
    const response = await api.get('team/all')
    return response.data
}