import { api } from './api';


export const getAllUsers = async() => {
    let response = await api.get('user/all')
    return response.data
}