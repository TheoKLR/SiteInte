import { Navbar } from "../components/shared/Navbar"
import { Section } from "../components/shared/Section"
import {InfoWEI, PossibleChallengeDisplay, ProfilForm, TeamDisplay} from "../components/profil/Profil"
import { useEffect } from "react";
import { getRole } from "../services/requests";
import { getCurrentUser } from "../services/requests/users";

export const Profil = () => {

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const user = await getCurrentUser()
                const permission = user.permission;
                if (!permission) {
                    window.location.href = '/';
                    return null;
                }
            } catch (error) {
                console.error('Error fetching permission:', error);
            }
        };

        fetchRole();
    }, []);

    return (
        <div className="ProfilForm">
            <Navbar />
            <Section titre="Voici ton profil !" contenu={ProfilForm} />
            <Section titre="Info WEI" contenu={InfoWEI} />
            <Section titre="Ton équipe !" contenu={TeamDisplay} />
            <Section titre="Tes challenges !" contenu={PossibleChallengeDisplay} />
        </div>
    )
}
            
