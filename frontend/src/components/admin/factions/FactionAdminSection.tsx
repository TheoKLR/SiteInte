import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import {Create, Delete} from './Actions';


const DesireAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Créer une faction',
      form: Create,
    },
    {
      title: 'Supprimer des Factions',
      form: Delete,
    },
];

  return (
    <AdminSection actions={actions} />
  );
};

export default DesireAdminSection;
