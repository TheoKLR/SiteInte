import { Navbar } from "../components/Navbar"
import { Rubrique } from "../components/Section"
import Users from "../components/admin/users/users"
import { Choice } from "../components/sections/Choice"
import {TraitementDesires} from "../components/admin/users/traitementDesires"

export const Souhait = () => {

    return (
        <div className="Souhait">
            <Navbar role = "New"/> 
            <Rubrique titre="Choisis ton rôle dans l'inté" contenu={Choice}/>
            <Rubrique titre="Traitement des résultats" contenu={TraitementDesires} />
        </div>
    )
}