import { api } from "../api";
import { EmailOptions } from "../interfaces";

export const sendEmail = async (emailoptions : EmailOptions) => {
    const response = await api.post('/email/sendemail', {emailoptions});
    return response;
}