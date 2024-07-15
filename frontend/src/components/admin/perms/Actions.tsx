import { useEffect, useState } from 'react';
import Select from 'react-select'
import { toId } from '../../utils/Submit'
import { Perms } from '../../utils/Select'
import { handleError } from '../../utils/Submit';
import { toast, ToastContainer } from 'react-toastify';
import { Faction } from '../../../services/interfaces';
import { toTable } from '../../utils/Tables';
import { createPerm, deletePerm, getAllPerms } from '../../../services/requests/perms';

export const CreatePerm = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [startingTime, setStartingTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [studentNumber, setStudentNumber] = useState(0);

  const handleSubmit = async () => {
    if (name !== '') {
      try {
        await createPerm(name, desc, startingTime, duration, studentNumber);
        toast.success("Perm créée !");
        setName('');
        setDesc('');
        setStartingTime('');
        setDuration(0);
        setStudentNumber(0);
      } catch (error) {
        toast.error("Une erreur est survenue");
      }
    }
  };

  return (
    <div>
      <div>
        <p>Nom</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <p>Description</p>
        <input type="text" value={desc} onChange={e => setDesc(e.target.value)} />
        <p>Date de début</p>
        <input type="datetime-local" value={startingTime} onChange={e => setStartingTime(e.target.value)} />
        <p>Durée</p>
        <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} />
        <p>Nombre de permanenciers max</p>
        <input type="number" value={studentNumber} onChange={e => setStudentNumber(Number(e.target.value))} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  );
};


export const DeletePerm = () => {
  const [perm, setPerm] = useState({} as any)

  const Submit = async () => {
    const id = toId(perm)
    await handleError("Perm suprimée !", "Une erreur est survenue", deletePerm, id)
    setPerm({})
  }

  return (
    <div>
      <div className="select-container">
        <Select
          options={Perms()}
          onChange={perm => setPerm(perm)}
          value={perm}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export const TablePerms = () => {

  const [factions, setFactions] = useState<Faction[]>([]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const factions = await getAllPerms();
        setFactions(factions)
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
    fetchRole();
  }, []);

  return factions.length > 0 ? toTable(factions) : null;
}