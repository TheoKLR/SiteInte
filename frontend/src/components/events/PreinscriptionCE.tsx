import { useState, useEffect } from 'react'
import Select from 'react-select'
import { getCurrentUser } from '../../services/requests'
import { User } from '../../services/interfaces'
import { getAllUsers } from '../../services/requests'
import { createTeam, registerTeam } from '../../services/requests/teams'
import { handleError } from '../utils/Submit'
import { toArray } from '../utils/Submit'

// Formulaire pour que les étudiants de l'utt puissent choisir les rôles qui les intérresseraient pour l'inté
export const PreInscription = () => {
    const [Options, setOptions] = useState([]);
    const [userIndex, setUserIndex] = useState(0);
    const [teamName, setTeamName] = useState('');
    const [users, setUsers] = useState([] as any);
    const [hasTeam, setHasTeam] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const allUsers = await getAllUsers();
            const currentUser = await getCurrentUser();

            const index = allUsers.data.findIndex((i: User) => i.id === currentUser.id);
            setUserIndex(index);

            const usersOptions = allUsers
                .data
                .filter((u: User) => u.team_id === null)
                .map((user: User) => ({
                    value: user.id,
                    label: `${user.first_name} ${user.last_name}`,
                }))
            setOptions(usersOptions);
            
            if (currentUser.team_id) {
                setHasTeam(currentUser.team_id);
            } else {
                
            }
            setUsers([usersOptions[index]])
        }
        fetchData();
    }, []);

    const handleSubmit = () => {
        if (setUsers.length == 4 || setUsers.length == 5) {
            console.log(toArray(users))
            const u = toArray(users)
            handleError("equipe ajoutée", "une erreur s'est produite", registerTeam, teamName, u)   
        }
        setHasTeam(true)
    }

    return (
        <div>
            {hasTeam ? (
                <div>
                    <p>Tu ne peux pas inscrire une équipe car tu as déjà une équipe assignée</p>
                    <p>Ton équipe : {hasTeam}</p>
                    <p>Si il y a un problème avec ton équipe, contacte les administrateurs !</p>
                </div>
            ) : (
                <div>
                    <p>Nom provisoire de l'équipe</p>
                    <input type="text" onChange={(e) => { setTeamName(e.target.value) }} />
                    <Select
                        isMulti
                        closeMenuOnSelect={false}
                        options={Options}
                        value={Options[userIndex]}
                        onChange={u => setUsers(u)}
                        isOptionDisabled={() => users.length >= 5 && users.length < 4}
                    />
                    <button className="" onClick={handleSubmit}>Soumettre</button>
                </div>
            )}
        </div>
    )
}
