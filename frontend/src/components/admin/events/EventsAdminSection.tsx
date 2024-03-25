import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { StartEvent, StopEvent } from './Actions';

const EventsAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Démarrer un Event',
      form: <StartEvent/>,
    },
    {
      title: 'Arrêter un Event',
      form: <StopEvent/>,
    },
    /*{
      title: 'Supprimer des Factions',
      form: Delete,
    },*/
];

  return (
    <AdminSection actions={actions} />
  );
};

export default EventsAdminSection;
