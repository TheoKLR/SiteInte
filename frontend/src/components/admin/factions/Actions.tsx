import { useState } from 'react';
import { createFaction, deleteFaction } from '../../../services/requests/factions';
import Select from 'react-select'
import { toId } from '../../utils/Submit'
import { Factions } from '../../utils/Select'


export const CreateFaction = () => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name !== '') {
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
    </div>
  );
};

export const DeleteFaction = () => {
  const [faction, setFaction] = useState({} as any)

  const Submit = () => {
    const id = toId(faction)
    if (id) {
      deleteFaction(toId(faction))
      setFaction('');
    }
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
    </div>
  )
}