
import { useEffect, useRef, useState } from 'react';
import { submitChoices } from '../../services/requests';
import { getAllRoles } from '../../services/requests/roles';
import { handleError } from '../utils/Submit';
import './Choice.css';
import { ToastContainer } from 'react-toastify';

// Formulaire pour que les étudiants de l'utt puissent choisir les rôles qui les intérresseraient pour l'inté
export const Choice = () => {
    const [checkedValues, setCheckedValues] = useState<number[]>([]);
    const [desires, setDesires] = useState<any[]>([]);
    // Appelé à chaque cochage/décochage d'une checkbox
    // Récupère les id des choix cochés et les stocke dans un array d'entiers
    function handleChange(event: React.FormEvent) {
        const { id, value, checked } = event.target as HTMLInputElement;
        if (id !== "btnLegal") {
            setCheckedValues(pre => {
                if (checked) {
                    return [...pre, parseInt(value)];
                } else {
                    return pre.filter(skill => skill !== parseInt(value));
                }
            })
        }
    }

    // Soumission du formulaire
    const handleSubmit = async () => {
        await handleError("Choix envoyés avec succès", "Problème rencontré lors de l'envoi des choix", submitChoices, checkedValues)
    }

    // récupération des choix de rôle existants dans la db
    useEffect(() => {
        getAllRoles()
            .then(res => {
                const data = res.data;
                setDesires(data);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la récupération des souhaits :', error);
            });
    }, [])

    // Frontend
    // Création des checkbox automatique en fonction des rôles existants dans la db
    return (
        <div className='containerChoix'>
            <p>L'inté a besoin de beaucoup de gens dans de nombreux domaines. Choisis ton rôle afin d'aider au mieux!</p><br />
            <div className='inputs'>
                <form>
                    {desires.map((desire, index) => (
                        <div className="checkbox-wrapper-1" key={index}>
                            <input id={index.toString()} className="substituted" type="checkbox" aria-hidden="true" value={desire.id} onChange={handleChange} />
                            <label htmlFor={index.toString()}><strong>{desire.name}</strong> : {desire.description}</label>
                        </div>
                    ))}
                    <br />
                    <div className='reglementation'>
                        <h3>L'esprit de l'intégration</h3>
                        <p>Le but de l'intégration est de faire découvrir aux nouveaux le monde étudiant, le fonctionnement et les locaux de l'école, de faire former des groupes de potes chez les nouveaux, mais aussi et surtout d'envoyer du rêve. Cette intégration, nous l'organisons pour les nouveaux, pas contre eux ni pour nous..
                            <br /><br />
                            En étant bénévole pour cette intégration, vous aurez automatiquement un rôle de modèle et d'exemple vis-à-vis des nouveaux. C'est normal, vous avez déjà passé un peu de temps dans cette école et donc vous en savez plus. Cependant, c'est dans cette situation que vous pouvez être amené à bizuter, sans parfois même vous en rendre compte ou sans la volonté de nuire.
                            <br /><br />
                            Si un nouveau ne veut pas faire quelque chose, vous ne devez pas insister pour qu'il le fasse. <br /><br />
                            Ce n'est pas parce qu'on vous l'a fait à votre intégration que c'est acceptable. <br /><br />
                            Ce n'est pas parce que vous trouvez cela drôle que cela l'est aussi pour les nouveaux. <br /><br />
                            Si vous êtes témoins de bizutage pendant l'intégration, ou que vous avez un doute si quelque chose est acceptable, contactez un coordinateur. <br />
                            Notez ce numéro d'urgence, à ne jamais utiliser pour jouer (c'est comme le 15 ou le 112) : 07.68.74.02.59. <br />
                            Le bizutage est un délit, puni par la loi. Ceux qui le pratiquent risquent des peines de prison ou de fortes amendes. En marge des poursuites judiciaires engagées, ils peuvent être présentés aux sections disciplinaires de l'UTT, avec des sanctions pouvant aller jusqu'à l'exclusion définitive de tout établissement d'enseignement supérieur français. <br /><br /></p>
                        <h3>Règlementation légale</h3>
                        <h4> Extrait de la loi n°98-468 du 17 juin 1998 </h4> <br />
                        <p>Section 3 bis – Du bizutage <br /> <br />
                            « Article 225-16-1. Hors les cas de violences, de menaces ou d'atteintes sexuelles, le fait pour une personne d'amener autrui, contre son gré ou non, à subir ou à commettre des actes humiliants ou dégradants lors de manifestations ou de réunions liées aux milieux scolaire et socio-éducatif est puni de six mois d'emprisonnement et de 7 500 euros d'amende. »
                            <br /> <br />
                            « Article 225-16-2.L'infraction définie à l'article 225-16-1 est punie d'un an d'emprisonnement et de 15 000 euros d'amende lorsqu'elle est commise sur une personne dont la particulière vulnérabilité, due à son âge, à une maladie, à une infirmité, à une déficience physique ou psychique ou à un état de grossesse, est apparente ou connue de son auteur. »
                            <br /> <br />
                            « Article 225-16-3.Les personnes morales déclarées responsables pénalement, dans les conditions prévues par l'article 121-2, des infractions définies aux articles 225-16-1 et 225-16-2 encourent, outre l'amende suivant les modalités prévues par l'article 131-38, les peines prévues par les 4° et 9° de l'article 131-39. »
                            <br /> <br />
                        </p>
                        <div className="checkbox-wrapper-1">
                            <input id="btnLegal" className="substituted" type="checkbox" aria-hidden="true" required/>
                            <label htmlFor="btnLegal">Je comprends l'objectif de l'intégration et je comprends que mes actions peuvent être punies par une sanction disciplinaire et une peine d'emprisonnement et 15 000 € d'amende.</label>
                        </div>
                    </div>
                </form>
                <button  className="login-button, button-36" onClick={handleSubmit}>Valider</button>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    )
}
