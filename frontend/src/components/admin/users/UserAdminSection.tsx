import React from 'react';
import AdminSection from '../AdminSection';
import {AddToTeam, Delete}from './Actions';
import { AdminAction } from '../AdminSection';

const UserAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Ajouter à une équipe',
      form: AddToTeam,
    },
    {
      title: 'Supprimer des utilisateurs',
      form: Delete,
    },
  ];

  return (
    <AdminSection actions={actions} />
  );
};

export default UserAdminSection;
