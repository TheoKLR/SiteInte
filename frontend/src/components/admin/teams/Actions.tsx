import { useState } from 'react';
import Select from 'react-select'
import { createTeam, addToFaction, deleteTeam } from '../../../services/requests/teams';
import { toArray, toId, handleError } from '../../utils/Submit'
import { Teams, Factions } from '../../utils/Select'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const CreateTeam = () => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (name !== ''){
      createTeam(name);
      setName('');
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value)
  };

  return (
    <div>
      <div>
        <p>Nom</p>
        <input type="text" value={name} onChange={handleChange} />
      </div>
      <button className="" onClick={handleSubmit}>Soumettre</button>
    </div>
  );
};

export const AddToFaction = () => {
  const [faction, setFaction] = useState([] as any)
  const [teams, setTeams] = useState({} as any)

  const Submit = () => {
    addToFaction(toArray(teams), toId(faction));
    setFaction('');
    setTeams('');
  }

  return (
    <div>
      <div className="select-container">
        <Select
        value={teams}
          closeMenuOnSelect={false}
          isMulti
          options={Teams()}
          onChange={teams => setTeams(teams)}
        />
        <Select
          value={faction}
          options={Factions()}
          onChange={faction => setFaction(faction)}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
    </div>
  )
}

export const DeleteTeam = () => {
  const [team, setTeam] = useState({} as any)

  const Submit = async () => {
    const id = toId(team)
    deleteTeam(id)
    await handleError("Equipe supprimée !", "Une erreur est survenue", deleteTeam, id)
    setTeam('');
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
      <ToastContainer
        position="bottom-right"
      />
    </div>
  )
}