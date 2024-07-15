import { useState, useEffect } from "react";
import "./NavbarStyle.css";
import { getRole } from "../../services/requests";
import { RI_list } from "../../utils/RI_list";
import { getCurrentUser } from "../../services/requests/users";

// Navbar adaptative en fonction du rôle de l'utilisateur
export const Navbar: React.FC = () => {
    const [clicked, setClicked] = useState(false);
    const [permission, setPermission] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const handleClick = () => {
        setClicked(!clicked);
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser()
                const email = user.email;
                const permission = user.permission;
                setUserEmail(email)
                setPermission(permission);
            } catch (error) {
                console.error('Error fetching permission:', error);
            }
        };

        fetchUser();
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
<<<<<<< HEAD
                    {(permission === 'Admin' || permission === 'RespoCE') && <li><a href="/Admin">Admin</a></li>}
=======
                    {(role === 'Admin' || role === 'RespoCE') && <li><a href="/Admin">Admin</a></li>}
>>>>>>> e737c6f1 (Update Navbar.tsx)
                    {<li><a href="/Defis">Défis</a></li>}
                    {permission !== 'newStudent' && <li><a href="Permanences">Permanences</a></li>}
                    {<li><a href="/Factions">Factions</a></li>}
                    {<li><a href="/Events">Events</a></li>}
                    {userEmail && !RI_list.includes(userEmail) && <li><a href="/Parrainage">Parrainage</a></li>}
                    {<li><a href="/Profil">Profil</a></li>}
                    {<li><a href="/Wei">WEI</a></li>}
                    {permission !== 'newStudent' && <li><a href="Souhait">Souhait</a></li>}
                    <li><img src="ressources/logout_button.png" alt="Logout_Button" className="logout" onClick={handleLogout}></img></li>
                </ul>
            </div>
            <div id="burger" onClick={handleClick}>
                <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
        </nav>
    )
}
