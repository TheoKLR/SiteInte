import { Users, Teams } from '../../utils/Select'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { toArray, toId } from '../../utils/Submit'
import { addToTeam, changePermission } from '../../../services/requests/users';
import { handleError } from '../../utils/Submit'
import { ToastContainer } from 'react-toastify'
import { User } from '../../../services/interfaces'
import { getAllUsers } from '../../../services/requests'
import { toTable } from '../../utils/Tables'

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