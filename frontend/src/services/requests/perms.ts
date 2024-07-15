import { api } from '../api';

export const createPerm = async (name: string, desc:string, startingTime:string, duration:number, studentNumber:number) => {
    console.log({ name, desc, startingTime, duration, studentNumber });
    return await api.post('permanence', { name, desc, startingTime, duration, studentNumber });
}

export const deletePerm = async (id: number) => {
    return await api.delete('permanence/' + id);
}

export const getAllPerms = async () => {
    try {
        const response = await api.get('permanence/all');
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des perms");
    }
}