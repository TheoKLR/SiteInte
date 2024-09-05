import React, { useEffect, useState } from 'react';
import {getBusAttribution, getCurrentUser, setBusData, updateUser} from '../../services/requests/users';
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

export const InfoWEI: React.FC = () => {
    const [bus, setBus] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const busAttrib = await getBusAttribution()
            busAttrib ? setBus(busAttrib.bus) : setBus(null)
        };

        fetchUserData();
    }, []);

    return (
        <div className="profil-form-container">
            <p style={{textAlign: "center"}}>Ici tu peux consulter la place qui t'a été attribuée pour le WEI !</p>
            <p style={{textAlign: "center", marginTop: '40px'}}>
                {bus ? (
                    <>
                        Tu es placé en bus <span style={{fontWeight: 'bold'}}>{bus}</span>
                        <br></br>
                        Tu es attendu à l'UTT à : <span style={{fontWeight: 'bold'}}>{(bus < 6) ? "11h" : "13h"}</span>
                        <br></br>
                        <br></br>
                        Ne soit pas en retard et n'oublie pas les objets indispensables du WEI:
                        <br></br>
                        <br></br>
                        <ul className="custom-list" style={{ listStyleType: 'none', padding: 0 }}>
                            <li>Un sac de couchage chaud</li>
                            <li>Des vêtements qui ne craignent rien (dès le départ en bus vendredi matin)</li>
                            <li>Des vêtements qui tiennent chaud</li>
                            <li>Un matelas gonflable ou un tapis de sol (pour le confort du dodo)</li>
                            <li>Un k-way</li>
                            <li>Ta carte d'identité</li>
                            <li>De l'argent (CB et/ou espèces) si tu veux pouvoir acheter à boire au WEI</li>
                            <li>Une serviette et du savon (si tu veux être propre</li>
                            <li>Une bombe anti-moustique (ton corps te remerciera)</li>
                            <li>De la crème solaire (ton corps te remerciera aussi)</li>
                            <li>Ton autorisation parentale si tu es mineur</li>
                            <li>Des bouchons d'oreilles si tu en as</li>
                            <li>Ton écocup, ton tupperware ainsi que des couverts (sinon, tu dis au revoir au miam miam)
                            </li>
                        </ul>
                        <br></br>
                        <br></br>
                        Pour rappel, voici la vidéo des indispensables du WEI <a
                        href="https://drive.google.com/file/d/1IzeIgHVcoFB4Wk4ngky1HicoBbd08zHO/view?usp=drivesdk"
                        target="_blank"
                        rel="noopener noreferrer">ici</a>
                    </>

                ) : (
                    "Tu n'as pas de place attribuée pour l'instant"
                )}
            </p>
            <ToastContainer position="bottom-right"/>
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
                setChallenges(challenges.filter((chall: any) => chall.challType === ChallType.Student))
                setChallengesTeam(challenges.filter((chall: any) => chall.challType === ChallType.Team))
                setChallengesFaction(challenges.filter((chall: any) => chall.challType === ChallType.Faction))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUserTeamData();
    }, []);

    return (
        <>
            <div className='containerTeam'>
                <h2>
                    Pour valider tes challenges, ça se passe <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSebaniKF4rFT2HDRmAhud5zJ-tqz9NUk7UXNg71pu8jM94j7Q/viewform"
                    target="_blank" rel="noopener noreferrer">ici</a>
                </h2>
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