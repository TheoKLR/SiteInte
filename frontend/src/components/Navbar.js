import { Component } from "react";
import "./NavbarStyles.css";

class Navbar extends Component {

    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <>
                <nav>
                    <a href="/Home"><img src="ressources/integration.png" alt="Logo" width="75"></img></a>

                    <div>
                        <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                            <li><a href="/Acces">Accès</a></li>
                            <li><a href="/Factions">Factions</a></li>
                            <li><a href="/Defis">Défis</a></li>
                            <li><a href="/Mails">Mails</a></li>
                            <li><a href="/Parrainage">Parrainage</a></li>
                            <li><a href="/Events">Events</a></li>
                            <li><a href="/Wei">WEI</a></li>
                        </ul>
                    </div>

                    <div id="burger" onClick={this.handleClick}>
                        <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>

                </nav>
            </>
        )
    }

}

export default Navbar;