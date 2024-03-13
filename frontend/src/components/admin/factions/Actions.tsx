import { StringInput } from "../utils/Inputs";
import SelectFaction from '../utils/SelectFaction';

export const Create = () => {
    return (
        <div className={"input-container"}>
            <StringInput label="Name" />
        </div>
    );
};

export const Delete = () => {
    return <div>
      <SelectFaction isMulti={true} />
    </div>
};