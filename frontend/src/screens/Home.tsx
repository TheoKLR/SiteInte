import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import { Rubrique } from "../components/Section";
import { RubriqueJoinUs } from "../components/sections/JoinUs";
import { RubriqueWelcome } from "../components/sections/Welcome";
import { api } from '../services/api';

//Page d'accueil du site une fois l'utilisateur connecté
const Home = () => {

    //gestion du role de l'utilsateur et d'une potentielle erreur de chargement
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

    //requête axios pour récupérer le rôle de l'utilisateur
    useEffect(() => {
        api.get('/auth/role')
            .then(function(response) {
                const role = response.data.data;
                setRole(role);
            })
            .catch(function(error) {
                setError(error);
            });
    }, []);

    //Frontend gérant l'erreur potentielle de chargement
    if (error) {
        return <div>Error: {error}</div>;
    } else if (!role) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="Home">
                <Navbar/> 
                <Rubrique titre="Bienvenue sur le site de l'intégration" contenu={RubriqueWelcome} />
                <Rubrique titre="Rejoignez-nous !" contenu={RubriqueJoinUs} />
            </div>
        );
    }
}

export default Home;