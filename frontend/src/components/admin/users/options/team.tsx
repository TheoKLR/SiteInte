import { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllTeams } from '../../../../services/requests';
import { Team } from '../../../../services/interfaces';

const AddToTeam = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTeams();
                const usersOptions = response.data.map((team: Team) => ({
                    value: team.id,
                    label: team.name,
                }));
                setOptions(usersOptions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Select
                closeMenuOnSelect={false}
                options={options}
            />
            <div id={"button_container"}>
                <button>Soumettre</button>
            </div>
        </>
    );
};

export default AddToTeam;