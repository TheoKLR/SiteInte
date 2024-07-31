import { Navbar } from "../components/shared/Navbar"
import { useEffect, useState } from "react";
import { Section } from "../components/shared/Section";
import { getAllFactions } from "../services/requests/factions";
import { Faction } from "../services/interfaces";
import FactionsAffichage from "../components/factions/FactionsAffichage";
import { getCurrentUser } from "../services/requests/users";

export const Factions = () => {

    const [factions, setFactions] = useState<Faction[]>([]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const user = await getCurrentUser();
                const permission = user.permission;
                const factions = await getAllFactions();
                setFactions(factions)
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
        <div className="Factions">
            <Navbar/>
            {factions.map((faction, index) => (
                    <div key={index}>
                        <Section titre={faction.name} contenu={() => FactionsAffichage({ faction })}/>
                    </div>
                ))}
        </div>
    )
}