import { Navbar } from "../components/Navbar"
import { Rubrique } from "../components/Section"
import { Choice } from "../components/sections/Choice"

export const Souhait = () => {

    return (
        <div className="Souhait">
            <Navbar role = "New"/> 
            <Rubrique titre="Choisis ton rôle dans l'inté" contenu={Choice}/>
        </div>
    )
}