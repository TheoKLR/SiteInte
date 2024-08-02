import { Navbar } from "../components/shared/Navbar"
import { useEffect, useState } from "react";
import { getRole } from "../services/requests";
import { Section } from "../components/shared/Section";
import { ParrainageNewStudent }  from "../components/parrainage/ParrainageNewStudent";
import { ParrainageStudent } from "../components/parrainage/ParrainageStudent";
import { Default } from "../components/shared/Default";
import { getCurrentUser, isInRiList } from "../services/requests/users";

export const Parrainage = () => {

    const [permission, setPermission] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                
                const user = await getCurrentUser()
                const email = user.email;
                const permission = user.permission;

                const isRI = await isInRiList(email);

                if (isRI) {
                    window.location.href = '/'; 
                    return;
                }
                
                if (!permission ) {
                    window.location.href = '/';
                    return null;
                }
                setPermission(permission);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="Parrainage">
            <Navbar/>
            {(permission === 'Admin'|| permission === 'Student') && <Section titre="Tu souhaites devenir parrain ?" contenu={ParrainageStudent} />} 
            {permission === 'newStudent' && <Section titre="Tu souhaites avoir un parrain ?" contenu={ParrainageNewStudent} />}
        </div>
    )
}
