import { api } from './api';


export const getAllUsers = async() => {
    const response = await api.get('user/all')
    return response.data
}

export const getAllTeams = async() => {
    const response = await api.get('team/all')
    return response.data
}