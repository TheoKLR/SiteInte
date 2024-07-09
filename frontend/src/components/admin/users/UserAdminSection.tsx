import React from 'react';
import AdminSection from '../AdminSection';
import { AddToTeam, ChangePermission, ManageUUIDs, TableUUIDs, TableUser } from './Actions';
import { AdminAction } from '../AdminSection';

const UserAdminSection: React.FC = () => {
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
      title: 'Gestion cléfs de connexions unique (Not used)',
      form: <ManageUUIDs/>,
    },
    {
      title: 'Affichage cléfs de connexions unique (Not used)',
      form: <TableUUIDs/>,
    },
  ];

  return (
    <AdminSection actions={actions} />
  );
};

export default UserAdminSection;
