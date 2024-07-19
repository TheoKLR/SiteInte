import { useEffect, useState } from 'react';
import { NewStudents, Users } from '../../utils/Select';
import Select from 'react-select/creatable';
import {handleError } from '../../utils/Submit'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {sendEmail  } from '../../../services/requests/email';
import { EmailOptions, User } from '../../../services/interfaces';
import { getAllNewSudents } from '../../../services/requests/users';


export const SendEmailCustom = () => {
    const [from, setFrom] = useState('');
  const [to, setTo] = useState([] as any);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');
  const [cc, setCc] = useState([] as any);
  const [bcc, setBcc] = useState([] as any);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const emailOptions : EmailOptions = 
          {from, 
            to : to.map((option: { value: any; }) => option.value), 
            cc : cc.map((option: { value: any; }) => option.value), 
            bcc: bcc.map((option: { value: any; }) => option.value), 
            subject, 
            text, 
            html};
        const response = await handleError('Mail envoyé !','Un problème est survenu', sendEmail,emailOptions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Envoyer un Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>De:</label>
          <input
            type="email"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>À:</label>
          <Select
            isMulti
            value={to}
            onChange={to => setTo(to)}
            options={Users()} // Vous pouvez préremplir les options ici
            placeholder="Sélectionnez les destinataires ou ajoutez-en"
            isValidNewOption={(inputValue, selectValue, selectOptions) =>
              inputValue.trim().length > 0 && !selectOptions.some(option => option.value === inputValue)
            }
          />
        </div>
        <div>
          <label>CC:</label>
          <Select
            isMulti
            value={cc}
            onChange={cc => setCc(cc)}
            options={Users()} // Vous pouvez préremplir les options ici
            placeholder="Sélectionnez les destinataires ou ajoutez-en"
            isValidNewOption={(inputValue, selectValue, selectOptions) =>
              inputValue.trim().length > 0 && !selectOptions.some(option => option.value === inputValue)
            }
          />
        </div>
        <div>
          <label>CCI:</label>
          <Select
            isMulti
            value={bcc}
            onChange={bcc => setBcc(bcc)}
            options={Users()} // Vous pouvez préremplir les options ici
            placeholder="Sélectionnez les destinataires ou ajoutez-en"
            isValidNewOption={(inputValue, selectValue, selectOptions) =>
              inputValue.trim().length > 0 && !selectOptions.some(option => option.value === inputValue)
            }
          />
        </div>
        <div>
          <label>Sujet:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label>Message HTML:</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
          />
        </div>
        <button className="submit-button">Envoyer</button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};


export const SendEmailtoNewStudent = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState([] as any);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');
  const [cc, setCc] = useState([] as any);
  const [bcc, setBcc] = useState([] as any);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
      const newStudents = await getAllNewSudents();
      setBcc(newStudents.map((user: User) => user.email));
      const emailOptions : EmailOptions = 
        {from, 
          to, 
          cc, 
          bcc: bcc, 
          subject, 
          text, 
          html};

      await handleError('Mail envoyé !','Un problème est survenu', sendEmail,emailOptions);
  } catch (error) {
    console.log(error);
  }
};

return (
  <div className="App">
    <h1>Envoyer un Email à tous les nouveaux</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>De:</label>
        <input
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Sujet:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label>Message HTML:</label>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
      </div>
      <button className="submit-button">Envoyer</button>
    </form>
    <ToastContainer position="bottom-right" />
  </div>
);
};