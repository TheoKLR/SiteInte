import React, { useEffect, useState } from 'react';
import { Faction, Team } from '../../services/interfaces';
import "./Factions.css";
import {getAllTeams, getAllTeamsWithPoints} from '../../services/requests/teams';

interface FactionsAffichageProps {
    faction: Faction;
}

const FactionsAffichage: React.FC<FactionsAffichageProps> = ({ faction }) => {
    
    const [allTeams, setAllTeams] = useState<{team: Team, points: number}[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTeamsWithPoints();
                const filteredTeams = response.filter((team:{team: Team, points: number}) => team.team.faction === faction.id);
                setAllTeams(filteredTeams);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().then();
    }, []);

    return (
        <>
            <div className='containerFactions'>
                <div className='affichageTeams'>
                    <h3 id='msgTeams'>Equipes</h3>
                        {!allTeams ? <p>Chargement...</p> : allTeams.length > 0 ? (
                            allTeams.map((team: {team: Team, points: number}, index: number) => (
                               <p key={index}>{team.team.name} - {team.points}</p>
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
