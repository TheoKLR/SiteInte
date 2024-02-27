import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/Navbar";
import { Rubrique } from "../components/Section";
import { RubriqueJoinUs } from "../components/sections/JoinUs";
import { RubriqueWelcome } from "../components/sections/Welcome";
import { api } from '../services/api';

const Home = () => {
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

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

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!role) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="Home">
                <Navbar role={role} /> 
                <Rubrique titre="Bienvenue sur le site de l'intégration" contenu={RubriqueWelcome} />
                <Rubrique titre="Rejoignez-nous !" contenu={RubriqueJoinUs} />
            </div>
        );
    }
}

export default Home;