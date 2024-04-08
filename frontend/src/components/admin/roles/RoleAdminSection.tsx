
import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { CreateRole, DeleteRole, TableRoleUsers, TableUserRoles } from './Actions';




const DesireAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Créer un rôle',
      form: <CreateRole/>,
    },
    {
      title: 'Supprimer un rôle',
      form: <DeleteRole/>,
    },
    {
      title: 'Rôles demandés par un utilisateur',
      form: <TableUserRoles/>,
    },
    {
      title: 'Utilisateurs ayant demandé un rôle',
      form: <TableRoleUsers/>,
    },
];

  return (
    <AdminSection actions={actions} />
  );
};

export default DesireAdminSection;
