import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllDesires } from '../../../../services/requests';
import { Desire } from '../../../../services/interfaces';

const Role = () => {

    const [options, setOptions] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllDesires();
          console.log(response.data)
          const usersOptions = response.data.map((desire:Desire) => ({
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

    function handleSubmit(event: React.FormEvent){
    
    }


    return (
        <div>
            <Select
                closeMenuOnSelect={false}
                isMulti
                options={options}
            />

            <div id={"button_container"}>
                <button onClick={handleSubmit}>Soumettre</button>
            </div>
        </div>
    );
};

export default Role;