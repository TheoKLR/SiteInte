import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Rubrique } from "../components/Rubrique"
import { RubriqueChoix } from "../components/RubriqueChoix"

export const Souhait = () => {

    return (
        <div className="Souhait">
            <Navbar role = "New"/> 
            <Rubrique titre="Choisis ton rôle dans l'inté" contenu={RubriqueChoix}/>
        </div>
    )
}