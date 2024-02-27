import { Navbar } from "../components/Navbar"
import Users from '../components/admin/users/users';
import { Rubrique } from "../components/Section";

export const Factions = () => {
    return (
        <div className="Factions">
            <Navbar role = "New"/>  
            <h1>Factions</h1>
            <Rubrique titre="Utilisateurs" contenu={Users} />
        </div>
    )
}