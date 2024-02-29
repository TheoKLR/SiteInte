import { useEffect, useState } from 'react';
import './ChoiceStyle.css';
import { createDesire, getAllDesires, getAllUsers, submitChoices } from '../../services/requests';


export const Choice = () => {

    const [checkedValues, setCheckedValues] = useState<number[]>([])

    function handleChange(event: React.FormEvent){
        const {value, checked} = event.target as HTMLInputElement;
        setCheckedValues( pre => {
            if (checked){
                return [...pre,parseInt(value)];
            } else {
                return pre.filter(skill => skill!==parseInt(value));
            }
        })        
    }

    function handleSubmit(event: React.FormEvent){
        console.log(checkedValues);
        const token = localStorage.getItem("authToken");
        if (token !== null){
            console.log("Token :" + token);
            submitChoices(checkedValues);
        }
    }

    // const getrole = async() => {
    //     let response = await api.get('/auth/role')
    //     return response.data
    // }

    // const role = getrole();
    // console.log(role);
    // const response = createDesire('Dev', 'Comme Théo et Lou');
    // console.log(response)

    const [desires, setDesires] = useState<any[]>([]);

    useEffect(() => {
        getAllDesires()
        .then(res => {
            const data = res.data;
            setDesires(data);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des désirs :', error);
        });
    }, [])    

    return (
        <>
            <div className='containerChoix'>
                <p>L'inté a besoin de beaucoup de gens dans de nombreux domaines. Choisis ton rôle afin d'aider au mieux!</p><br />
                <div className='inputs'>
                {desires.map((desire, index) => (
                    <div key={index}>
                        <input type="checkbox" value={desire.id} onChange={handleChange}/> {desire.name} : {desire.description}
                    </div>
                ))}
                <br />
                    <button onClick={handleSubmit}>Valider</button>
                </div>
            </div>
        </>
    )
}
