import React from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { PermanenceList, PermanenceForm, OpenPermsAtJ7 } from './Actions';

const PermsAdminSection: React.FC = () => {
  const actions: AdminAction[] = [
    {
      title: 'Créer une perm',
      form: <PermanenceForm/>,
    },
    {
      title: 'Affichage perms',
      form: <PermanenceList/>,
    },
    {
      title: 'Ouvrir ou fermer les perms à J+7',
      form: <OpenPermsAtJ7/>,
    },
];

  return (
    <AdminSection actions={actions} />
  );
};

export default PermsAdminSection;
