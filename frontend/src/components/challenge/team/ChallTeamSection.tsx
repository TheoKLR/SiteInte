import React, {useEffect, useState} from 'react';
import {getRole} from '../../../services/requests';
import BaseAnimSection from "../BaseAnimSection";
import {AdminAction} from "../../admin/AdminSection";
import {ChallType} from "../../../services/interfaces";
import {TableChallenge, UnvalidChallenge, ValidChallenge} from "../AnimAction";

const ChallTeamSection: React.FC = () => {

    const [clicked, setClicked] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    const handleClick = () => {
        setClicked(!clicked);
    }

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
                setRole(role);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, []);

    const actions: AdminAction[] = [
        {
            title: 'Valider challenge',
            form: <ValidChallenge type={ChallType.Team}/>,
        },
        {
            title: 'Unvalider challenge',
            form: <UnvalidChallenge type={ChallType.Team}/>,
        },
        {
            title: 'Affichage challenges',
            form: <TableChallenge type={ChallType.Team}/>,
        }
    ];

    return (
        <BaseAnimSection actions={actions} />
    );
};

export default ChallTeamSection;
