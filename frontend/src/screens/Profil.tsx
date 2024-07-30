import { Navbar } from "../components/shared/Navbar"
import { Section } from "../components/shared/Section"
import { ProfilForm, TeamDisplay } from "../components/profil/Profil"
import { useEffect } from "react";
import { getRole } from "../services/requests";

export const Profil = () => {

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
                if (!role) {
                    window.location.href = '/';
                    return null;
                }
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, []);

    return (
        <div className="ProfilForm">
            <Navbar />
            <Section titre="Voici ton profil !" contenu={ProfilForm} />
            {/*<Section titre="Voici ton équipe !" contenu={TeamDisplay} />*/}
        </div>
    )
}
            
