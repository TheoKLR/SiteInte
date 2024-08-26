import { api } from '../api';

export const createPerm = async (   

    title: string, 
    description: string, 
    startTime: Date, 
    endTime: Date, 
    location: string, 
    maxRegistrations: number) => {


    const response = await api.post('permanence', { title, description, startTime, endTime, location, maxRegistrations });

    return response.data;
}

export const deletePerm = async (id: number) => {
    return await api.delete('permanence/' + id);
}

export const getAllPerms = async () => {

    const response = await api.get('permanence/all');
    return response.data.data;

}

export const updatePermanence = async (
    id: number, 
    title: string, 
    description: string, 
    startTime: string, 
    endTime: string, 
    location: string, 
    maxRegistrations: number,
    isRegistrationOpen: boolean) => {

    const response = await api.post('permanence/update/'+ id, {title, description, startTime, endTime, location, maxRegistrations, isRegistrationOpen});
    return response.data;

}

export const openClosePermanence = async (
    id: number, 
    isRegistrationOpen: boolean) => {

    const response = await api.post('permanence/openorclose/'+ id, {isRegistrationOpen});
    return response.data;

}

export const openOrclosePermanenceJ7 = async (state: boolean ) => {

        const response = await api.post('permanence/openorclosej7/', {state});
        return response.data.data;
}

export const registerPermanence = async ( id: number,  userId: number) => {

        const response = await api.post('permanence/register/'+ id, {userId});

        return response.data;

}

export const unRegisterPermanence = async (id: number, userId: number) => {

        const response = await api.delete('permanence/unregister/'+ id,{data :{userId: userId} });
        return response.data;

}

export const getRegistration = async (id: number ) => {

        const response = await api.get('permanence/registrations/'+ id);
        return response.data.data;

}

export const getUserPermanences = async (userid: number ) => {

    const response = await api.get('permanence/userpermanences/'+ userid);
    return response.data.data;

}