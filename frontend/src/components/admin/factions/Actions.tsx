import { StringInput } from "../utils/Inputs";
import { Factions } from '../utils/Select';
import Select from 'react-select';

export const Create = () => {
    return (
        <div className={"input-container"}>
            <StringInput label="Name" />
        </div>
    );
};

export const Delete = () => {
    return <div>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={Factions()}
      />
    </div>
};