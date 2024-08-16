import { Navbar } from "../components/shared/Navbar"
import {useEffect, useState} from "react";
import { Section } from "../components/shared/Section";
import { Default } from "../components/shared/Default";
import { getCurrentUser } from "../services/requests/users";
import UserAdminSection from "../components/admin/users/UserAdminSection";
import AnimSection from "../components/challenge/AnimSection";
import ChallFactionSection from "../components/challenge/faction/ChallFactionSection";
import ChallTeamSection from "../components/challenge/team/ChallTeamSection";

export const Defis = () => {
    const [permission, setPermission] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                const permission = user.permission;

                if ((permission !== ('Admin') && permission !== 'Anim')) {
                    console.log(permission)
                    window.location.href = '/Home';
                    return null;
                }
                setPermission(permission);

            } catch (error) {
                console.error('Error fetching permission:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="Admin">
            <Navbar />
            <Section titre="Challenge Faction" contenu={ChallFactionSection} />
            <Section titre="Challenge Team" contenu={ChallTeamSection} />
        </div>
    )
}

/*
            <Section titre="Challenge Faction" contenu={ChallTeamSection} />
            <Section titre="Challenge Faction" contenu={ChallStudentSection} />
            <Section titre="Challenge Faction" contenu={ChallStudentOrCeSection} />
 */