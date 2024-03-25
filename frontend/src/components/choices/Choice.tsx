export {}
/*import { useEffect, useRef, useState } from 'react';
import { getAllDesires, submitChoices } from '../../services/requests';
import './Choice.css';

// Formulaire pour que les étudiants de l'utt puissent choisir les rôles qui les intérresseraient pour l'inté
export const Choice = () => {

    const errRef = useRef<HTMLInputElement>(null);

    const [checkedValues, setCheckedValues] = useState<number[]>([]);
    const [desires, setDesires] = useState<any[]>([]);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

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
        try {
            console.log(checkedValues);
            const token = localStorage.getItem("authToken");
            if (token !== null){
                console.log("Token :" + token);
                submitChoices(checkedValues);
                setSuccess(true);
                setSuccessMsg("Choix envoyés avec succès")
            }
        } catch (error) {
            console.error(error)
            setErrMsg("Problème rencontré lors de l'envoi des choix");
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
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <p className={success ? "success" : "offscreen"} aria-live="assertive">{successMsg}</p>
                </div>
            </div>
        </>
    )
}
*/