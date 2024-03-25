import { api } from "../api"

export const getAllRoles = async () => {
    let response = await api.get('role/all')
    return response.data
}

export const createRole = async (name: string, desc: string) => {
    return await api.post('role', { name, desc })
}

export const deleteRole = async (id: number) => {
    return await api.delete('role/' + id)
}