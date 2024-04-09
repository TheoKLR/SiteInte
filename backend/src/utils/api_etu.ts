import axios from "axios";
import querystring from 'querystring';
import { api_client, api_secret } from "./secret";

const client = axios.create({
    baseURL: 'https://etu.utt.fr/',
    auth: {
        username: api_client,
        password: api_secret,
    }
})

export const getToken = async (authorization_code: string) => {
    try {
        const app_connection = await client.post('https://etu.utt.fr/api/oauth/token', querystring.stringify({
            grant_type: 'authorization_code',
            authorization_code: authorization_code
        }));
        return app_connection.data.access_token
    } catch (err) {
        return ""
    }
}

export const getUserData = async (token: string) => {
    try {
        const user_data = await axios.get('https://etu.utt.fr/api/public/user/account', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return user_data.data.data
    } catch {
        return null
    }
}