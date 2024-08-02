import { api } from "../api";

export const syncNewStudent = async () => {
     return await api.post('/newstudent/syncNewStudent' );
}

export const deleteNewStudent = async (UUID : string) => {
    return await api.delete('/newstudent/deleteNewStudent/' + UUID );
}

export const getAllNewStudent= async() => {
    const response = await api.get('/newstudent/allNewStudent');
    return response?.data?.data;
}