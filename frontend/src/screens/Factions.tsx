import { Navbar } from "../components/shared/Navbar"
import { useEffect, useState } from "react";
import { Section } from "../components/shared/Section";
import { getAllFactions } from "../services/requests/factions";
import { Faction } from "../services/interfaces";
import FactionsAffichage from "../components/factions/FactionsAffichage";
import { getCurrentUser } from "../services/requests/users";

export const Factions = () => {

    const [factions, setFactions] = useState<Faction[]>([]);
    //vraiment très ghetto, hassoul
    const [recap, setRecap] = useState<boolean[]>([])

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const user = await getCurrentUser();
                const permission = user.permission;
                if (!permission) {
                    window.location.href = '/';
                    return null;
                }
                const factions = await getAllFactions();
                setFactions(factions)

                const point1 = factions[0].points
                const point2 = factions[1].points

                if(point1 === point2) {
                    setRecap([false, false])
                    return
                }
                if(point1 > point2) {
                    setRecap([true, false])
                } else {
                    setRecap([false, true])
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
                        <Section titre={faction.name} contenu={() => FactionsAffichage({ faction, win: recap[index] })}/>
                    </div>
                ))}
        </div>
    )
}