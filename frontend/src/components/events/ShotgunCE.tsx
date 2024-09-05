import { useEffect, useState } from "react";
import { handleError } from "../utils/Submit";
import { setTimestamp } from "../../services/requests/teams";
import { ToastContainer, toast } from "react-toastify";
import { getCurrentUser } from "../../services/requests/users";

// Formulaire pour que les étudiants de l'utt puissent choisir les rôles qui les intérresseraient pour l'inté
export const ShotgunCE = () => {
  const [answer, setAnswer] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentUserId, setId] = useState(0);
  const [currentUserTeamId, setTeamId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser.team_id) {
        setTeamId(currentUser.team_id);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (answer === "T'as les cramptés?") {
      const timestamp = Date.now();
      if (
        await handleError(
          "Bien joué",
          "Mauvaise saisie",
          setTimestamp,
          timestamp,
          currentUserTeamId
        )
      )
        setSuccess(true);
    } else {
      toast.error("La phrase n'a pas bien été saisie!");
    }
  };

  return (
    <>
      <div className="containerChoix">
        <h3>
          Tu veux devenir CE ? Trop bien ! Dépêche toi de remplir ce formulaire
          et de l'envoyer car c'est premier arrivé premier servi !
        </h3>
        <form onSubmit={handleSubmit}>
          <p className="unselectable">Ecris "T'as les cramptés?"</p>
          <input
            type="text"
            placeholder="Phrase magique"
            autoComplete="off"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            required
          />
          <button className="button-36" type="submit">
            Envoyer
          </button>
          {success && (
            <p>Bien joué ta candidature a bien été prise en compte!</p>
          )}
          <ToastContainer position="bottom-right" />
        </form>
      </div>
    </>
  );
};
