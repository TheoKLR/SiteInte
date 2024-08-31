import { api } from './api';

// Obtention de la liste des Utilisateurs enregistrés dans la db
export const getAllUsers = async () => {
    const response = await api.get('user/all')
    return response?.data.data
}

// Obtention de la liste des équipes enregistrées dans la db
export const getAllTeams = async () => {
    const response = await api.get('team/all')
    return response?.data.data
}

export const getAllFactions = async () => {
    const response = await api.get('faction/all')
    return response?.data.data
}

// Création d'un rôle pouvant être tenu par les étudiants de l'UTT lors de l'Inté
export const createDesire = async (name: string, desc: string) => {
    try {
        const response = await api.post('/desire/', { name, desc });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Attribution des rôles souhaités à l'étudiant de l'UTT ayant rempli le formulaire de choix de rôles
export const submitChoices = async (choiceIds: number[]) => {
    const response = await api.post('/wish/submit', { choiceIds });
    return response.data;
}

// Enregistrement d'un étudiant
export const registerStudent = async (fName: string, lName: string, mail: string, pwd: string, birthday: string, uuid: string) => {

    const response = await api.post('/auth/register', {
        first_name: fName,
        last_name: lName,
        email: mail,
        password: pwd,
        birthday: birthday,
        uuid: uuid
    });

    return response?.data;
}

export const newStudentLogin = async (email: string, password: string) => {
    const response = await api.post('/auth/newStudentLogin',
        { email, password }
    );
    return response?.data?.data;
}

export const studentLogin = async (code: string) => {
    const response = await api.get('/auth/studentLogin/' + code);
    return response?.data?.data.token;
}

// Obtention du rôle de l'étudiant
export const getRole = async () => {
    const response = await api.get('/auth/role')
    return response?.data?.data
}

export const deleteUsers = async (id: number) => {
    const response = await api.delete('/user/delete'+id)
    return response
}

// Obtention de tous les roles demandés par un utilisateur précis
export const getUserWishes = async (userId: string) => {
    const response = await api.get('/user/' + userId + '/wish');
    return response?.data.data;
}

// Obtention de tous les utilisateurs ayant demandé un role précis
export const getWishUsers = async (roleId: string) => {
    const response = await api.get('/wish/' + roleId + '/users');
    return response?.data.data;
}
