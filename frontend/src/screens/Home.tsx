import React, { useState, useEffect } from 'react';
import { Navbar } from "../components/shared/Navbar";
import { Section } from "../components/shared/Section";
import { JoinUs } from "../components/home/JoinUs";
import { Welcome } from "../components/home/Welcome";
import { getCurrentUser } from '../services/requests/users';

//Page d'accueil du site une fois l'utilisateur connecté
const Home = () => {
    const [title, setTitle] = useState<string>("");
    
    useEffect(() => {
        const fetchName = async () => {
            try {
                const user = await getCurrentUser();
                if (!user) {
                    window.location.href = '/';
                    return null;
                }
                setTitle("Bienvenue " + user.first_name +" !");
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchName();
    }, []);

    return (
        <div className="Home">
            <Navbar />
            <Section titre={title} contenu={Welcome} />
            <Section titre="Rejoignez-nous !" contenu={JoinUs} />
        </div>
    );
}


export default Home;