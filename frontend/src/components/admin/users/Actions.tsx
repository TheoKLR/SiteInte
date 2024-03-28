import { Users, Teams } from '../../utils/Select'
import Select from 'react-select'
import { useState } from 'react'
import { toArray, toId } from '../../utils/Submit'
import { addToTeam } from '../../../services/requests/users'
import { handleError } from '../../utils/Submit'
import { ToastContainer } from 'react-toastify'

export const AddToTeam = () => {
  const [users, setUsers] = useState([] as any)
  const [team, setTeam] = useState({} as any)

  const Submit = async () => {
    const u = toArray(users)
    const id = toId(team)
    await handleError("Utilisateur ajouté !", "Une erreur est survenue", addToTeam, u, id)
  }

  return (
    <div>
      <div className="select-container">
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={Users()}
          onChange={users => setUsers(users)}
        />
        <Select
          options={Teams()}
          onChange={team => setTeam(team)}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right"/>
    </div>
  )
}