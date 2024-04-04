import { useEffect, useState } from 'react';
import { createFaction, deleteFaction, getAllFactions } from '../../../services/requests/factions';
import Select from 'react-select'
import { toId } from '../../utils/Submit'
import { Factions } from '../../utils/Select'
import { handleError } from '../../utils/Submit';
import { ToastContainer } from 'react-toastify';
import { Faction } from '../../../services/interfaces';
import { toTable } from '../../utils/Tables';
import { getRole } from '../../../services/requests';

export const CreateFaction = () => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (name !== '') {
      await handleError("Faction créée !", "Une erreur est survenue", createFaction, name)
      setName('');
    }
  };

  return (
    <div>
      <div>
        <p>Nom</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
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
    await handleError("Faction suprimée !", "Une erreur est survenue", deleteFaction, id)
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

export const TableFaction = () => {

  const [factions, setFactions] = useState<Faction[]>([]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const factions = await getAllFactions();
                setFactions(factions)
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };
        fetchRole();
    }, []);

  return factions.length > 0 ? toTable(factions) : null;
}