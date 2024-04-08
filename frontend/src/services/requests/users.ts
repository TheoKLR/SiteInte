import { api } from '../api';

export const addToTeam = async (userIds: number[], teamId: number) => {
    return await api.put('user/addtoteam', {
        userIds,
        teamId,
    })
}

export const changePermission = async (id: number, perm: string) => {
    return await api.put('user/permission', {
        id,
        perm,
    })
}