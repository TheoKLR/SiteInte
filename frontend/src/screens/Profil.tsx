import { Navbar } from "../components/shared/Navbar"
import { Section } from "../components/shared/Section"
import { ProfilForm } from "../components/profil/Profil"

export const Profil = () => {

    return (
        <div className="ProfilForm">
            <Navbar />
            <Section titre="Complète ton profil !" contenu={ProfilForm} />
        </div>
    )
}
            
