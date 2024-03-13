import SelectTeam from '../../utils/SelectTeam';
import SelectUser from '../../utils/SelectUser';

const AddToTeam = () => {
    return <div className={"select-container"}>
      <SelectUser isMulti={true} />
      <SelectTeam />
    </div>
};

export default AddToTeam;
