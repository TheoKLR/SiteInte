import { useEffect, useState } from 'react';
import Select from 'react-select'
import { createRole, deleteRole } from '../../../services/requests/roles';
import { toId, handleError } from '../../utils/Submit'
import { Roles, Users } from '../../utils/Select';
import { ToastContainer } from 'react-toastify';
import { getWishUsers, getUserWishes } from '../../../services/requests';
import { toTable } from '../../utils/Tables';
import { Role, RoleNoDesc } from '../../../services/interfaces';

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
      <button className="" onClick={handleSubmit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
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
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export const TableRoleUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  const handleChange = async (user: any) => {
    const id = toId(user)
    let wishUsers = await getWishUsers(id)
    console.log(wishUsers)
    wishUsers = wishUsers.map((user: any) => ({
      ID: user.users.id,
      name: `${user.users.first_name} ${user.users.last_name}`,
    }))
    setUsers(wishUsers)
  }

  return (
    <div>
      <Select options={Roles()} onChange={handleChange}/>
      {toTable(users)}
    </div>
  )
}

export const TableUserRoles = () => {
  const [wish, setWish] = useState<any[]>([]);

  const handleChange = async (user: any) => {
    const id = toId(user);
    let userWishes = await getUserWishes(id);
    userWishes = userWishes.map((role: any) => ({
      ID: role.desires.id,
      name: role.desires.name,
    }))
    setWish(userWishes);
  };
  return (
    <div>
      <Select options={Users()} onChange={user => handleChange(user)} />
      {toTable(wish)}
    </div>
  );
};
