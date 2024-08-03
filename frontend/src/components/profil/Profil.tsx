import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateUser } from '../../services/requests/users';
import { handleError } from '../utils/Submit';
import { ToastContainer, toast } from 'react-toastify';
import './Profil.css';
import { Faction, Team } from '../../services/interfaces';
import { getAllMembersTeam, getTeam } from '../../services/requests/teams';
import { getFaction } from '../../services/requests/factions';
import Select from "react-select";
import { Option } from "../../services/interfaces";

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
        { value: 'Master', label: 'Master' },
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

            console.log(branch);
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
    const [teamMembers, setTeamMembers] = useState([]);
    const [userFaction, setFaction] = useState<Faction>();

    useEffect(() => {
        const fetchUserTeamData = async () => {
            try {
                const currentUser = await getCurrentUser();
                const team = await getTeam(currentUser.team_id);
                setTeam(team);
                if (team) {
                    setFaction(await getFaction(team.faction));
                    setTeamMembers(await getAllMembersTeam(team.id))
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
                <div className='affichageTeam'>
                    <h3 id='msgTeams'> { userTeam?.name ? userTeam.name : "Tu n'as pas d'équipe d'attribuée pour l'instant"}</h3>
                        {teamMembers?.length !== 0 ? (
                            teamMembers?.map((member : any) => (
                               <p key={member.id}>{member.first_name +' '+ member.last_name}</p>
                            ))
                        ) : (
                            <p>Tu n'as pas de coéquipier pour l'instant</p>
                        )}
                </div>
                <div className='affichageFaction'>
                    <h3 id='msgFaction'>Ta faction</h3>
                    <p id='nameFaction'>{userFaction?.name}</p>
                </div>
            </div>
        </>
    );
};

