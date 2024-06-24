import { api } from "../api";

export const createUUID = async (count: number) => {
     return await api.post('/newstudent/createUUID/', {count} );
}

export const deleteUUID = async (UUID : string) => {
    return await api.delete('/newstudent/deleteUUID/' + UUID );
}

export const getAllUUID = async() => {
    const response = await api.get('/newstudent/allUUID');
    return response?.data?.data;
}