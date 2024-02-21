import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Rubrique } from "../components/Rubrique"
import { RubriqueWelcome } from "../components/RubriqueWelcome"

export const Home = () => {

    return (
        <div className="Home">
            <Navbar/> 
            <Rubrique titre = "Bienvenue sur le site de l'intégration" contenu={RubriqueWelcome}></Rubrique>
            <Rubrique titre = "Rejoignez-nous!" contenu={RubriqueWelcome}></Rubrique>
        </div>
    )
}