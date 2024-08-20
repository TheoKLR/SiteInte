import { Users, Teams, UUIDs } from '../../utils/Select'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { toArray, toId, tochainString } from '../../utils/Submit'
import { addToTeam, changePermission, deleteUser } from '../../../services/requests/users';
import { handleError } from '../../utils/Submit'
import { ToastContainer } from 'react-toastify'
import { User, newStudent } from '../../../services/interfaces'
import { getAllUsers } from '../../../services/requests'
import { toTable } from '../../utils/Tables'
import { deleteNewStudent, getAllNewStudent, syncNewStudent } from '../../../services/requests/newstudent';
import { resetPasswordAdmin } from '../../../services/requests/auth';
import { deleteUUID, getAllUUID, syncUUID } from '../../../services/requests/newstudent';
import {api} from "../../../services/api";

export const AddToTeam = () => {
  const [users, setUsers] = useState([] as any)
  const [team, setTeam] = useState({} as any)

  const Submit = async () => {
    const u = toArray(users)
    const id = toId(team)
    await handleError("Utilisateur ajouté !", "Une erreur est survenue", addToTeam, u, id)
    setUsers([])
    setTeam({})
  }

  return (
    <div>
      <div className="select-container">
        <Select
          value={users}
          closeMenuOnSelect={false}
          isMulti
          options={Users()}
          onChange={users => setUsers(users)}
        />
        <Select
          value={team}
          options={Teams()}
          onChange={team => setTeam(team)}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

//to get data for wei bus distribution
export const GetDatas = () => {
  const [users, setUsers] = useState([] as any[]);
  const [team, setTeam] = useState({} as any);

  // Fonction pour gérer le chargement du fichier
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      console.log(content)
      const lines = content.split('\n').map(line => line.trim()).filter(line => line);
      setUsers(lines);
    };
    reader.readAsText(file);
  };

  const Submit = async () => {
    const t = await api.post("user/getInfo", {email: users})
    const data = t.data.data
    let stringContent = ""
    for (const line of data) {
      stringContent += (line.toString() + "\n")
    }
    const blob = new Blob([stringContent], { type: 'text/plain' }); // Utilisation de 'text/plain' pour du texte brut
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'user_info.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Réinitialisation des états après soumission
    setUsers([]);
    setTeam({});
  };

  return (
      <div>
        <div className="file-upload-container">
          <input type="file" accept=".txt" onChange={handleFileUpload} />
        </div>
        <button className="submit-button" onClick={Submit}>Soumettre</button>
        <ToastContainer position="bottom-right" />
      </div>
  );
};

export const ChangePermission = () => {
  const [user, setUser] = useState({} as any)
  const [perm, setPerm] = useState({} as any)

  const permTypeOptions = [
    { value: 'Student', label: 'Etudiant' },
    { value: 'Admin', label: 'Admin' },
    { value: 'RespoCE', label: 'RespoCE' },
    { value: 'Respo', label: 'Respo' },
    { value: 'Anim', label: 'Anim' }
  ];


  const Submit = async () => {
    const id = toId(user)
    await handleError("permission modifiée !", "Une erreur est survenue", changePermission, id, perm.value)
    setUser({})
    setPerm({})
  }

  return (
    <div>
      <div className="select-container">
        <Select
          options={Users()}
          onChange={user => setUser(user)}
          value={user}
        />
        <Select
          options={permTypeOptions}
          onChange={perm => setPerm(perm)}
          value={perm}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  )
}



export const TableUser = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response)
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
    fetchRole();
  }, []);

  return users.length > 0 ? toTable(users) : null;
}

export const ManageNewStudents = () => {

  const [uuids, setUUIDs] = useState([] as any )
  const UUIDsoptions = UUIDs();

  const handleSync = async () => {
      await handleError("NewStudents synchronisé !", "Une erreur est survenue", syncNewStudent);
    }

  const handleDeletion = async () => {
    const strUUIds = tochainString(uuids);
    await handleError("NewStudents supprimés", "Une erreur est survenue", deleteNewStudent, strUUIds);
    setUUIDs([]);
  };

  return (
    <div>
      <div className="input">
        <h3>Creéation UUIDs</h3>
        <p>Voulez vous synchronisez l'API UTT et la table des nouveaux ??</p>
        <button className="submit-button" onClick={handleSync}>Synchroniser</button>
      </div>
      <div className="input">
        <h3>Suppression UUIDs</h3>
        <p>Sélectionner les clées unique à supprimer ?</p>
        <div className="select-container">
          <Select
            value={uuids}
            closeMenuOnSelect={false}
            isMulti
            options={UUIDsoptions}
            onChange={uuids => setUUIDs(uuids)}
          />
          <button className="submit-button" onClick={handleDeletion}>Suppression</button>
        </div>
      </div>

      <ToastContainer position="bottom-right"/>
    </div>
  );
};

export const TableNewStudents = () => {
  const [UUIDs, setUUIDs] = useState<newStudent[]>([]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await getAllNewStudent();
        setUUIDs(response)
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
    fetchRole();
  }, []);

  return UUIDs.length > 0 ? toTable(UUIDs) : null;
}

export const DeleteUser = () => {
  const [user, setUser] = useState({} as any)


  const Submit = async () => {
    const id = toId(user)
    await handleError("Utilisateur supprimer !", "Une erreur est survenue", deleteUser, id)
    setUser({})
  }

  return (
    <div>
      <div className="select-container">
        <Select
          options={Users()}
          onChange={user => setUser(user)}
          value={user}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export const PasswordReset = () => {
  const [user, setUser] = useState({} as any)



  const Submit = async () => {
    const id = toId(user)
    await handleError("Mail de reset envoyé !", "Une erreur est survenue", resetPasswordAdmin, id)
    setUser({})
  }

  return (
    <div>
      <div className="select-container">
        <Select
          options={Users()}
          onChange={user => setUser(user)}
          value={user}
        />
      </div>
      <button className="submit-button" onClick={Submit}>Soumettre</button>
      <ToastContainer position="bottom-right" />
    </div>
  )
}