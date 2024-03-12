import { RubriqueProps } from '../services/interfaces';
import './SectionStyle.css';

// La rubrique est le composant central du front end du site
// Elle isole une partie du site et se personnalise avec un titre et un contenu (qui est un composant également)
export const Rubrique: React.FC<RubriqueProps> = ({titre, contenu:Contenu}) => {
    return (
        <>
            <div className='container'>
                <div className='titre'>
                    <h2>{titre}</h2>
                    <hr />
                </div>
                <div className='contenu'>
                    <Contenu/>
                </div>
            </div>

        </>
    )
}