import { Teams, Factions } from '../utils/Select';
import { StringInput } from "../utils/Inputs";
import Select from 'react-select';

export const AddToFaction = () => {
    return <div className={"select-container"}>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={Teams()}
      />
      <Select
        options={Factions()}
      />
    </div>
}


export const CreateTeam = () => {
    return (
        <div className={"input-container"}>
            <StringInput label="Name" />
        </div>
    )
}


export const Delete = () => {
    return <div>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={Teams()}
      />
    </div>
}