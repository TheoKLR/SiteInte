import { Navbar } from "../components/Navbar"
import { Rubrique } from "../components/Section"
import Users from "../components/admin/users/UserAdminSection"
import { Choice } from "../components/sections/Choice"
//import {TraitementDesires} from "../components/admin/desires/traitementDesires"

export const Souhait = () => {

    return (
        <div className="Souhait">
            <Navbar/> 
            <Rubrique titre="Choisis ton rôle dans l'inté" contenu={Choice}/>
        </div>
    )
}

//            <Rubrique titre="Traitement des résultats" contenu={TraitementDesires} />
