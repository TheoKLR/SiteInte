import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { ExportDb } from './Actions';

const EventsAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Exporter Database',
      form: <ExportDb/>,
    },
];

  return (
    <AdminSection actions={actions} />
  );
};

export default EventsAdminSection;
