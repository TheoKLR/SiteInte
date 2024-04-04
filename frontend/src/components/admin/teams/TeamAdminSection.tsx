import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { CreateTeam, AddToFaction, DeleteTeam, TableTeams } from './Actions';

const TeamAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Créer une équipe',
      form: <CreateTeam/>,
    },
    {
      title: 'Ajouter à une faction',
      form: <AddToFaction/>,
    },
    {
      title: 'Supprimer une équipe',
      form: <DeleteTeam/>,
    },
    {
      title: 'Affichage équipes',
      form: <TableTeams/>,
    },
  ];

  return (
    <AdminSection actions={actions} />
  );
};

export default TeamAdminSection;
