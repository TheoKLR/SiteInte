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
                            {role === 'admin' && <li><a href="/Acces">Accès</a></li>}
                            <li><a href="/Factions">Factions</a></li>
                            <li><a href="/Defis">Défis</a></li>
                            <li><a href="/Mails">Mails</a></li>
                            <li><a href="/Parrainage">Parrainage</a></li>
                            <li><a href="/Events">Events</a></li>
                            <li><a href="/Wei">WEI</a></li>
                        </ul>
                    </div>

                    <div id="burger" onClick={handleClick}>
                        <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>

                </nav>
            </>
        )
    }