import { useState, useEffect } from "react";
import Select from 'react-select';
import { Team } from '../../../services/interfaces';
import { getAllTeams } from '../../../services/requests';

const SelectTeam = ({ isMulti = false }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTeams();
        const usersOptions = response.data.map((team: Team) => ({
          value: team.id,
          label: `${team.name}`,
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

export default SelectTeam;
