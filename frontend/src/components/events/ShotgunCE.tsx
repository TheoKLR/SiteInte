import { useEffect, useRef, useState } from 'react';
import { getAllDesires, submitChoices } from '../../services/requests';


// Formulaire pour que les étudiants de l'utt puissent choisir les rôles qui les intérresseraient pour l'inté
export const ShotgunCE = () => {

    const [mainUser, setMainUser] = useState('');
    const [user1, setUser1] = useState('');
    const [user2, setUser2] = useState('');
    const [user3, setUser3] = useState('');
    const [teamName, setTeamName] = useState('');

    const handleSubmit = () => {
        console.log(mainUser)
        console.log(teamName)
        console.log(user1)
        console.log(user2)
        console.log(user3)
    }

   
    return (
        <>
            <div className='containerChoix'>
                <h3>Tu veux devenir CE ? Trop bien ! Dépêche toi de remplir ce formulaire et de l'envoyer car c'est premier arrivé premier servi !</h3>
                <form onSubmit={handleSubmit}>
                    <p>Ton nom prénom</p>
                    <input type="text" placeholder="Nom Prénom" autoComplete="off" onChange={(e) => setMainUser(e.target.value)} value={mainUser} required />
                    <p>Nom d'équipe</p>
                    <input type="text" placeholder="nom équipe" autoComplete="off" onChange={(e) => setTeamName(e.target.value)} value={teamName} required />
                    <p>Partenaire 1</p>
                    <input type="text" placeholder="1er partenaire" autoComplete="off" onChange={(e) => setUser1(e.target.value)} value={user1} required />
                    <p>Partenaire 2</p>
                    <input type="text" placeholder="2ème partenaire" autoComplete="off" onChange={(e) => setUser2(e.target.value)} value={user2} required />
                    <p>Partenaire 3</p>
                    <input type="text" placeholder="3ème partenaire" autoComplete="off" onChange={(e) => setUser3(e.target.value)} value={user3} required />
                    <button className="login-button" type="submit">Envoyer</button>
                </form>
            </div>
        </>
    )
}
