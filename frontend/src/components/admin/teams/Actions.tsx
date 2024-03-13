import SelectTeam from '../utils/SelectTeam';
import SelectFaction from '../utils/SelectFaction';
import { StringInput } from "../utils/Inputs";

export const AddToFaction = () => {
    return <div className={"select-container"}>
      <SelectTeam isMulti={true} />
      <SelectFaction />
    </div>
};


export const CreateTeam = () => {
    return (
        <div className={"input-container"}>
            <StringInput label="Name" />
        </div>
    );
};


export const Delete = () => {
    return <div>
      <SelectTeam isMulti={true} />
    </div>
};