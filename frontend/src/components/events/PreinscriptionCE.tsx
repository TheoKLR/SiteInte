import { useState, useEffect } from 'react'
import Select from 'react-select'
import { Users } from '../utils/Select'
import { getCurrentUser } from '../../services/requests'
import { User } from '../../services/interfaces'

// Formulaire pour que les étudiants de l'utt puissent choisir les rôles qui les intérresseraient pour l'inté
export const PreInscription = () => {
    const [teamName, setTeamName] = useState('')
    const [users, setUsers] = useState([] as any)
    const [hasTeam, setHasTeam] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCurrentUser();
            if (response.team) {
                setHasTeam(response.team);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = () => {
        console.log(teamName)
        console.log(users)
    }

    const getUserOption = async () => {
        const response = await getCurrentUser()
        return response.map((user: User) => ({
            value: user.id,
            label: `${user.first_name} ${user.last_name}`,
        }))
    }

    if (hasTeam !== '') {
        <div>
        <p>Tu ne peux pas inscrire une équipe car tu as déja un équipe assignée</p>
        <p>Ton équipe : {hasTeam}</p>
        <p>Si il y a un probleme avec ton équipe contacte les administrateurs !</p>
        </div>
    }

    return (
        <div>
            <p>Nom provisoire de l'équipe</p>
            <input type="text" onChange={(e) => {setTeamName(e.target.value)}} />
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={Users()}
                defaultValue={getUserOption()}
                onChange={users => setUsers(users)}
                isOptionDisabled={() => users.length >= 5}
            />
            <button className="" onClick={handleSubmit}>Soumettre</button>
        </div>
    )
}
