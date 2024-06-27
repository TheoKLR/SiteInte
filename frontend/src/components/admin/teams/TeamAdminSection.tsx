import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { CreateTeam, AddToFaction, DeleteTeam, TableTeams, RenameTeam, ModifyTeam } from './Actions';

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
    {
      title: 'Renommer une équipe',
      form: <RenameTeam/>,
    },
    {
      title: 'Modifier une équipe',
      form: <ModifyTeam/>,
    },
    
  ];

  return (
    <AdminSection actions={actions} />
  );
};

export default TeamAdminSection;
