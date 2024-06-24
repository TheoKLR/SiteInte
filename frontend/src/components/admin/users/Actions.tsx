import { Users, Teams, UUIDs } from '../../utils/Select'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { toArray, toId, tochainString } from '../../utils/Submit'
import { addToTeam, changePermission } from '../../../services/requests/users';
import { handleError } from '../../utils/Submit'
import { ToastContainer } from 'react-toastify'
import { User, newStudent } from '../../../services/interfaces'
import { getAllUsers } from '../../../services/requests'
import { toTable } from '../../utils/Tables'
import { createUUID, deleteUUID, getAllUUID } from '../../../services/requests/newstudent';

export const AddToTeam = () => {
  const [users, setUsers] = useState([] as any)
  const [team, setTeam] = useState({} as any)

  const Submit = async () => {
    const u = toArray(users)
    const id = toId(team)
    await handleError("Utilisateur ajouté !", "Une erreur est survenue", addToTeam, u, id)
    setUsers([])
    setTeam({})
  }

  return (
    <div>
      <div className="select-container">
        <Select
          value={users}
          closeMenuOnSelect={false}
          isMulti
          options={Users()}
          onChange={users => setUsers(users)}
        />
        <Select
          value={team}
          options={Teams()}
          onChange={team => setTeam(team)}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export const ChangePermission = () => {
  const [user, setUser] = useState({} as any)
  const [perm, setPerm] = useState({} as any)

  const permTypeOptions = [
    { value: 'Student', label: 'Etudiant' },
    { value: 'Admin', label: 'Admin' },
    { value: 'RespoCE', label: 'RespoCE' },
    { value: 'Respo', label: 'Respo' },
    { value: 'Anim', label: 'Anim' }
  ];


  const Submit = async () => {
    const id = toId(user)
    await handleError("permission modifiée !", "Une erreur est survenue", changePermission, id, perm.value)
    setUser({})
    setPerm({})
  }

  return (
    <div>
      <div className="select-container">
        <Select
          options={Users()}
          onChange={user => setUser(user)}
          value={user}
        />
        <Select
          options={permTypeOptions}
          onChange={perm => setPerm(perm)}
          value={perm}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  )
}



export const TableUser = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response)
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
    fetchRole();
  }, []);

  return users.length > 0 ? toTable(users) : null;
}

export const ManageUUIDs = () => {

  const [count, setCount] = useState(0);
  const [uuids, setUUIDs] = useState([] as any )

  const handleCreation = async () => {
    if (count !== 0) {
      await handleError("UUIDs créés", "Une erreur est survenue", createUUID, count)
      setCount(0);
    }
  };

  const handleDeletion = async () => {
    const strUUIds = tochainString(uuids);
    await handleError("UUIDs supprimés", "Une erreur est survenue", deleteUUID, strUUIds);
    setUUIDs([]);
  };

  return (
    <div>
      <div className="input">
        <h3>Creéation UUIDs</h3>
        <p>Combien voulez-vous créer de clés unique ?</p>
        <input type="number" value={count} onChange={e => setCount(Number(e.target.value))} />
        <button className="submit-button" onClick={handleCreation}>Soumettre</button>
      </div>
      <h3>Suppression UUIDs</h3>
      <p>Sélectionner les clées unique à supprimer ?</p>
      <div className="select-container">
        <Select
          value={uuids}
          closeMenuOnSelect={false}
          isMulti
          options={UUIDs()}
          onChange={uuids => setUUIDs(uuids)}
        />
        <button className="submit-button" onClick={handleDeletion}>Suppression</button>
      </div>

      <ToastContainer position="bottom-right"/>
    </div>
  );
};

export const TableUUIDs = () => {
  const [UUIDs, setUUIDs] = useState<newStudent[]>([]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await getAllUUID();
        setUUIDs(response)
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
    fetchRole();
  }, []);

  return UUIDs.length > 0 ? toTable(UUIDs) : null;
}