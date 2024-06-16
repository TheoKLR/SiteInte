import { api } from "../api";

export const isTokenValid = async (token: string) => {
    const response = await api.get('auth/istokenvalid/'+ token );
    return response?.data?.data;
}