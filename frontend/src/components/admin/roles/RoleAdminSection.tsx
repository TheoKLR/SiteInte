import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { CreateRole, DeleteRole } from './Actions';




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
];

  return (
    <AdminSection actions={actions} />
  );
};

export default DesireAdminSection;
