import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { CreateTeam, AddToFaction, DeleteTeam, TableTeams, ModifyTeamMembers, ModifyTeam, ValidateTeam, DistributeTeam } from './Actions';

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
      title: 'Modifier une équipe',
      form: <ModifyTeam/>,
    },
    {
      title: 'Modifier les membres une équipe',
      form: <ModifyTeamMembers/>,
    },
    {
      title: 'Valider une équipe',
      form: <ValidateTeam/>,
    },
    {
      title: 'Distribuer les nouveaux',
      form: <DistributeTeam/>,
    },
    
  ];

  return (
    <AdminSection actions={actions} />
  );
};

export default TeamAdminSection;
