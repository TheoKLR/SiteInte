import { Navbar } from "../components/shared/Navbar"
import { useEffect } from "react";
import { getRole } from "../services/requests";
import { Section } from "../components/shared/Section";
import { Default } from "../components/shared/Default";

export const Mails = () => {
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
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
        <div className="Mails">
            <Navbar />
            <Section titre="Prochainement !" contenu={Default} />
        </div>
    )
}