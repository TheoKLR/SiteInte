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

export const resetPasswordUser = async(token : string, password: string)=>{
    const response = await api.post('auth/resetpassworduser', {token, password});

    return response?.data
}

export const resetPasswordAdmin = async(user_id : number)=>{
    const response = await api.post('auth/resetpasswordadmin', {user_id});

    return response?.data
}

export const requestPasswordUser = async(user_email : string)=>{
    const response = await api.post('auth/requestpassworduser', {user_email});

    return response?.data
}