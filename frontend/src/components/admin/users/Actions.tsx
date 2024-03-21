import { Users, Teams } from '../utils/Select';
import "../utils/SubmitButton.css"
import Select from 'react-select';
import { useState } from 'react';


export const AddToTeam = () => {
  return (
    <div className={"select-container"}>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={Users()}
      />
      <Select
        options={Teams()}
      />
    </div>
  )
}

export const Delete = () => {
  const [users, setUsers] = useState([] as any);

  const handleSelectChange = (selectedOptions: any) => {
    setUsers(selectedOptions);
    console.log(selectedOptions); // Log the selectedOptions directly
  };

  const Submit = () => {
    
  }

  return (<div>
    <Select
      closeMenuOnSelect={false}
      isMulti
      options={Users()}
      onChange={handleSelectChange}
    />
  </div>)
}
