import { useState } from 'react';
import Select from 'react-select'
import { createRole, deleteRole } from '../../../services/requests/roles';
import { toId, handleError } from '../utils/Submit'
import { Roles } from '../utils/Select'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const CreateRole = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = () => {
    if (name !== '') createRole(name, desc)
  };

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value)
  };

  const handleDescChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(evt.target.value)
  };

  return (
    <div>
      <div>
        <p>Nom</p>
        <input type="text" onChange={handleNameChange} />
        <p>Description</p>
        <input type="text" onChange={handleDescChange} />
      </div>
      <button className="" onClick={handleSubmit}>Soumettre</button>
    </div>
  );
};

export const DeleteRole = () => {
  const [Role, setRole] = useState({} as any)

  const Submit = async () => {
    const id = toId(Role)
    await handleError(deleteRole, id)
  }

  return (
    <div>
      <div className="select-container">
        <Select
          options={Roles()}
          onChange={Role => setRole(Role)}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer
        position="bottom-right"
      />
    </div>
  )
}