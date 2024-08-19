import React, {useEffect, useState} from 'react';
import {TableChallenge, ValidChallenge} from './Actions';
import {getRole} from '../../../services/requests';
import AnimSection from "../AnimSection";
import {AdminAction} from "../../admin/AdminSection";
import {ChallType} from "../../../services/interfaces";
import {UnvalidChallenge} from "../student/Actions";


const ChallStudentCeSection: React.FC = () => {

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
            form: <ValidChallenge type={ChallType.StudentOrCe}/>,
        },
        {
            title: 'Unvalider challenge',
            form: <UnvalidChallenge type={ChallType.StudentOrCe}/>,
        },
        {
            title: 'Affichage challenges',
            form: <TableChallenge type={ChallType.StudentOrCe}/>,
        }
    ];

    return (
        <AnimSection actions={actions} />
    );
};

export default ChallStudentCeSection;
