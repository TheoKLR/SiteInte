import { api } from "../api";

export const isTokenValid = async (token: string) => {
    const response = await api.get('/auth/istokenvalid/'+ token );
    return response?.data?.data;
}

export const handleCASTicket = async (ticket: string)=>{
    const response = await api.get('auth/handlecasticket/', {
        params:{
            "ticket" :ticket
        }
    });

    return response?.data.data
}