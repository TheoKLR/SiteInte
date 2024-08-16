import { Navbar } from "../components/shared/Navbar"
import UserAdminSection from '../components/admin/users/UserAdminSection';
import TeamAdminSection from '../components/admin/teams/TeamAdminSection';
import FactionAdminSection from '../components/admin/factions/FactionAdminSection';
import DesireAdminSection from '../components/admin/roles/RoleAdminSection';
import EventsAdminSection from '../components/admin/events/EventsAdminSection'
import { Section } from "../components/shared/Section";
import { useEffect, useState } from "react";
import { getRole } from "../services/requests";
import ExportAdminSection from "../components/admin/export/ExportAdminSection";
import PermsAdminSection from "../components/admin/perms/PermsAdmin";
import EmailAdminSection from "../components/admin/email/EmailAdminSection";
import { getCurrentUser } from "../services/requests/users";

export const Admin = () => {

    const [permission, setPermission] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                const permission = user.permission;
                
                if ((permission !== ('Admin')) && (permission !== 'RespoCE')) {
                    window.location.href = '/Home';
                    return null;
                }
                setPermission(permission);
                
            } catch (error) {
                console.error('Error fetching permission:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="Admin">
            <Navbar />
            {(permission === 'Admin' || permission === 'RespoCE') && <Section titre="Utilisateurs" contenu={UserAdminSection} />}
            {(permission === 'Admin' || permission === 'RespoCE')  && <Section titre="Equipes" contenu={TeamAdminSection} />}
            {(permission === 'Admin' || permission === 'RespoCE')  && <Section titre="Factions" contenu={FactionAdminSection} />}
            {(permission === 'Admin') &&<Section titre="Rôles" contenu={DesireAdminSection} />}
            {(permission === 'Admin') && <Section titre="Events" contenu={EventsAdminSection} />}
            {(permission === 'Admin') && <Section titre="Exports" contenu={ExportAdminSection} />}
            {(permission === 'Admin') && <Section titre="Perms" contenu={PermsAdminSection} />}
            {(permission === 'Admin') && <Section titre="Emails" contenu={EmailAdminSection} />}
        </div>
    )
}