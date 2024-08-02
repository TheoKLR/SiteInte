import React, { useEffect, useState } from 'react';
import AdminSection from '../AdminSection';
import { AdminAction } from '../AdminSection';
import { SendEmailtoAPermission, SendEmailCustom, SendWelcomeEmail, SendNoteBookEmail } from './Actions';

const EmailAdminSection: React.FC = () => {
  
  const actions: AdminAction[] = [
    {
      title: 'Envoyer un email',
      form: <SendEmailCustom/>,
    },
    {
      title: 'Envoyer un email à un groupe Users',
      form: <SendEmailtoAPermission/>,
    },
    {
      title: 'Envoyer un email de bienvenu à tous les nouveaux',
      form: <SendWelcomeEmail/>,
    },
    {
      title: 'Envoyer un email de cahier de vacances à tous les nouveaux',
      form: <SendNoteBookEmail/>,
    },
  ];
   

  return (
    <AdminSection actions={actions} />
  );
};

export default EmailAdminSection;
