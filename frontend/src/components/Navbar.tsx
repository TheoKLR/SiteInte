import { Component } from "react";
import { useState } from "react";
import "./NavbarStyles.css";

interface NavProps {
    role: string;
}

export const Navbar:React.FC<NavProps> = ({role}) => {

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
            <>
                <nav>
                    <a href="/Home"><img src="ressources/integration.png" alt="Logo" width="50"></img></a>

                    <div>
                        <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                            {role === 'Admin' && <li><a href="/Acces">Accès</a></li>}
                            {role === 'Admin' && <li><a href="/Defis">Défis</a></li>}
                            {role === 'Admin' && <li><a href="/Factions">Factions</a></li>}
                            {role === 'Admin' && <li><a href="/Events">Events</a></li>}
                            {role === 'Admin' && <li><a href="/Mails">Mails</a></li>}
                            {role === 'Admin' && <li><a href="/Parrainage">Parrainage</a></li>}
                            {role === 'Admin' && <li><a href="/Wei">WEI</a></li>}
                            
                            {role === 'newStudent' && <li><a href="Souhait">Souhait</a></li>}
                        </ul>
                    </div>

                    <div id="burger" onClick={handleClick}>
                        <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>

                </nav>
            </>
        )
    }