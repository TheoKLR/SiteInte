import { useEffect, useState } from 'react';
import { api } from './api';

// Ensemble des requêtes axios

// Obtention de la liste des Utilisateurs enregistrés dans la db
export const getAllUsers = async() => {
    let response = await api.get('user/all')
    return response.data
}

// Obtention de la liste des équipes enregistrées dans la db
export const getAllTeams = async() => {
    const response = await api.get('team/all')
    return response.data
}

// Obtention de la liste des rôles pouvant être tenus par les étudiants de l'UTT lors de l'Inté
export const getAllDesires = async() => {
    let response = await api.get('desire/all')
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
export const submitChoices = async(choices:number[]) => {
    try {
        const response = await api.post('/desire/submit',
            { desireIds: choices},
        );
        console.log(response.data);
    } catch (err: any) {
        console.error(err);
    }
}

// Enregistrement d'un étudiant
export const registerStudent = async(fName:string, lName:string, mail:string, mdp:string) => {
    api.post('/auth/register', {
        first_name: fName,
        last_name: lName,
        email: mail,
        password: mdp
    })
        .then(function (response) {
            console.log('Utilisateur enregistré avec succès');
        })
        .catch(function (error) {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        });
}


export const loginUser = async(user:string, pwd:string) => {
    const response = await api.post('/auth/login',
                { email: user, password: pwd }
            );
            const accessToken = response?.data?.data;
            localStorage.setItem("authToken", accessToken);
}

// Obtention du rôle de l'étudiant
export const getrole = async() => {
    let response = await api.get('/auth/role')
    return response.data
}


export const getUserDesiresById = async(userId:string) => {
    try {
        console.log('/desire/user/'+userId)
        const response = await api.get('/desire/user/'+userId
            );
            console.log(response?.data?.data)
            return response?.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des desires de l'utilisateur " + userId)
    }
    
}