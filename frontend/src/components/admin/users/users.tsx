import { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllUsers } from '../../../services/requests';
import { User } from '../../../services/interfaces';
import './users.css';
import Delete from './options/delete';
import AddToTeam from './options/team';
import Perm from './options/perm';

const Users = () => {
  const [activeComponent, setActiveComponent] = useState<'perm' | 'team' | 'delete' | null>(null);

  const handleButtonClick = (component: 'perm' | 'team' | 'delete') => {
    setActiveComponent(component);
  };

  const [options, setOptions] = useState([]);

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

  return (
    <>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={options}
      />
      <div id={"button_container"}>
        <button id="left" onClick={() => handleButtonClick('perm')}>Modifier les permissions</button>
        <button onClick={() => handleButtonClick('team')}>Ajouter à une équipe</button>
        <button id="right" onClick={() => handleButtonClick('delete')}>Supprimer</button>
      </div>
      <div>
        {activeComponent === 'perm' && <Perm />}
        {activeComponent === 'team' && <AddToTeam />}
        {activeComponent === 'delete' && <Delete />}
      </div>
    </>
  );
};

export default Users;