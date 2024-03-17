import { useState, useEffect } from "react";
import "./NavbarStyle.css";
import { getRole } from "../../services/requests";

// Navbar adaptative en fonction du rôle de l'utilisateur
export const Navbar: React.FC = () => {
    const [clicked, setClicked] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    const handleClick = () => {
        setClicked(!clicked);
    }

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
                console.log(role)
                setRole(role);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, []);

    return (
        <nav>
            <a href="/Home"><img src="ressources/integration.png" alt="Logo" className="logo"></img></a>
            <div>
                <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                    {role === 'Admin' && <li><a href="/Admin">Admin</a></li>}
                    {role !== 'Student' && <li><a href="/Defis">Défis</a></li>}
                    {role !== 'Student' && <li><a href="/Factions">Factions</a></li>}
                    {role !== 'Student' && <li><a href="/Events">Events</a></li>}
                    {role !== 'Student' && <li><a href="/Mails">Mails</a></li>}
                    {role !== 'Student' && <li><a href="/Parrainage">Parrainage</a></li>}
                    {role !== 'Student' && <li><a href="/Wei">WEI</a></li>}
                    {role === 'Student' && <li><a href="Souhait">Souhait</a></li>}
                </ul>
            </div>
            <div id="burger" onClick={handleClick}>
                <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
        </nav>
    )
}
