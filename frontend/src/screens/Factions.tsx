import { Navbar } from "../components/shared/Navbar"
import { useEffect, useState } from "react";
import { getRole } from "../services/requests";
import { Section } from "../components/shared/Section";
import { getAllFactions } from "../services/requests/factions";
import { Faction } from "../services/interfaces";
import FactionsAffichage from "../components/factions/FactionsAffichage";

export const Factions = () => {

    const [factions, setFactions] = useState<Faction[]>([]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
                const factions = await getAllFactions();
                setFactions(factions)
                console.log(factions)
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