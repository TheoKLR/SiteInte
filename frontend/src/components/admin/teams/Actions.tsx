import { useEffect, useState } from 'react';
import Select from 'react-select'
import { createTeam, addToFaction, deleteTeam, getAllTeams, renameTeam, validateTeam, teamDistribution} from '../../../services/requests/teams';
import { toArray, toId, handleError } from '../../utils/Submit'
import { Teams, Factions, Users } from '../../utils/Select'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Team } from '../../../services/interfaces';
import { toTable } from '../../utils/Tables';
import {getUsersbyTeam, modifyUserTeam  } from '../../../services/requests/users';
import './Teams.css';

export const CreateTeam = () => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (name !== '') {
      await handleError("Equipe créée !", "Une erreur est survenue", createTeam, name)
      setName('')
    }
  };

  return (
    <div>
      <div>
        <p>Nom</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>Soumettre</button>
      <ToastContainer position="bottom-right"/>
    </div>
  );
};

export const AddToFaction = () => {
  const [faction, setFaction] = useState({} as any)
  const [teams, setTeams] = useState([] as any)

  const Submit = async () => {
    const t = toArray(teams)
    const id = toId(faction)
    await handleError("Equipe ajoutée !", "Une erreur est survenue", addToFaction, t, id)
    setTeams([])
    setFaction({})
  }

  return (
    <div>
      <div className="select-container">
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={Teams()}
          onChange={teams => setTeams(teams)}
          value={teams}
        />
        <Select
          value={faction}
          options={Factions()}
          onChange={faction => setFaction(faction)}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right"/>
    </div>
  )
}

export const DeleteTeam = () => {
  const [team, setTeam] = useState({} as any)

  const Submit = async () => {
    const id = toId(team)
    deleteTeam(id)
    await handleError("Equipe supprimée !", "Une erreur est survenue", deleteTeam, id)
    setTeam({});
  }

  return (
    <div>
      <div className="select-container">
        <Select
          value={team}
          options={Teams()}
          onChange={team => setTeam(team)}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right"/>
    </div>
  )
}

export const ModifyTeam = () => {
  const [team, setTeam] = useState({} as any)
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const Submit = async () => {
    const id = toId(team)
    await handleError("Equipe modifiée !", "Une erreur est survenue", renameTeam, id, name, type)
    setTeam({});
    setName("");
    setType("");
  }

  return (
    <div>
      <div className="input">
        <label>Choisis l'équipe
        <Select
          value={team}
          options={Teams()}
          onChange={team => setTeam(team)}
        />
        </label>
        <label>Nom
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>Type
        <input type="text" value={type} onChange={e => setType(e.target.value)} />
        </label>
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right"/>
    </div>
  )
}

export const ModifyTeamMembers = () => {
  const [team, setTeam] = useState({} as any);
  const [members, setMembers] = useState([] as any);

  const Submit = async () => {
    const teamId = toId(team);
    await handleError("Equipe mise à jour !", "Une erreur est survenue", modifyUserTeam, members, teamId);
    setTeam({});
    setMembers([]);
  };

  const handleTeamChange = async (selectedTeam: any) => {
    setTeam(selectedTeam);
    if (selectedTeam) {
      const teamMembers = await getUsersbyTeam(toId(selectedTeam));
      if (teamMembers) {
        setMembers(teamMembers.map((user: any) => ({ value: user.id, label: user.first_name + " " + user.last_name })));
      } else {
        setMembers([]);
      }
    } else {
      setMembers([]);
    }
  };

  const handleMembersChange = (selectedMembers: any) => {
    setMembers(selectedMembers);
  };

  return (
    <div>
      <div className="input">
        <label>Choisissez l'équipe
          <Select
            value={team}
            options={Teams()}
            onChange={handleTeamChange}
          />
        </label>
        <label>Personnes dans l'équipe
          <Select
            value={members}
            isMulti
            options={Users()}
            onChange={handleMembersChange}
          />
        </label>
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export const ValidateTeam = () => {

  const [team, setTeam] = useState({} as any);
  const [official, setOfficial] = useState(false);

  const Submit = async () => {
    const teamId = toId(team);
    console.log(teamId,official);
    await handleError("Equipe mise à jour !", "Une erreur est survenue", validateTeam, teamId, official);
    setTeam({});
    setOfficial(false);
  };

  const handleTeamChange = async (selectedTeam: any) => {
    setTeam(selectedTeam);
  }

  return (
    <div>
      <div className="input">
        <label>Choisissez l'équipe</label>
          <Select
            value={team}
            options={Teams()}
            onChange={handleTeamChange}
          />
        <label>
          Valider la Team ?
        </label>
        <div className="button-container">
          <button
            className={`toggle-button ${official === true ? 'active' : ''}`}
            onClick={() => setOfficial(true)}
          >
            Validée
          </button>
          <button
            className={`toggle-button ${official === false ? 'active' : ''}`}
            onClick={() => setOfficial(false)}
          >
            Pas validée
          </button>
        </div>
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export const DistributeTeam = () => {


  const Submit = async () => {
    await handleError("Equipe mise à jour !", "Une erreur est survenue", teamDistribution);
  };

  return (
    <div>
      <div className="input">
        <label>Voulez-vous répartir aléatoirement les nouveaux dans leurs équipes ? </label>
         <p><strong>(Effet que sur ceux qui n'ont toujours d'équipe)</strong></p>
      </div>
      
      <button className="submit-button" onClick={Submit}>Distribuer</button>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export const TableTeams = () => {

  const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const teams = await getAllTeams();
                setTeams(teams)
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };
        fetchRole();
    }, []);
  return teams.length > 0 ? toTable(teams) : null;
}