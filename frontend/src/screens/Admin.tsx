import { Navbar } from "../components/shared/Navbar"
import UserAdminSection from '../components/admin/users/UserAdminSection';
import TeamAdminSection from '../components/admin/teams/TeamAdminSection';
import FactionAdminSection from '../components/admin/factions/FactionAdminSection';
import DesireAdminSection from '../components/admin/desires/DesireAdminSection';
import { Section } from "../components/shared/Section";
import { useEffect } from "react";
import { getRole } from "../services/requests";

export const Admin = () => {
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
                if (role !== "Admin") {
                    window.location.href = '/Login';
                    return null;
                }
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, []);

    return (
        <div className="Admin">
            <Navbar />
            <Section titre="Utilisateurs" contenu={UserAdminSection} />
            <Section titre="Equipes" contenu={TeamAdminSection} />
            <Section titre="Factions" contenu={FactionAdminSection} />
            <Section titre="Souhaits" contenu={DesireAdminSection} />
        </div>
    )
}