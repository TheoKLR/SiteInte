import React, { useEffect, useState } from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { SendEmailtoNewStudent, SendEmailCustom } from './Actions';

const EmailAdminSection: React.FC = () => {
  
  const actions: AdminAction[] = [
    {
      title: 'Envoyer un email',
      form: <SendEmailCustom/>,
    },
    {
      title: 'Envoyer un email à tous les nouveaux',
      form: <SendEmailtoNewStudent/>,
    },
  ];
   

  return (
    <AdminSection actions={actions} />
  );
};

export default EmailAdminSection;
