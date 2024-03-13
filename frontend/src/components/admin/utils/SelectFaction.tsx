import { useState, useEffect } from "react";
import Select from 'react-select';
import { Faction } from '../../../services/interfaces';
import { getAllFactions } from '../../../services/requests';

const SelectFaction = ({ isMulti = false }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFactions();
        const usersOptions = response.data.map((faction: Faction) => ({
          value: faction.id,
          label: `${faction.name}`,
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

export default SelectFaction;
