export {}

/*import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllUsers, getUserDesiresById } from '../../../services/requests';
import { User } from '../../../services/interfaces';

const UserInfo = () => {

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
                        <p>{user.label} : {user.desires.length > 0 ? user.desires.map((desire: any) => desire.desires.name).join(', ') : 'Aucun désir'}</p> 
                    </div>
                ))}

        </div>
    );
};

export default UserInfo;*/