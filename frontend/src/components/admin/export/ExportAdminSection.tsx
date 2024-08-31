import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { ExportDb } from './Actions';
import { SyncDb } from './Actions';

const EventsAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Exporter Database',
      form: <ExportDb/>,
    },
    {
      title: 'Sync Database',
      form: <SyncDb/>,
    }
];

  return (
    <AdminSection actions={actions} />
  );
};

export default EventsAdminSection;
