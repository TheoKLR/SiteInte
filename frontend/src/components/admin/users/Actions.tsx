import SelectTeam from '../utils/SelectTeam';
import SelectUser from '../utils/SelectUser';
import "../utils/SubmitButton.css";


export const AddToTeam = () => {
    return <div className={"select-container"}>
      <SelectUser isMulti={true} />
      <SelectTeam />
      <button className="button-9" role="button">Soumettre</button>

    </div>
};

export const Delete = () => {
    return <div>
      <SelectUser isMulti={true} />
    </div>
};
