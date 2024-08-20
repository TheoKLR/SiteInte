import {Navbar} from "../components/shared/Navbar"
import {useEffect, useState} from "react";
import {Section} from "../components/shared/Section";
import {getCurrentUser} from "../services/requests/users";
import ChallFactionSection from "../components/challenge/faction/ChallFactionSection";
import ChallTeamSection from "../components/challenge/team/ChallTeamSection";
import ChallStudentSection from "../components/challenge/student/ChallStudentSection";
import {ChallType} from "../services/interfaces";
import ChallStudentCeSection from "../components/challenge/student_or_ce/ChallStudentCeSection";
import ChallFreeSection from "../components/challenge/free/ChallFreeSection";

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

    //TODO: factoriser. j'ai essayé vite fait mais ça fait longtemps j'ai pas fait de react mdr
    return (
        <div className="Admin">
            <Navbar />
            <Section titre="Challenge Faction" contenu={ChallFactionSection} />
            <Section titre="Challenge Team" contenu={ChallTeamSection} />
            <Section titre="Challenge User" contenu={ChallStudentSection} />
            <Section titre="Challenge User/Ce" contenu={ChallStudentCeSection} />
            <Section titre="Challenge Gratos" contenu={ChallFreeSection} />
        </div>
    )
}

/*
            <Section titre="Challenge Faction" contenu={ChallStudentCeSection} />
            <Section titre="Challenge Faction" contenu={ChallStudentCeSection} />
            <Section titre="Challenge Faction" contenu={ChallStudentOrCeSection} />
 */