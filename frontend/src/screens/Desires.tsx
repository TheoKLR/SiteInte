import { Navbar } from "../components/shared/Navbar"
import { Rubrique } from "../components/shared/Section"
import Users from "../components/admin/users/UserAdminSection"
import { Choice } from "../components/choices/Choice"

export const Souhait = () => {

    return (
        <div className="Souhait">
            <Navbar />
            <Rubrique titre="Choisis ton rôle dans l'inté" contenu={Choice} />
        </div>
    )
}
