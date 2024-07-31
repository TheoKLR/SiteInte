import { Navbar } from "../components/shared/Navbar"
import { useEffect, useState } from "react";
import { getRole } from "../services/requests";
import { Section } from "../components/shared/Section";
import { getAllFactions } from "../services/requests/factions";
import { Faction, Perm } from "../services/interfaces";
import FactionsAffichage from "../components/factions/FactionsAffichage";
import { getAllPerms } from "../services/requests/perms";
import PermAffichage from "../components/permanences/PermAffichage";
import { getCurrentUser } from "../services/requests/users";

export const Permanences = () => {

    const [perms, setPerms] = useState<Perm[]>([]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const user = await getCurrentUser();
                const permission = user.permission
                const perms = await getAllPerms();
                setPerms(perms)
                if (!permission || permission === 'newStudent') {
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
        <div className="Perms">
            <Navbar/>
            {perms.map((perm, index) => (
                    <div key={index}>
                        <Section titre={perm.name} contenu={() => PermAffichage({ perm })}/>
                    </div>
                ))}
        </div>
    )
}