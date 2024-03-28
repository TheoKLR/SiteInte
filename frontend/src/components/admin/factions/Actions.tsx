import { useState } from 'react';
import { createFaction, deleteFaction } from '../../../services/requests/factions';
import Select from 'react-select'
import { toId } from '../../utils/Submit'
import { Factions } from '../../utils/Select'
import { handleError } from '../../utils/Submit';
import { ToastContainer } from 'react-toastify';

export const CreateFaction = () => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (name !== '') {
      await handleError("Faction créée !", "Une erreur est survenue", createFaction, name)
      createFaction(name);
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
      <ToastContainer position="bottom-right"/>
    </div>
  );
};

export const DeleteFaction = () => {
  const [faction, setFaction] = useState({} as any)

  const Submit = async () => {
    const id = toId(faction)
    await handleError("Faction créée !", "Une erreur est survenue", deleteFaction, id)
  }

  return (
    <div>
      <div className="select-container">
        <Select
          options={Factions()}
          onChange={faction => setFaction(faction)}
          value={faction}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right"/>
    </div>
  )
}