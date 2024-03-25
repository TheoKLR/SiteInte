import React from 'react';
import { Faction } from '../../services/interfaces';

interface FactionsAffichageProps {
    faction: Faction;
}

const FactionsAffichage: React.FC<FactionsAffichageProps> = ({ faction }) => {
    return (
        <>
            <div className='containerChoix'>
                <p>{faction.points}</p>
            </div>
        </>
    );
};

export default FactionsAffichage;
