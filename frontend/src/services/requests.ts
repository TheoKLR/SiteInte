import { api } from './api';


export const getAllUsers = async() => {
    let response = await api.get('user/all')
    return response.data
}

export const getAllTeams = async() => {
    const response = await api.get('team/all')
    return response.data
}

export const getAllDesires = async() => {
    let response = await api.get('desire/all')
    return response.data
}

export const createDesire = async (name: string, desc: string) => {
    try {
        const response = await api.post('/desire/', { name, desc });
        return response.data; 
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du desire :', error);
        throw error;
    }
};
    

export const submitChoices = async(choices:number[]) => {
    try {
        const response = await api.post('/desire/submit',
            { desireIds: choices},
        );
        console.log(response.data);
    } catch (err: any) {
        console.error(err);
    }
}