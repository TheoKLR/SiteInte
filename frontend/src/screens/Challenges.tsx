import { Navbar } from "../components/shared/Navbar"
import { useEffect } from "react";
import { Section } from "../components/shared/Section";
import { Default } from "../components/shared/Default";
import { getCurrentUser } from "../services/requests/users";

export const Defis = () => {
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                const permission = user.permission
                if (!permission) {
                    window.location.href = '/';
                    return null;
                }
            } catch (error) {
                console.error('Error fetching permission:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="Defis">
            <Navbar/>  
            <Section titre="Prochainement !" contenu={Default} />
        </div>
    )
}