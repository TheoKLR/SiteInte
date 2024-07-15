import React from 'react';
import { Perm } from '../../services/interfaces';
import "./PermAffichage.css";

interface PermAffichageProps {
    perm: Perm;
}

const PermAffichage: React.FC<PermAffichageProps> = ({ perm }) => {

    const handleSubmit = () => {
        
    }

    return (
        <>
            <div className='containerPerm'>
                <div className='affichageInfos'>
                    <h4>Description :</h4>
                    <p>{perm.desc}</p>
                    <h4>Date de début :</h4>
                    <p>{perm.startingTime}</p>
                    <h4>Durée :</h4>
                    <p>{perm.duration}h</p>
                    <h4>Nombre de places restantes :</h4>
                    <p>? / {perm.studentNumber}</p>
                </div>
                <div className='affichageBoutons'>
                    <button className="submit-button" onClick={handleSubmit}>Rejoindre</button>
                </div>
            </div>
        </>
    );
}

export default PermAffichage;
