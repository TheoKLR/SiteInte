import { Navbar } from "../components/shared/Navbar"
import { Section } from "../components/shared/Section"
import { ProfilForm } from "../components/profil/Profil"
import { Default } from "../components/shared/Default"

export const Profil = () => {

    return (
        <div className="ProfilForm">
            <Navbar />
            <Section titre="Complète ton profil !" contenu={/*ProfilForm*/Default} />
        </div>
    )
}
            
