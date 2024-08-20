import React, {useEffect, useState} from 'react';
import {getRole} from '../../../services/requests';
import BaseAnimSection from "../BaseAnimSection";
import {AdminAction} from "../../admin/AdminSection";
import {ChallType} from "../../../services/interfaces";
import {TableChallenge, UnvalidChallenge, ValidChallenge} from "../AnimAction";


const ChallStudentSection: React.FC = () => {

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
            form: <ValidChallenge type={ChallType.Student}/>,
        },
        {
            title: 'Unvalider challenge',
            form: <UnvalidChallenge type={ChallType.Student}/>,
        },
        {
            title: 'Affichage challenges',
            form: <TableChallenge type={ChallType.Student}/>,
        }
    ];

    return (
        <BaseAnimSection actions={actions} />
    );
};

export default ChallStudentSection;