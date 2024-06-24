import { useEffect, useState } from 'react';
import Select from 'react-select'
import { createTeam, addToFaction, deleteTeam, getAllTeams, renameTeam } from '../../../services/requests/teams';
import { toArray, toId, handleError } from '../../utils/Submit'
import { Teams, Factions } from '../../utils/Select'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Team } from '../../../services/interfaces';
import { toTable } from '../../utils/Tables';

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

export const RenameTeam = () => {
  const [team, setTeam] = useState({} as any)
  const [name, setName] = useState("");

  const Submit = async () => {
    const id = toId(team)
    await handleError("Equipe renommée !", "Une erreur est survenue", renameTeam, name, id)
    setTeam({});
    setName("");
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
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right"/>
    </div>
  )
}

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