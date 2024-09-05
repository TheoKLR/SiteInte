import React, { useEffect, useState } from 'react';
import AdminSection from '../AdminSection';
import {
    AddToTeam, AddWEIData,
    ChangePermission,
    DeleteUser,
    GetDatas,
    ManageNewStudents,
    PasswordReset,
    TableNewStudents,
    TableUser, TestNewStudentInDb
} from './Actions';
import { AdminAction } from '../AdminSection';
import { getRole } from '../../../services/requests';

const UserAdminSection: React.FC = () => {
  
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
      title: 'Ajouter à une équipe',
      form: <AddToTeam/>,
    },
    {
      title: 'Changer les permissions',
      form: <ChangePermission/>,
    },
    {
      title: 'Affichage utilisateurs',
      form: <TableUser/>,
    },
    {
      title: 'Supprimer utilisateurs',
      form: <DeleteUser/>,
    },
    {
      title: 'Reset Password',
      form: <PasswordReset/>,
    },
    {
      title: 'Gestion des nouveaux',
      form: <ManageNewStudents/>,
    },
    {
      title: 'Affichage des nouveaux',
      form: <TableNewStudents/>,
    },
      {
          title: 'Récupération données WEI',
          form: <GetDatas/>,
      },
      {
          title: 'Ajouter données bus WEI',
          form: <AddWEIData/>,
      },
      {
          title: 'Tester présence des nouveaux',
          form: <TestNewStudentInDb/>,
      },

  ];

  const filteredActions = actions.filter(action => {
    if (role === 'RespoCE') {
      return !['Changer les permissions',
                'Supprimer utilisateurs' ,
                'Gestion cléfs de connexions unique (Not used)', 
                'Affichage cléfs de connexions unique Not used)'].includes(action.title);
    }
    return true;
  });

  return (
    <AdminSection actions={filteredActions} />
  );
};

export default UserAdminSection;
