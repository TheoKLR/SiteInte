import { useState, useEffect } from "react";
import Select from 'react-select';
import { Desire } from '../../../services/interfaces';
import { getAllDesires } from '../../../services/requests';

const SelectDesire = ({ isMulti = false }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDesires();
        const usersOptions = response.data.map((desire: Desire) => ({
          value: desire.id,
          label: `${desire.name}`,
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

export default SelectDesire;
