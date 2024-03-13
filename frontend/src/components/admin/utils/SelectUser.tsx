import { useState, useEffect } from "react";
import Select from 'react-select';
import { User } from '../../../services/interfaces';
import { getAllUsers } from '../../../services/requests';

const SelectUser = ({ isMulti = false }) => {
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
        isMulti={isMulti}
        options={options}
      />
    </>
  );
};

export default SelectUser;
