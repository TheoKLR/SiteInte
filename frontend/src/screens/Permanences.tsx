import { Navbar } from "../components/shared/Navbar"
import { useEffect, useState } from "react";
import { Section } from "../components/shared/Section";
import { Perm } from "../services/interfaces";
import { getAllPerms } from "../services/requests/perms";
import { getCurrentUser } from "../services/requests/users";
import { PublicDashboard, UserPermanenceSummary } from "../components/permanences/PermAffichage";

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
            <Section titre="Permances !" contenu={PublicDashboard} />
            <Section titre="Mes Permances !" contenu={UserPermanenceSummary} />
        </div>
    )
}