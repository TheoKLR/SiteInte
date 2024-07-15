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
                setRole(role);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, []);

    const handleLogout = () => {
        // Supprimer le token authToken
        localStorage.removeItem('authToken');
        // Rediriger l'utilisateur vers la page de connexion ou une autre page appropriée
        window.location.href = '/';
    }

    return (
        <nav>
            <a href="/Home"><img src="ressources/integration.png" alt="Logo" className="logo"></img></a>
            <div>
                <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                    {(role === 'Admin' || role === 'RespoCE') && <li><a href="/Admin">Admin</a></li>}
                    {<li><a href="/Defis">Défis</a></li>}
                    {<li><a href="/Factions">Factions</a></li>}
                    {<li><a href="/Events">Events</a></li>}
                    {<li><a href="/Mails">Mails</a></li>}
                    {<li><a href="/Parrainage">Parrainage</a></li>}
                    {<li><a href="/Profil">Profil</a></li>}
                    {<li><a href="/Wei">WEI</a></li>}
                    {role !== 'newStudent' && <li><a href="Souhait">Souhait</a></li>}
                    <li><img src="ressources/logout_button.png" alt="Logout_Button" className="logout" onClick={handleLogout}></img></li>
                </ul>
            </div>
            <div id="burger" onClick={handleClick}>
                <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
        </nav>
    )
}
