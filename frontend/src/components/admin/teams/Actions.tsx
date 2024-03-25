import { useState } from 'react';
import Select from 'react-select'
import { createTeam, addToFaction, deleteTeam } from '../../../services/requests/teams';
import { toArray, toId, handleError } from '../../utils/Submit'
import { Teams, Factions } from '../../utils/Select'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const CreateTeam = () => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name !== '') createTeam(name)
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value)
  };

  return (
    <div>
      <div>
        <p>Nom</p>
        <input type="text" onChange={handleChange} />
      </div>
      <button className="" onClick={handleSubmit}>Soumettre</button>
    </div>
  );
};

export const AddToFaction = () => {
  const [faction, setFaction] = useState([] as any)
  const [teams, setTeams] = useState({} as any)

  const Submit = () => {
    addToFaction(toArray(teams), toId(faction))
  }

  return (
    <div>
      <div className="select-container">
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={Teams()}
          onChange={teams => setTeams(teams)}
        />
        <Select
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
  }

  return (
    <div>
      <div className="select-container">
        <Select
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