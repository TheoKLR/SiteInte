import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllDesires, getDesiresUsersById } from '../../../../services/requests';
import { Desire, User } from '../../../../services/interfaces';

const Role = () => {

    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [optionsWithNames, setOptionsWithDesires] = useState<any[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllDesires();
          console.log(response.data)
          const desiresOptions = response.data.map((desire:Desire) => ({
            value: desire.id,
            label: `${desire.name}`,
          }));
          setOptions(desiresOptions);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    async function handleSelectChange (selectedOptions:any){
        setSelectedOptions(selectedOptions as any[]);
        const updatedOptionsWithNames = await Promise.all(selectedOptions.map(async (desire: any) => {
          const newDesire = { ...desire };
          newDesire['users'] = await getDesiresUsersById(newDesire.value.toString());
          return newDesire;
        }));
        setOptionsWithDesires(updatedOptionsWithNames);
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

            {optionsWithNames.map((desire, index) => (
                    <div key={index}>
                      <br />
                      {desire.label} : {desire.users.length > 0 ? desire.users.map((user: any) => user.users.first_name).join(', ') : 'Aucun utilisateur'}
                    </div>
                ))}
        </div>
    );
};

export default Role;