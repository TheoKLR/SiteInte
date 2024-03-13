import SelectTeam from '../utils/SelectTeam';
import SelectUser from '../utils/SelectUser';

export const AddToTeam = () => {
    return <div className={"select-container"}>
      <SelectUser isMulti={true} />
      <SelectTeam />
    </div>
};

export const Delete = () => {
    return <div>
      <SelectUser isMulti={true} />
    </div>
};
