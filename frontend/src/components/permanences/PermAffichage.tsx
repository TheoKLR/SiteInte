import React, { useEffect, useState } from 'react';
import { Perm, User } from '../../services/interfaces';
import { handleError } from '../utils/Submit';
import { deletePerm, getAllPerms, getRegistration, getUserPermanences, isRegister, registerPermanence, unRegisterPermanence } from '../../services/requests/perms';
import { toast, ToastContainer } from 'react-toastify';
import { getCurrentUser } from '../../services/requests/users';
import './PermAffichage.css';

export const PublicDashboard: React.FC = () => {
    const [permanences, setPermanences] = useState<Perm[]>([]);
    const [registrations, setRegistrations] = useState<Record<number, any[]>>({});
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
    const [displayList, setDisplayList] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const fetchPerms = async () => {
            try {
                const permanencesData = await getAllPerms();
                setPermanences(permanencesData);
                permanencesData.forEach((perm : Perm)  => {
                    fetchRegistrations(perm.id);
                });
            } catch (error) {
                console.error('Error fetching permanences:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchPerms();
        fetchUser();
        
    }, []);

    const handleRegister = async (permanenceId: number) => {
        try {
            if(currentUser){

                const alreadyRegister = await isRegister(permanenceId, currentUser.id);
                console.log(alreadyRegister);
                if(alreadyRegister === false){
                    
                    await handleError(
                        "Permanence enregistrée !",
                        "Impossible de s'inscrire à la permanence",
                        registerPermanence,
                        permanenceId,
                        currentUser.id
                    );
                }
                else{
                    toast.error("Vous êtes déjà inscrits !")
                }
                await fetchRegistrations(permanenceId);
            }
        } catch (error) {
            console.error('Error while registering user:', error);
        }
    };

    const handleUnregister = async (permanenceId: number) => {
        try {
            await handleError(
                "Désinscription réussie !",
                "Impossible de se désinscrire de la permanence",
                unRegisterPermanence,
                permanenceId,
                currentUser?.id
            );
            await fetchRegistrations(permanenceId);
        } catch (error) {
            console.error('Error while unregistering user:', error);
        }
    };

    const handleList = (permanenceId: number) => {
        setDisplayList((prev) => ({
            ...prev,
            [permanenceId]: !prev[permanenceId],  
        }));
    };

    const fetchRegistrations = async (permanenceId: number) => {
        try {
            const currentRegistrations = await getRegistration(permanenceId);
            setRegistrations((prev) => ({
                ...prev,
                [permanenceId]: currentRegistrations,
            }));
        } catch (error) {
            console.error('Error fetching registrations:', error);
        }
    };

    const isRegistrationClosed = (startTime: string) => {
        const now = new Date();
        const startTimeDate = new Date(startTime);
        const twentyFourHoursBefore = new Date(startTimeDate.getTime() - 24 * 60 * 60 * 1000);
        return now > twentyFourHoursBefore;
    };

    const isUserRegistered = (permanenceId: number) => {
        return registrations[permanenceId]?.some((reg) => reg.user.id === currentUser?.id);
    };

    const getRemainingPlaces = (permanenceId: number) => {
        const totalRegistrations = registrations[permanenceId]?.length || 0;
        const permanence = permanences.find((p) => p.id === permanenceId);
        return permanence ? permanence.maxRegistrations - totalRegistrations : 0;
    };

    return (
        <div className="dashboard-container">
            <ul className="perm-list">
                {permanences.length > 0 ? (
                    permanences.map((permanence) => (
                        <li key={permanence.id}>
                            <h2>{permanence.title}</h2>
                            <p>{permanence.description}</p>
                            <p> {permanence.startTime} - {permanence.endTime}</p>
                            <p>Lieu : {permanence.location}</p>
                            <p>Nombre de places : {permanence.maxRegistrations}</p>
                            <p>Places restantes : {getRemainingPlaces(permanence.id)}</p> {/* Nouvel élément */}

                            {isUserRegistered(permanence.id) ? (
                                <button
                                    onClick={() => handleUnregister(permanence.id)}
                                    className="unregister-button"
                                    disabled={isRegistrationClosed(new Date(permanence.startTime).toLocaleString())}
                                >
                                    Se désinscrire
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleRegister(permanence.id)}
                                    disabled={!permanence.isRegistrationOpen || isRegistrationClosed(new Date(permanence.startTime).toLocaleString())}
                                >
                                    S'inscrire
                                </button>
                            )}

                            <button onClick={() => handleList(permanence.id)}>
                                Voir les inscrits
                            </button>
                            {displayList[permanence.id] && (
                                <ul className="registered-users-list">
                                    {registrations[permanence.id]?.length > 0 ? (
                                        registrations[permanence.id].map((reg) => (
                                            <li key={reg.Registration.id}>
                                                {reg.user.first_name} {reg.user.last_name}
                                            </li>
                                        ))
                                    ) : (
                                        <p>Aucune personne dans la permanence.</p>
                                    )}
                                </ul>
                            )}
                        </li>
                    ))
                ) : (
                    <p>Aucune permanence disponible.</p>
                )}
            </ul>
            <ToastContainer position="bottom-right" />
        </div>
    );
};




export const UserPermanenceSummary: React.FC = () => {
    const [userPermanences, setUserPermanences] = useState<Perm[]>([]);
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchUserPermanences = async () => {
            try {
                if (currentUser) {
                    const registrations = await getUserPermanences(currentUser.id);
                    setUserPermanences(registrations);
                }
            } catch (error) {
                console.error('Error fetching user permanences:', error);
            }
        };

        fetchUserPermanences();
    }, [currentUser]);

    return (
        <div className="dashboard-container">
          <h2>Mes Permanences</h2>
          <ul className="perm-list">
            {userPermanences.length > 0 ? (
              userPermanences.map((permanence) => (
                <li key={permanence.id} className="user-permanence-summary">
                  <h3>{permanence.title}</h3>
                  <p>{permanence.description}</p>
                  <p className="permanence-dates">{new Date(permanence.startTime).toLocaleString()} - {new Date(permanence.endTime).toLocaleString()}</p>
                  <p className="permanence-location">Lieu : {permanence.location}</p>
                </li>
              ))
            ) : (
              <p className="empty-summary">Aucune permanence enregistrée.</p>
            )}
          </ul>
        </div>
      );
};

