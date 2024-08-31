import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { CreateFaction, DeleteFaction, TableFaction } from './Actions';

const DesireAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Créer une faction',
      form: <CreateFaction/>,
    },
    {
      title: 'Supprimer une faction',
      form: <DeleteFaction/>,
    },
    {
      title: 'Affichage Faction',
      form: <TableFaction/>,
    },
];

  return (
    <AdminSection actions={actions} />
  );
};

export default DesireAdminSection;
