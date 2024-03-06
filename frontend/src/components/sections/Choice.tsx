import { useEffect, useState } from 'react';
import { getAllDesires, submitChoices } from '../../services/requests';

// Formulaire pour que les étudiants de l'utt puissent choisir les rôles qui les intérresseraient pour l'inté
export const Choice = () => {

    const [checkedValues, setCheckedValues] = useState<number[]>([]);
    const [desires, setDesires] = useState<any[]>([]);

    // Appelé à chaque cochage/décochage d'une checkbox
    // Récupère les id des choix cochés et les stocke dans un array d'entiers
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

    // Soumission du formulaire
    function handleSubmit(event: React.FormEvent){
        console.log(checkedValues);
        const token = localStorage.getItem("authToken");
        if (token !== null){
            console.log("Token :" + token);
            submitChoices(checkedValues);
        }
    }

    // récupération des choix de rôle existants dans la db
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

    // Frontend
    // Création des checkbox automatique en fonction des rôles existants dans la db
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
