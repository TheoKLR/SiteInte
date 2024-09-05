import { Users, Teams, UUIDs } from '../../utils/Select'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { toArray, toId, tochainString } from '../../utils/Submit'
import {addToTeam, changePermission, deleteUser, setBusData} from '../../../services/requests/users';
import { handleError } from '../../utils/Submit'
import { ToastContainer } from 'react-toastify'
import { User, newStudent } from '../../../services/interfaces'
import { getAllUsers } from '../../../services/requests'
import { toTable } from '../../utils/Tables'
import { deleteNewStudent, getAllNewStudent, syncNewStudent } from '../../../services/requests/newstudent';
import { resetPasswordAdmin } from '../../../services/requests/auth';
import {api} from "../../../services/api";
import Papa from "papaparse";

interface CsvRow {
  Billet: string;
  'Codes-barre': string;
  Tarif: string;
  Prénom: string;
  Nom: string;
  'E-mail': string;
  Nouveau: string;
  CE: string;
  'num Equipe': string;
  'num Bus': string;
}

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
  const [data, setData] = useState({} as any)


  // Fonction pour gérer le chargement du fichier
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data)
      },
      error: (error) => {
        console.error("Erreur lors de l'analyse du fichier CSV:", error);
      },
    });
  };

  const Submit = async () => {
    const lines = data.map((row: any) => row['E-mail']); // Assurez-vous que le nom de la colonne est correct
    const t = await api.post("user/getInfo", {emails: lines})
    const results: {ids: (string | null)[], missing: string[]} = t.data.data
    results.ids.forEach((value, index) => {
      data[index]['num Equipe'] = value
    })

    // Création du fichier CSV modifié
    const csv = Papa.unparse(data);
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvLink = document.createElement('a');
    csvLink.href = csvUrl;
    csvLink.download = 'updated_data.csv';
    document.body.appendChild(csvLink);
    csvLink.click();
    document.body.removeChild(csvLink);

    // Création du fichier texte avec les emails manquants
    const missingEmails = results.missing.join('\n');
    const txtBlob = new Blob([missingEmails], { type: 'text/plain;charset=utf-8;' });
    const txtUrl = URL.createObjectURL(txtBlob);
    const txtLink = document.createElement('a');
    txtLink.href = txtUrl;
    txtLink.download = 'missing_emails.txt';
    document.body.appendChild(txtLink);
    txtLink.click();
    document.body.removeChild(txtLink);

    // Réinitialisation des états après soumission
    setUsers([]);
    setTeam({});
    setData([]);
  };

  return (
      <div>
        <div className="file-upload-container">
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
        <button className="submit-button" onClick={Submit}>Soumettre</button>
        <ToastContainer position="bottom-right" />
      </div>
  );
};

//take a csv with 2 columns, user_id and bus and assign the bus to the user in database
export const AddWEIData = () => {
  const [data, setData] = useState({} as any)

  // Fonction pour gérer le chargement du fichier
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data)
      },
      error: (error) => {
        console.error("Erreur lors de l'analyse du fichier CSV:", error);
      },
    });
  };

  const Submit = async () => {
    const lines = data.map((row: any) => {
      return {user_id: row["user_id"], bus: row["bus"]}
    });
    await handleError("data ajoutées !", "Une erreur est survenue", setBusData, lines)
    setData([]);
  };

  return (
      <div>
        <div className="file-upload-container">
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
        <button className="submit-button" onClick={Submit}>Soumettre</button>
        <ToastContainer position="bottom-right" />
      </div>
  );
};

//to get data for wei bus distribution
export const TestNewStudentInDb = () => {
  const [users, setUsers] = useState([] as any[]);
  const [team, setTeam] = useState({} as any);

  // Fonction pour gérer le chargement du fichier
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const decoder = new TextDecoder('utf-8');
      const content = decoder.decode(e.target?.result as ArrayBuffer);
      let lines: {first_name: string, last_name: string}[] = []
      content.split("\n").forEach(line => {
        const data = line.split(";")
        lines.push({last_name: data[1], first_name: data[2]})
      })
      setUsers(lines);
    };
    reader.readAsArrayBuffer(file);
  };

  const Submit = async () => {
    const missingUsers = await api.post("user/getMissing", {data: users})
    const data = missingUsers.data.data
    const stringContent = JSON.stringify(data);

    const blob = new Blob([stringContent], { type: 'application/json' }); // Utilisation de 'application/json' pour JSON
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