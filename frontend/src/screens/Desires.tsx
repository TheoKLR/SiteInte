import { Navbar } from "../components/shared/Navbar"
import { Section } from "../components/shared/Section"
//import { Choice } from "../components/choices/Choice"
import { useEffect } from "react";
import { getRole } from "../services/requests";

export const Souhait = () => {
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
                if (!role) {
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
        <div className="Souhait">
            <Navbar />
        </div>
    )
}
//            <Section titre="Choisis ton rôle dans l'inté" contenu={Choice} />
