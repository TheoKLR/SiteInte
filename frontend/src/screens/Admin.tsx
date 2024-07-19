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

export const Admin = () => {

    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
                if ((role !== ('Admin')) && (role !== 'RespoCE')) {
                    console.log(role)
                    window.location.href = '/Home';
                    return null;
                }
                setRole(role);
                
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, []);

    return (
        <div className="Admin">
            <Navbar />
            {(role === 'Admin' || role === 'RespoCE') && <Section titre="Utilisateurs" contenu={UserAdminSection} />}
            {(role === 'Admin' || role === 'RespoCE')  && <Section titre="Equipes" contenu={TeamAdminSection} />}
            {(role === 'Admin' || role === 'RespoCE')  && <Section titre="Factions" contenu={FactionAdminSection} />}
            {(role === 'Admin') &&<Section titre="Rôles" contenu={DesireAdminSection} />}
            {(role === 'Admin') && <Section titre="Events" contenu={EventsAdminSection} />}
            {(role === 'Admin') && <Section titre="Exports" contenu={ExportAdminSection} />}
            {(role === 'Admin') && <Section titre="Perms" contenu={PermsAdminSection} />}
            {(role === 'Admin') && <Section titre="Emails" contenu={EmailAdminSection} />}
        </div>
    )
}