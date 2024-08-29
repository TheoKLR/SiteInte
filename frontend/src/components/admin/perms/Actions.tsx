import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {Perm, User} from '../../../services/interfaces';
import { handleError } from '../../utils/Submit';
import './Permanences.css'
import {
  getAllPerms,
  deletePerm,
  updatePermanence,
  createPerm,
  openOrclosePermanenceJ7,
  openClosePermanence,
  getRegistration, getMemberOfPerm, setMembersOfPerm
} from '../../../services/requests/perms';
import Select from "react-select";
import {Challenges, Choice, PermUsers} from "../../utils/Select";
import {getAllUsers} from "../../../services/requests";
export const PermanenceList = () => {
  const [permanences, setPermanences] = useState<Perm[]>([]);
  const [selectedPerm, setSelectedPerm] = useState<Perm | null>(null);
  const [allMembers, setAllMembers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [registeredMembers, setRegisteredMembers] = useState<User[] | undefined>()

  useEffect(() => {
    const fetchPerms = async () => {
      try {
        const fetchedPermanences = await getAllPerms();
        setPermanences(fetchedPermanences);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPerms();
  }, []);

  useEffect(() => {
    if(!selectedPerm) return

    const fetchData = async () => {
      try {
        const response = await getMemberOfPerm(selectedPerm.id)
        const allMembers = await getAllUsers()
        const usersOptions = response.map((user: any) => ({
          value: user.userId,
          label: `${user.firstName} ${user.lastName}`,
          email : user.email,
        }))
        const allMembersOptions = allMembers.map((user: any) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name}`,
          email : user.email,
        }))
        setSelectedUsers(usersOptions)
        setAllMembers(allMembersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()

  }, [selectedPerm]);

  const handleDelete = async (id: number) => {
    try {
      await handleError("Permanence supprimée", "Erreur lors de la suppression", deletePerm, id);
      const updatedPermanences = await getAllPerms();
      setPermanences(updatedPermanences);
    } catch (error) {
      toast.error('Erreur lors de la suppression de la permanence. Veuillez réessayer plus tard.');
    }
  };

  const handleOpen = async (permanence: Perm) => {
    try {
      const updatedPerm = { ...permanence, isRegistrationOpen: true };
      await handleError("Permanence ouverte !", "Erreur lors de l'ouverture", openClosePermanence, 
        permanence.id,
        true
      );
      const updatedPermanences = await getAllPerms();
      setPermanences(updatedPermanences);
    } catch (error) {
      toast.error("Erreur lors de l'ouverture de la permanence.");
    }
  };

  const handleClose = async (permanence: Perm) => {
    try {
      await handleError("Permanence fermée !", "Erreur lors de la fermeture", openClosePermanence, 
        permanence.id,
        false
      );
      const updatedPermanences = await getAllPerms();
      setPermanences(updatedPermanences);
    } catch (error) {
      toast.error("Erreur lors de la fermeture de la permanence.");
    }
  };

  const handleEdit = (permanence: Perm) => {
    setSelectedPerm(permanence);
    setShowModal(true); // Afficher le formulaire modal
  };

  const handleRemoveUser = (permanence: Perm) => {
    setSelectedPerm(permanence);
    setShowModal(true); // Afficher le formulaire modal
  };

  const handleAddUser = (permanence: Perm) => {
    setSelectedPerm(permanence);
    setShowModal(true); // Afficher le formulaire modal
  };

  const handleUpdate = async () => {
    if (selectedPerm) {
      try {
        await handleError("Permanence mise à jour !", "Erreur lors de la mise à jour", updatePermanence, 
          selectedPerm.id,
          selectedPerm.title,
          selectedPerm.description,
          selectedPerm.startTime,
          selectedPerm.endTime,
          selectedPerm.location,
          selectedPerm.maxRegistrations,
          selectedPerm.isRegistrationOpen
        );
        await handleError("Permanence mise à jour !", "Erreur lors de la mise à jour", setMembersOfPerm
            ,
            selectedPerm.id,
            selectedUsers.map((value: any) => value.value)
        );
        const updatedPermanences = await getAllPerms();
        setPermanences(updatedPermanences);
        setShowModal(false); // Fermer le formulaire modal
      } catch (error) {
        toast.error("Erreur lors de la mise à jour de la permanence.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2>Liste des Permanences</h2>
      <ul className="perm-list">
        {permanences.length > 0 ? (
          permanences.map((permanence: Perm) => (
              <li key={permanence.id}>
                <h3>{permanence.title}</h3>
                <p>{permanence.description}</p>
                <p>{permanence.startTime} - {permanence.endTime}</p>
                <p>Lieu : {permanence.location}</p>
                <p>Nb de personne max : {permanence.maxRegistrations}</p>
                <button onClick={() => handleDelete(permanence.id)}>Supprimer</button>
                <button onClick={() => handleEdit(permanence)}>Modifier</button>
                {!permanence.isRegistrationOpen ? (
                    <button onClick={() => handleOpen(permanence)}>Ouvrir la permanence</button>
                ) : (
                    <button className="close-button" onClick={() => handleClose(permanence)}>Fermer la
                      permanence</button>
                )}
              </li>
          ))
        ) : (
            <p>Aucune permanence trouvée.</p>
        )}
      </ul>

      {/* Modal pour la modification */}
      {showModal && selectedPerm && (
        <div className="modal">
          <h3>Modifier la permanence</h3>
          <form className="admin-form">
            <label>Titre :</label>
            <input
                type="text"
                value={selectedPerm.title}
                onChange={(e) => setSelectedPerm({...selectedPerm, title: e.target.value})}
            />
            <label>Description :</label>
            <textarea
                value={selectedPerm.description}
                onChange={(e) => setSelectedPerm({...selectedPerm, description: e.target.value})}
            />
            <label>Date de début :</label>
            <input
                type="datetime-local"
                value={selectedPerm.startTime}
                onChange={(e) => setSelectedPerm({...selectedPerm, startTime: e.target.value})}
            />
            <label>Date de fin :</label>
            <input
                type="datetime-local"
                value={selectedPerm.endTime}
                onChange={(e) => setSelectedPerm({...selectedPerm, endTime: e.target.value})}
            />
            <label>Lieu :</label>
            <input
                type="text"
                value={selectedPerm.location}
                onChange={(e) => setSelectedPerm({...selectedPerm, location: e.target.value})}
            />
            <label>Nombre max d'inscriptions :</label>
            <input
                type="number"
                value={selectedPerm.maxRegistrations}
                onChange={(e) => setSelectedPerm({...selectedPerm, maxRegistrations: parseInt(e.target.value)})}
            />
            <label>Membres</label>
            <Select
                options={allMembers}
                onChange={users => {
                  setSelectedUsers(users.map(t => t))
                }}
                isMulti={true}
                value={selectedUsers}
            />
            <div className="j7-actions">
              <button type="button" className="submit-button" onClick={handleUpdate}>
                Enregistrer les modifications
              </button>
              <button type="button" className="submit-button" onClick={() => setShowModal(false)}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer position="bottom-right"/>
    </div>
  );
};


export const PermanenceForm = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxRegistrations, setMaxRegistrations] = useState(0);

  const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();

      try{
        await handleError("Création OK", "Erreur lors de la création", createPerm, title, description, startTime, endTime, location, maxRegistrations );
        setTitle("");
        setDescription("");
        setStartTime("");
        setEndTime("");
        setLocation("");
        setMaxRegistrations(0);
      }catch(error){
          toast.error('Erreur lors de la création/modification de la permanence');
      }
    };

  return (
    <div className="admin-container">
      <form className="admin-form">
        <h2>Créer/Modifier une Permanence</h2>
        <label>Titre :</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Titre"
          required
        />
        <label>Description :</label>
        <textarea
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        <label>Date de début :</label>
        <input
          type="datetime-local"
          name="startTime"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          required
        />
        <label>Date de fin :</label>
        <input
          type="datetime-local"
          name="endTime"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          required
        />
        <label>Lieu :</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Lieu"
          required
        />
        <label>Nombre max d'inscriptions :</label>
        <input
          type="number"
          name="maxRegistrations"
          value={maxRegistrations}
          onChange={e => setMaxRegistrations(Number(e.target.value))}
          placeholder="Nombre max d'inscriptions"
          required
        />
        <button type="submit" onClick={handleSubmit}>Enregistrer</button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export const OpenPermsAtJ7 = () => {
  const [permanences, setPermanences] = useState<Perm[]>([]);

  const handleOpen = async() => {
    try{
      const updatedperms = await openOrclosePermanenceJ7(true);
      setPermanences(updatedperms);
      toast.success("Permanence ouverte à J-7!");
    }catch(error){
      toast.error("Erreur lors de l'ouverture à J-7");
    }
  }

  const handleClose = async() => {
    try{
      const updatedperms = await openOrclosePermanenceJ7(false);
      setPermanences(updatedperms);
      toast.success("Permanence fermée à J-7!");
    }catch(error){
      toast.error("Erreur lors de la fermeture à J-7");
    }
  }

  return (
    <div className="admin-container">
      <h2>Permanences ouvertes à J+7</h2>
      <ul className="perm-list">
        {permanences.length > 0 ? (
          permanences.filter(perm => perm.isRegistrationOpen).map((permanence: Perm) => (
            <li key={permanence.id}>
              <h3>{permanence.title}</h3>
              <p>{permanence.description}</p>
              <p>{permanence.startTime} - {permanence.endTime}</p>
              <p>Lieu : {permanence.location}</p>
            </li>
          ))
        ) : (
          <p>Aucune permanence ouverte ou fermée à J+7 pour le moment.</p>
        )}
      </ul>
      <div className="j7-actions">
        <div className="input">
          <label><strong>Voulez-vous ouvrir les permanences à J+7?</strong></label>
        </div>
        <button className="submit-button" onClick={handleOpen}>Ouvrir</button>
        <div className="input">
          <label><strong>Voulez-vous fermer les permanences à J+7?</strong></label>
        </div>
        <button className="submit-button" onClick={handleClose}>Fermer</button>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};