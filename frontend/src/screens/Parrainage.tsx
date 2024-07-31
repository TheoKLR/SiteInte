import { Navbar } from "../components/shared/Navbar"
import { useEffect, useState } from "react";
import { getRole } from "../services/requests";
import { Section } from "../components/shared/Section";
import { ParrainageNewStudent }  from "../components/parrainage/ParrainageNewStudent";
import { ParrainageStudent } from "../components/parrainage/ParrainageStudent";
import { Default } from "../components/shared/Default";
import { getCurrentUser } from "../services/requests/users";
import { RI_list } from "../utils/RI_list";

export const Parrainage = () => {

    const [permission, setPermission] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser()
                const email = user.email;
                const permission = user.permission;

                if (RI_list.includes(email)) {
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
