import { useState } from 'react';
import './ChoiceStyle.css';

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
    }

    return (
        <>
            <div className='containerChoix'>
                <p>L'inté a besoin de beaucoup de gens dans de nombreux domaines. Choisis ton rôle afin d'aider au mieux!</p><br />
                <div className='inputs'>
                    <input type="checkbox" value="1" onChange={handleChange}/> 1
                    <br />
                    <input type="checkbox" value="2" onChange={handleChange}/> 2
                    <br />
                    <input type="checkbox" value="3" onChange={handleChange}/> 3 
                    <br />
                    <button onClick={handleSubmit}>Valider</button>
                </div>
            </div>

        </>
    )
}
