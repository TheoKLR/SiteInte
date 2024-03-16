import { Navbar } from "../components/shared/Navbar"
import UserAdminSection from '../components/admin/users/UserAdminSection';
import TeamAdminSection from '../components/admin/teams/TeamAdminSection';
import FactionAdminSection from '../components/admin/factions/FactionAdminSection';
import DesireAdminSection from '../components/admin/desires/DesireAdminSection';

import { Rubrique } from "../components/shared/Section";

export const Admin = () => {

    return (
        <div className="Admin">
            <Navbar/>
            <Rubrique titre="Utilisateurs" contenu={UserAdminSection} />
            <Rubrique titre="Equipes" contenu={TeamAdminSection} />
            <Rubrique titre="Factions" contenu={FactionAdminSection} />
            <Rubrique titre="Souhaits" contenu={DesireAdminSection} />
        </div>
    )
}