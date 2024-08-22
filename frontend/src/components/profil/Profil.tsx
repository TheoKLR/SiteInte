import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateUser } from '../../services/requests/users';
import { handleError } from '../utils/Submit';
import { ToastContainer, toast } from 'react-toastify';
import './Profil.css';
import {ChallType, Faction, Team, User} from '../../services/interfaces';
import { getAllMembersTeam, getTeam } from '../../services/requests/teams';
import { getFaction } from '../../services/requests/factions';
import Select from "react-select";
import { Option } from "../../services/interfaces";
import {getAvailableChallengeForUser} from "../../services/requests/challenges";

export const ProfilForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [branch, setBranch]= useState<Option | null>(null);
    const [birthday, setBirthday] = useState('');
    const [contact, setContact] = useState('');
    const [discord_id, setDiscordId] = useState('');

    const branchoptions = [
        { value: 'TC', label: 'Tronc Commun' },
        { value: 'RT', label: 'Branche RT' },
        { value: 'ISI', label: 'Branche ISI' },
        { value: 'GM', label: 'Branche GM' },
        { value: 'GI', label: 'Branche GI' },
        { value: 'MTE', label: 'Branche MTE' },
        { value: 'A2I', label: 'Branche A2I' },
        { value: 'SN', label: 'Branche SN' },
        { value: 'MM', label: 'Branche MM' },
        { value: 'Master', label: 'Master' },
        { value: 'RI', label: 'International Student'}
      ];

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const currentUser = await getCurrentUser();
            
            setFirstName(currentUser.first_name);
            setLastName(currentUser.last_name);
            setEmail(currentUser.email);

            const userBranch = branchoptions.find(option => option.value === currentUser.branch) || null;
            setBranch(userBranch);

            setBirthday(currentUser.birthday);
            setContact(currentUser.contact);
            setDiscordId(currentUser.discord_id);

          } catch (error) {
            toast.error('Erreur lors de la récupération du profil. Veuillez réessayer plus tard.');
          }
        };
    
        fetchUserData();
      }, []);

    const handleBranchChange = (selectedOption: any) => {
        setBranch(selectedOption);
    };
      
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            handleError("Profil mis à jour avec succès !", "Une erreur est survenue", updateUser,branch?.value, contact, discord_id);
        } catch (error) {
            toast.error('Erreur lors de la mise à jour du profil. Veuillez réessayer plus tard.');
        }
    };

    return (
        <div className="profil-form-container">
            <p style={{textAlign: "center"}}>Si tu as le moindre soucis avec ton profil n'hésite pas à contacter : integration@utt.fr</p>
            <form onSubmit={handleSubmit} className="form-group">
                <label>
                    Prénom:
                    <input
                        type="text"
                        placeholder={firstName}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled
                    />
                </label>
                <label>
                    Nom:
                    <input
                        type="text"
                        placeholder={lastName}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled
                    />
                </label>
                <label>Email:</label>
                <p>Si tu souhaites changer ton email contacte : integration@utt.fr</p>
                    <input
                        type="text"
                        placeholder={email}
                        value={email}
                        disabled
                    />
                <label>
                    Date de naissance:
                    <input
                        type="date"
                        value={birthday}
                        placeholder={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        disabled
                    />
                </label>
                <label>Ton niveau actuel à l'UTT:</label>
                <Select
                    isMulti={false}
                    value={branch}
                    onChange={handleBranchChange}
                    options={branchoptions}
                    placeholder={branch ? "Tu n'as pas sélectionné de branche": branch}
                    classNamePrefix="custom-select"
                    required
                />
                <label>Discord Tag (Pour rejoindre le discord de l'intégration et être affecté à ton équipe !):</label>
                    <input
                        type="text"
                        value={discord_id}
                        placeholder={discord_id}
                        onChange={(e) => setDiscordId(e.target.value)}
                    />
                <label>
                    Tes moyens de contact (tu peux en mettre plusieurs 😊):
                    <textarea
                        value={contact}
                        placeholder="Entre tes moyens de contact ici..."
                        onChange={(e) => setContact(e.target.value)}
                    />
                </label>
                <button type="submit" className="button-36">Mettre à jour</button>
            </form>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export const TeamDisplay: React.FC = () => {
    const [userTeam, setTeam] = useState<Team>();
    const [teamMembers, setTeamMembers] = useState<User[]>([]);
    const [userFaction, setFaction] = useState<Faction>();
    const [permission, setPermission] = useState("");

    useEffect(() => {
        const fetchUserTeamData = async () => {
            try {
                const currentUser = await getCurrentUser();
                const permission = currentUser.permission;
                const team = await getTeam(currentUser.team_id);
                setTeam(team);
                if (team) {
                    setFaction(await getFaction(team.faction));
                    setTeamMembers(await getAllMembersTeam(team.id));
                }
                if(permission){
                    setPermission(permission);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUserTeamData();
    }, []);    

    return (
        <>
            <div className='containerTeam'>
                <h2>Voici ton équipe !</h2>
                <p>En couleur ce sont tes chefs d'équipes !</p>
                <div className='affichageTeam'>
                    <h3 id='msgTeams'> {userTeam?.name ? userTeam.name : "Tu n'as pas d'équipe d'attribuée pour l'instant"}</h3>
                    <table className="teamTable">
                        <thead>
                            <tr>
                                <th>MEMBRE</th>
                                {permission === "Student" || permission === "Admin" ? <th>CONTACT</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembers?.length !== 0 ? (
                                teamMembers?.map((member: User) => (
                                    <tr key={member.id}>
                                        {(member.permission !== "newStudent") && <td style={{color:"#da4c72d1"}}>{member.first_name + ' ' + member.last_name}</td>}
                                        {member.permission === "newStudent" &&<td>{member.first_name + ' ' + member.last_name}</td>}
                                        {permission === "Student" || permission === "Admin" ? <td>{member.contact}</td> : null}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2}>Tu n'as pas de coéquipier pour l'instant</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='affichageFaction'>
                    <h3 id='msgFaction'>Ta faction</h3>
                    <p id='nameFaction'>{userFaction?.name}</p>
                </div>
            </div>
        </>
    );
};

export const PossibleChallengeDisplay: React.FC = () => {
    const [userTeam, setTeam] = useState<Team>();
    const [teamMembers, setTeamMembers] = useState([]);
    const [userFaction, setFaction] = useState<Faction>();
    const [permission, setPermission] = useState("");
    const [challenges, setChallenges] = useState([])
    const [challengesTeam, setChallengesTeam] = useState([])
    const [challengesFaction, setChallengesFaction] = useState([])

    useEffect(() => {
        const fetchUserTeamData = async () => {
            try {
                const currentUser = await getCurrentUser();
                const permission = currentUser.permission;
                const team = await getTeam(currentUser.team_id);
                setTeam(team);
                if (team) {
                    setFaction(await getFaction(team.faction));
                    setTeamMembers(await getAllMembersTeam(team.id));
                }
                if(permission){
                    setPermission(permission);
                }
                //get challenge
                const challenges = await getAvailableChallengeForUser(currentUser.id as number)
                console.log(challenges)
                setChallenges(challenges.filter((chall: any) => chall.challType === ChallType.Student))
                setChallengesTeam(challenges.filter((chall: any) => chall.challType === ChallType.Team))
                setChallengesFaction(challenges.filter((chall: any) => chall.challType === ChallType.Faction))
                console.log(challenges)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUserTeamData();
    }, []);

    return (
        <>
            <div className='containerTeam'>
                <h3>Challenges Individuels</h3>
                <div className='affichageTeam'>
                    <table className="teamTable">
                        <thead>
                        <tr>
                            <th>NOM</th>
                            <th>DESCRIPTION</th>
                            <th>POINTS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {challenges?.length !== 0 ? (
                            challenges?.map((chall: any) => (
                                <tr key={chall.id}>
                                    <td>{chall.name}</td>
                                    <td>{chall.description}</td>
                                    <td>{chall.points}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2}>Chargement...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className='containerTeam'>
                <h3>Challenges d'équipes</h3>
                <div className='affichageTeam'>
                    <table className="teamTable">
                        <thead>
                        <tr>
                            <th>NOM</th>
                            <th>DESCRIPTION</th>
                            <th>POINTS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {challengesTeam?.length !== 0 ? (
                            challengesTeam?.map((chall: any) => (
                                <tr key={chall.id}>
                                    <td>{chall.name}</td>
                                    <td>{chall.description}</td>
                                    <td>{chall.points}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2}>Chargement...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className='containerTeam'>
                <h3>Challenges de factions</h3>
                <div className='affichageTeam'>
                    <table className="teamTable">
                        <thead>
                        <tr>
                            <th>NOM</th>
                            <th>DESCRIPTION</th>
                            <th>POINTS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {challengesFaction?.length !== 0 ? (
                            challengesFaction?.map((chall: any) => (
                                <tr key={chall.id}>
                                    <td>{chall.name}</td>
                                    <td>{chall.description}</td>
                                    <td>{chall.points}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2}>Chargement...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};