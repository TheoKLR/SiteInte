import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateUser } from '../../services/requests/users';
import { handleError } from '../utils/Submit';
import { ToastContainer, toast } from 'react-toastify';
import './Profil.css';

export const ProfilForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const currentUser = await getCurrentUser();
            setFirstName(currentUser.first_name);
            setLastName(currentUser.last_name);
            setEmail(currentUser.email);
            setBirthday(currentUser.birthday);
            setContact(currentUser.contact);
            console.log(currentUser);
          } catch (error) {
            toast.error('Erreur lors de la récupération du profil. Veuillez réessayer plus tard.');
          }
        };
    
        fetchUserData();
      }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            handleError("Profil mis à jour avec succès !", "Une erreur est survenue", updateUser, firstName, lastName, birthday, contact);
        } catch (error) {
            toast.error('Erreur lors de la mise à jour du profil. Veuillez réessayer plus tard.');
        }
    };

    return (
        <div className="profil-form-container">
            <p style={{textAlign: "center"}}>Si tu as le moindre soucis avec ton profil n'hésite pas à contacter : integration@utt.fr</p>
            <form onSubmit={handleSubmit} className="form-group">
                <label>
                    Prénom:
                    <input
                        type="text"
                        placeholder={firstName}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled
                    />
                </label>
                <label>
                    Nom:
                    <input
                        type="text"
                        placeholder={lastName}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled
                    />
                </label>
                <label>Email:</label>
                    <input
                        type="text"
                        placeholder={email}
                        value={email}
                        disabled
                    />
                <label>
                    Date de naissance:
                    <input
                        type="date"
                        value={birthday}
                        placeholder={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        disabled
                    />
                </label>
                <label>
                    Tes moyens de contact (tu peux en mettre plusieurs 😊):
                    <textarea
                        value={contact}
                        placeholder="Entre tes moyens de contact ici..."
                        onChange={(e) => setContact(e.target.value)}
                    />
                </label>
                <button type="submit" className="button-36">Mettre à jour</button>
            </form>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default ProfilForm;
