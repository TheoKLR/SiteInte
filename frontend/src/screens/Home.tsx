import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/shared/Navbar";
import { Rubrique } from "../components/shared/Section";
import { RubriqueJoinUs } from "../components/home/JoinUs";
import { RubriqueWelcome } from "../components/home/Welcome";
import { api } from '../services/api';

//Page d'accueil du site une fois l'utilisateur connecté
const Home = () => {
    return (
        <div className="Home">
            <Navbar />
            <Rubrique titre="Bienvenue sur le site de l'intégration" contenu={RubriqueWelcome} />
            <Rubrique titre="Rejoignez-nous !" contenu={RubriqueJoinUs} />
        </div>
    );
}


export default Home;