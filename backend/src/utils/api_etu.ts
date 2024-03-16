import axios from "axios";
import querystring from 'querystring';

export const getToken = async () => {
    try {
        const app_connection = await axios.post('https://etu.utt.fr/api/oauth/token', querystring.stringify({
            grant_type: 'client_credentials',
            client_id: '50505771275',
            client_secret: '3631ddfe9365f640041167a3ffd34193',
            scopes: 'public'
        }));
        return app_connection.data.access_token
    } catch {
        return null
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