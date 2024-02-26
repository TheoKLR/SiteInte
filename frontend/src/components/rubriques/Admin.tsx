import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAllUsers } from '../../services/requests';
import { User } from '../../services/interfaces';

const animatedComponents = makeAnimated();

const AnimatedMulti = () => {
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
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
    />
  );
};

export default AnimatedMulti;
