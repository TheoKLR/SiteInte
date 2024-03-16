import './Welcome.css';

// Rubrique explicative de ce qu'est l'inté
export const RubriqueWelcome = () => {
    //Frontend
    return (
        <>
            <div className='containerWelcome'>
                <img src="../../ressources/Photo.jpg" alt="photo" />
                <div className='texte'>
                    <h3>L'inté c'est quoi ?</h3>
                    <p>C'est l'évènement où l'ensemble des étudiants de l'UTT se mobilise pour concocter aux nouveaux (comme toi) une incroyable semaine durant laquelle tu découvriras la vie sur le campus, rencontreras une tonne de nouveaux amis et démarreras ta nouvelle vie d'étudiant! Le tout se fait dans la bonne humeur et avec bienveillance, l'objectif c'est juste de s'amuser à fond!   </p><br/>
                    <h3>La petite histoire</h3>
                    <p>Chaque année, deux factions composéees d'une multitude d'équipes s'affrontent. Le thème de cette année: Thème</p><br />
                    <h3>Ce site c'est quoi ?</h3>
                    <p>C'est ici que tu trouveras toutes les informations nécessaires au déroulement de la semaine d'inté. Par exemple, tu pourras prendre ta place pour le WEI où regarder quelle faction est la plus proche de la victoire.</p>
                </div>
            </div>
        </>
    )
}