import { Navbar } from "../components/shared/Navbar"
import { useEffect, useState } from "react";
import { getRole } from "../services/requests";
import { Section } from "../components/shared/Section";
import { ParrainageNewStudent }  from "../components/parrainage/ParrainageNewStudent";
import { ParrainageStudent } from "../components/parrainage/ParrainageStudent";
import { Default } from "../components/shared/Default";

export const Parrainage = () => {

    const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
                if (!role) {
                    window.location.href = '/';
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
        <div className="Parrainage">
            <Navbar/>
            {/*(role === 'Admin'|| role === 'Student') && <Section titre="Tu veux être Parrain ?" contenu={ParrainageStudent} />*/} 
            {/*role === 'newStudent' && <Section titre="Tu souhaites avoir un parrain ?" contenu={ParrainageNewStudent} />*/}
            <Section titre="Prochainement !" contenu={Default} />
            
        </div>
    )
}