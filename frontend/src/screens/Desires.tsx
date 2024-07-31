import { Navbar } from "../components/shared/Navbar"
import { Section } from "../components/shared/Section"
import { Choice } from "../components/choices/Choice"
import { useEffect } from "react";
import { getCurrentUser } from "../services/requests/users";

export const Souhait = () => {
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const user = await getCurrentUser();
                const permission = user.permission;
                if (!permission && permission === "newStudent") {
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
        <div className="Souhait">
            <Navbar />
            <Section titre="Choisis ton rôle dans l'inté" contenu={Choice} />
        </div>
    )
}
            
