import { useEffect, useState } from 'react';
import Select from 'react-select'
import { createRole, deleteRole, getAllRoles } from '../../../services/requests/roles';
import { toId, handleError } from '../../utils/Submit'
import { Roles } from '../../utils/Select'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers, getDesiresUsersById, getUserDesiresById } from '../../../services/requests';
import { Role, User } from '../../../services/interfaces';

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

export const TableRoleUsers = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [optionsWithUsers, setOptionsWithUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRoles();
        const rolesOptions = response.data.map((role: Role) => ({
          value: role.id,
          label: role.name,
        }));
        setOptions(rolesOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  async function handleSelectChange (selectedOptions:any){
    setSelectedOptions(selectedOptions as any[]);
    const updatedOptionsWithUsers = await Promise.all(selectedOptions.map(async (role: any) => {
      const newRole = { ...role };
      newRole['users'] = await getDesiresUsersById(newRole.value.toString());
      return newRole;
    }));
    setOptionsWithUsers(updatedOptionsWithUsers);
  }


  return (
      <div>
          <Select
              closeMenuOnSelect={false}
              isMulti
              options={options}
              onChange={handleSelectChange}
              value={selectedOptions}
          />

          {optionsWithUsers.map((role, index) => (
              <div key={index}>
                  <br />
                  <p>{role.label} : {role.users ? role.users.map((user: any) => user.users.first_name + ' ' + user.users.last_name ).join(', ') : 'Aucun utilisateur'}</p> 
              </div>
          ))}

      </div>
  )
}

export const TableUserRoles = () => {

    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [optionsWithDesires, setOptionsWithDesires] = useState<any[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllUsers();
          const usersOptions = response.data.map((user: User) => ({
            value: user.id,
            label: `${user.first_name} ${user.last_name}`,
          }));
          setOptions(usersOptions);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);


    async function handleSelectChange (selectedOptions:any){
      setSelectedOptions(selectedOptions as any[]);
      const updatedOptionsWithDesires = await Promise.all(selectedOptions.map(async (user: any) => {
        const newUser = { ...user };
        newUser['desires'] = await getUserDesiresById(newUser.value.toString());
        return newUser;
      }));
      setOptionsWithDesires(updatedOptionsWithDesires);
    }


    return (
        <div>
            <Select
                closeMenuOnSelect={false}
                isMulti
                options={options}
                onChange={handleSelectChange}
                value={selectedOptions}
            />

            {optionsWithDesires.map((user, index) => (
                <div key={index}>
                    <br />
                    <p>{user.label} : {user.desires ? user.desires.map((desire: any) => desire.desires.name).join(', ') : 'Aucun désir'}</p> 
                </div>
            ))}

        </div>
    );
}