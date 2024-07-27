import React, { useEffect, useState } from 'react';
import { Faction, Team } from '../../services/interfaces';
import "./Factions.css";
import { getAllTeams } from '../../services/requests/teams';

interface FactionsAffichageProps {
    faction: Faction;
}

const FactionsAffichage: React.FC<FactionsAffichageProps> = ({ faction }) => {
    
    const [allTeams, setAllTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTeams();
                const filteredTeams = response.filter((team:Team) => team.faction === faction.id);
                setAllTeams(filteredTeams);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className='containerFactions'>
                <div className='affichageTeams'>
                    <h3 id='msgTeams'>Equipes</h3>
                        {allTeams.length > 0 ? (
                            allTeams.map((team: Team, index: number) => (
                               <p key={index}>{team.name}</p>
                            ))
                        ) : (
                            <p>La faction ne comprend pas d'équipe</p>
                        )}
                </div>
                <div className='affichagePoints'>
                    <h3 id='msgPoints'>Points</h3>
                    <p id='nbPoints'>{faction.points}</p>
                </div>
            </div>
        </>
    );
}

export default FactionsAffichage;
