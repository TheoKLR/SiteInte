import { useState } from "react";
import "./NavbarStyle.css";

// Navbar adaptative en fonction du rôle de l'utilisateur
export const Navbar: React.FC = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }
    const role = localStorage.getItem("role");    // Frontend
    return (
        <nav>
            <a href="/Home"><img src="ressources/integration2.png" alt="Logo" className="logo"></img></a>
            <div>
                <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                    {role === 'Admin' && <li><a href="/Admin">Admin</a></li>}
                    {role === 'Admin' && <li><a href="/Defis">Défis</a></li>}
                    {role === 'Admin' && <li><a href="/Factions">Factions</a></li>}
                    {role === 'Admin' && <li><a href="/Events">Events</a></li>}
                    {role === 'Admin' && <li><a href="/Mails">Mails</a></li>}
                    {role === 'Admin' && <li><a href="/Parrainage">Parrainage</a></li>}
                    {role === 'Admin' && <li><a href="/Wei">WEI</a></li>}
                    {role === 'Admin' && <li><a href="Souhait">Souhait</a></li>}
                    {role === 'newStudent' && <li><a href="Souhait">Souhait</a></li>}
                </ul>
            </div>
            <div id="burger" onClick={handleClick}>
                <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
        </nav>
    )
}