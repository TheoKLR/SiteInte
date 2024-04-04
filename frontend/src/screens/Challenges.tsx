import { Navbar } from "../components/shared/Navbar"
import { useEffect } from "react";
import { getRole } from "../services/requests";

export const Defis = () => {
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
        <div className="Defis">
            <Navbar/>  
        </div>
    )
}