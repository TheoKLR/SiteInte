import {useState } from 'react';
import { Users } from '../../utils/Select';
import Select from 'react-select/creatable';
import {handleError } from '../../utils/Submit'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {sendEmail  } from '../../../services/requests/email';
import { EmailOptions, User } from '../../../services/interfaces';
import {getAllBusAttributionByBus, getAllByPermission} from '../../../services/requests/users';
import { getAllNewStudent } from '../../../services/requests/newstudent';
import {compileTemplateBus, compileTemplateNotebook, compileTemplateWelcome} from './templates';


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
            to : to.map((option: any ) => option.email ? option.email : option.value), //Email = Existing user, value = option created
            cc : cc.map((option : any) => option.email ? option.email : option.value), 
            bcc: bcc.map((option: any) => option.email ? option.email : option.value), 
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


export const SendEmailtoAPermission = () => {

  const [from, setFrom] = useState('');
  const [to, setTo] = useState([] as any);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');
  const [cc, setCc] = useState([] as any);
  const [bcc, setBcc] = useState([] as any);
  const [permission, setPermission] = useState(null);

  const options = [
    { value: 'newStudent', label: 'New Student' },
    { value: 'RespoCE', label: 'RespoCE' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Student', label: 'Student' },
  ];

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
      if(permission){
      const receivers = await getAllByPermission(permission);
      setBcc(receivers.map((user: User) => user.email));
      const emailOptions : EmailOptions = 
        {from, 
          to, 
          cc, 
          bcc: bcc, 
          subject, 
          text, 
          html};

      await handleError('Mail envoyé !','Un problème est survenu', sendEmail,emailOptions);
      }
      else{
        toast.error("Aucun role selectionné !")
      }
  } catch (error) {
    console.log(error);
  }
};

const handlePermissionSelected = async (selectedOption : any) => {
  setPermission(selectedOption.value);
}

return (
  <div className="App">
    <h1>Envoyer un Email à une catégorie de user</h1>
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
        <label>A:</label>
        <Select
            isMulti ={false}
            value={permission}
            onChange={handlePermissionSelected}
            options={options}
            placeholder={permission}
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

export const SendWelcomeEmail = () => {
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [cc, setCc] = useState([] as any);
  const [bcc, setBcc] = useState([] as any);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newStudents = await getAllNewStudent();
      const recipients = newStudents.map((option: any) => ({ email: option.email, uuid: option.uuid, isused: option.isUsed }));
      recipients.forEach(async (recipient: any) => {
        const emailOptions = {
          from,
          to: [recipient.email],
          cc: cc.map((option: any) => option.email ? option.email : option.value),
          bcc: bcc.map((option: any) => option.email ? option.email : option.value),
          subject : subject,
          text,
          html: compileTemplateWelcome({ email: recipient.email, uuid : recipient.uuid}), // Utiliser le template
        };
        if(!recipient.isused){
          await handleError('Mail envoyé !', 'Un problème est survenu', sendEmail, emailOptions);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Envoyer un Email de Bienvenue</h1>
      <h3 style={{color:"red"}}>Attention cette action va envoyer à tout les nouveaux qui ne sont pas sur le site (synchronisez avec l'API UTT) les messages de bienvenu ainsi que leur clefs de connexion</h3>
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
        <button className="submit-button">Envoyer</button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export const SendNoteBookEmail = () => {
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [link, setLink] = useState('');
  const [cc, setCc] = useState([] as any);
  const [bcc, setBcc] = useState([] as any);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    
    try {

      const newStudents = await getAllByPermission("newStudent");
      setBcc(newStudents.map((option: any) => option.email));


      const emailOptions = {
        from,
        cc: cc.map((option: any) => option.email ? option.email : option.value),
        bcc: bcc,
        subject,
        html: compileTemplateNotebook({ notebook: link}), // Utiliser le template
      };

      await handleError('Mail envoyé !', 'Un problème est survenu', sendEmail, emailOptions);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Envoyer un Email de cahier de vacances</h1>
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
          <label>Sujet:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lien vers le cahier de vacances:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button className="submit-button">Envoyer</button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export const SendBusAttribution = () => {
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [link, setLink] = useState('');
  const [cc, setCc] = useState([] as any);
  const [bcc, setBcc] = useState([] as any);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      const map: {bus: number, users: string[]}[] = await getAllBusAttributionByBus();
      for (const value of map) {
        const bus = value.bus
        const users = value.users
        const time = "11H"
        const emailOptions = {
          from,
          cc: cc.map((option: any) => option.email ? option.email : option.value),
          bcc: users,
          subject,
          html: compileTemplateBus({ bus: bus, time : time}), // Utiliser le template
        };

        await handleError('Mail envoyé !', 'Un problème est survenu', sendEmail, emailOptions);
      }

      return;



    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="App">
        <h1>Attention ce bouton envoie un mail à toutes les personnes qui ont eu une place attribué dans un bus pour le WEI</h1>
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
            <label>Sujet:</label>
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
            />
          </div>
          <button className="submit-button">Envoyer</button>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
  );
};