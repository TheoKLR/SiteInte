import React, { useEffect, useState } from 'react';
import AdminSection from '../AdminSection';
import { AddToTeam, ChangePermission, DeleteUser, ManageUUIDs, TableUUIDs, TableUser } from './Actions';
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
      title: 'Gestion cléfs de connexions unique (Not used)',
      form: <ManageUUIDs/>,
    },
    {
      title: 'Affichage cléfs de connexions unique (Not used)',
      form: <TableUUIDs/>,
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
