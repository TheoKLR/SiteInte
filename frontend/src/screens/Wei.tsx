import { Navbar } from "../components/shared/Navbar"
import { useEffect } from "react";
import { getRole } from "../services/requests";
import { Section } from "../components/shared/Section";
import { Default } from "../components/shared/Default";
import { getCurrentUser } from "../services/requests/users";

export const Wei = () => {
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const user = await getCurrentUser()
                const permission = user.permission;
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
        <div className="Wei">
            <Navbar />
            <Section titre="Prochainement !" contenu={Default} />
        </div>
    )
}