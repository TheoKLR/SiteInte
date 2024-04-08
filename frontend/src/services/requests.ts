import { api } from './api';

// Obtention de la liste des Utilisateurs enregistrés dans la db
export const getAllUsers = async () => {
    const response = await api.get('user/all')
    return response.data
}

// Obtention de la liste des équipes enregistrées dans la db
export const getAllTeams = async () => {
    const response = await api.get('team/all')
    return response.data
}

export const getAllFactions = async () => {
    const response = await api.get('faction/all')
    return response.data
}

// Création d'un rôle pouvant être tenu par les étudiants de l'UTT lors de l'Inté
export const createDesire = async (name: string, desc: string) => {
    try {
        const response = await api.post('/desire/', { name, desc });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du desire :', error);
        throw error;
    }
};

// Attribution des rôles souhaités à l'étudiant de l'UTT ayant rempli le formulaire de choix de rôles
export const submitChoices = async (choiceIds: number[]) => {
    const response = await api.post('/wish/submit', { choiceIds });
    return response.data;
}

// Enregistrement d'un étudiant
export const registerStudent = async (fName: string, lName: string, mail: string, mdp: string) => {
    api.post('/auth/register', {
        first_name: fName,
        last_name: lName,
        email: mail,
        password: mdp
    }).then(function (response) {
        console.log('Utilisateur enregistré avec succès');
    }).catch(function (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    });
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
    console.log(response?.data?.data)
    return response?.data?.data
}

export const getCurrentUser = async () => {
    const response = await api.get('/user/current')
    return response?.data?.data
}

export const DeleteUsers = async (users: number[]) => {
    const response = await api.delete('/user')
    return response
}

// Obtention de tous les roles demandés par un utilisateur précis
export const getUserDesires = async (userId: string) => {
    const response = await api.get('/user/' + userId + '/wish');
    return response?.data.data;
}

// Obtention de tous les utilisateurs ayant demandé un role précis
export const getDesireUsers = async (roleId: string) => {
    const response = await api.get('/wish/' + roleId + '/users');
    return response?.data.data;
}
