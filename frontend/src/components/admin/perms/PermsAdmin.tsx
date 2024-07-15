import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { CreatePerm, DeletePerm, TablePerms } from './Actions';

const PermsAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Créer une perm',
      form: <CreatePerm/>,
    },
    {
      title: 'Supprimer une perm',
      form: <DeletePerm/>,
    },
    {
      title: 'Affichage perms',
      form: <TablePerms/>,
    },
];

  return (
    <AdminSection actions={actions} />
  );
};

export default PermsAdminSection;
