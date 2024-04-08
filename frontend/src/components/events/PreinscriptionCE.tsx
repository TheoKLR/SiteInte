import { useState, useEffect } from 'react'
import Select from 'react-select'
import { getCurrentUser } from '../../services/requests';
import { UserLight } from '../../services/interfaces'
import { registerTeam } from '../../services/requests/teams'
import { handleError } from '../utils/Submit'
import { toArray } from '../utils/Submit'
import { ToastContainer } from 'react-toastify';
import { getUserLight } from '../../services/requests/users';

// Formulaire pour que les étudiants de l'utt puissent choisir les rôles qui les intérresseraient pour l'inté
export const PreInscription = () => {
    const [Options, setOptions] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [users, setUsers] = useState([] as any);
    const [hasTeam, setHasTeam] = useState(false);
    const [currentUserId, setId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const allUsers = await getUserLight();
            const currentUser = await getCurrentUser();
            setId(currentUser.id);

            const usersOptions = allUsers
                .data
                .filter((u: UserLight) => u.team_id === null)
                .map((user: UserLight) => ({
                    value: user.id,
                    label: `${user.first_name} ${user.last_name}`,
                }))
            setOptions(usersOptions);

            if (currentUser.team_id) {
                setHasTeam(currentUser.team_id);
            } else {

            }
        }
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (users.length == 3 || users.length == 4) {
            const u = toArray(users)
            u.push(currentUserId)
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
                        onChange={u => setUsers(u)}
                        isOptionDisabled={() => users.length >= 4}
                    />
                    <button className="" onClick={handleSubmit}>Soumettre</button>
                    <ToastContainer position="bottom-right"/>
                </div>
            )}
        </div>
    )
}

