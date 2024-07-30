import { api } from "../api";

export const syncUUID = async () => {
     return await api.post('/newstudent/syncUUID' );
}

export const deleteUUID = async (UUID : string) => {
    return await api.delete('/newstudent/deleteUUID/' + UUID );
}

export const getAllUUID = async() => {
    const response = await api.get('/newstudent/allUUID');
    return response?.data?.data;
}