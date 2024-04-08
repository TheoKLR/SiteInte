import { useState } from 'react';
import Select from 'react-select'
import { createRole, deleteRole } from '../../../services/requests/roles';
import { toId, handleError } from '../../utils/Submit'
import { Roles } from '../../utils/Select'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const CreateRole = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async () => {
    if (name !== '' && desc !== '') {
      await handleError("Role créé !", "Une erreur est survenue", createRole, name, desc)
    }
  };

  return (
    <div>
      <div>
        <p>Nom</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <p>Description</p>
        <input type="text" value={desc} onChange={e => setDesc(e.target.value)} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>Soumettre</button>
      <ToastContainer position="bottom-right"/>
    </div>
  );
};

export const DeleteRole = () => {
  const [Role, setRole] = useState({} as any)

  const Submit = async () => {
    const id = toId(Role)
    await handleError("Rôle suprimé", "Une erreur est survenue", deleteRole, id)
    setRole('');
  }

  return (
    <div>
      <div className="select-container">
        <Select
          options={Roles()}
          onChange={Role => setRole(Role)}
          value={Role}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right"/>
    </div>
  )
}