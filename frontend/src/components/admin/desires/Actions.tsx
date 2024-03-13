import { StringInput } from "../utils/Inputs";
import SelectDesire from '../utils/SelectDesire';
import SelectUser from '../utils/SelectUser';

export const Create = () => {
    return (
        <div className={"input-container"}>
            <StringInput label="Name" />
            <StringInput label="Description" />
        </div>
    );
};

export const Delete = () => {
    return <div>
      <SelectDesire isMulti={true} />
    </div>
};

export const SearchByDesire = () => {
    return <div className={"select-container"}>
      <SelectDesire />
    </div>
};

export const SearchByUser = () => {
    return <div className={"select-container"}>
      <SelectUser />
    </div>
};
