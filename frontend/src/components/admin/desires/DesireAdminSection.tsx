import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { Create, Delete}  from './Actions';




const DesireAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Créer un souhait',
      form: Create,
    },
    {
      title: 'Supprimer des souhaits',
      form: Delete,
    },
];

  return (
    <AdminSection actions={actions} />
  );
};

export default DesireAdminSection;
