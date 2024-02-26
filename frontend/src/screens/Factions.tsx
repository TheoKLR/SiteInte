import { Navbar } from "../components/Navbar"
import AnimatedMulti from '../components/rubriques/Admin';
import { Rubrique } from "../components/Rubrique";

export const Factions = () => {
    return (
        <div className="Factions">
            <Navbar role = "New"/>  
            <h1>Factions</h1>
            <Rubrique titre="Admin" contenu={AnimatedMulti} />
        </div>
    )
}