import { useState } from 'react';
import { handleError } from '../utils/Submit';
import { setTimestamp } from '../../services/requests/teams';




// Formulaire pour que les étudiants de l'utt puissent choisir les rôles qui les intérresseraient pour l'inté
export const ShotgunCE = () => {

    const [answer, setAnswer] = useState('');
    const [success, setSuccess] = useState(false);

    const test = () => {
        if(answer === "T'as les cramptés?") {
            //Requête de validation avec envoi du timestamp
            const timestamp = Date.now();
            setTimestamp(timestamp);
            setSuccess(true);
        } else {
            return null
        }
    }

    const handleSubmit = () => {
        handleError("Bien joué", "Mauvaise saisie", test)
    }

   
    return (
        <>
            <div className='containerChoix'>
                <h3>Tu veux devenir CE ? Trop bien ! Dépêche toi de remplir ce formulaire et de l'envoyer car c'est premier arrivé premier servi !</h3>
                <form onSubmit={handleSubmit}>
                    <p>Ecris "T'as les cramptés?"</p>
                    <input type="text" placeholder="Nom Prénom" autoComplete="off" onChange={(e) => setAnswer(e.target.value)} value={answer} required />
                    <button className="login-button" type="submit">Envoyer</button>
                    {success && <p>Bien joué ta candidature a bien été prise en compte!</p>}

                </form>
            </div>
        </>
    )
}
