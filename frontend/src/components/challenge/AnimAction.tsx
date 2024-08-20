import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Challenge, ChallType} from "../../services/interfaces";
import {toTable} from "../utils/Tables";
import {getChallenges, unvalidChallenge, validChallenge} from "../../services/requests/challenges";
import {handleError} from "../utils/Submit";
import {Ces, Challenges, Choice, Factions, Teams, Users} from "../utils/Select";

interface TableChallengeType {
    type: ChallType
}

export const TableChallenge: React.FC<TableChallengeType> = ({ type }) => {

  const [challenges, setChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const teams = await getChallenges(type, Choice.ALL, undefined);
                setChallenges(teams)
            } catch (error) {
                console.error('Error fetching challenges:', error);
            }
        };
        fetchChallenges();
    }, []);
  return challenges.length > 0 ? toTable(challenges) : null;
}

export const ValidChallenge: React.FC<{type: ChallType}> = ({type}) => {
    const [value, setValue] = useState({} as any)
    const [challenge, setChallenge] = useState({} as any)
    const [choices, setChoices] = useState({} as any)
    const [points, setPoints] = useState<number>(0)
    const [text, setText] = useState<string>("")

    const Submit = async () => {
        await handleError("Challenge validé !", "Challenge déjà complété.", validChallenge, value.value, challenge.value, points, text)
        setValue({})
        setChallenge({})
        setPoints(0)
        setText("")
    }

    return (
        <div className="info-container">
            <div className="select-container">
                <Select
                    options={(type === ChallType.Student) ? Users() :
                             type === ChallType.StudentOrCe ? Ces() :
                             type === (ChallType.Faction) ? Factions() : Teams()}
                    onChange={faction => setValue(faction)}
                    value={value}
                />
                <Select
                    options={Challenges(type, Choice.AVAILABLE, value.value)}
                    onChange={chall => {
                        setText(chall.description + " : " + chall.points)
                        setChallenge(chall)
                    }}
                    value={challenge}
                />

            </div>
            <div className="textfield-container">
                <div className="input-container">
                    <label htmlFor="points">Points :</label>
                    <input
                        id="points"
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                    />
                </div>

                {/* Input pour le texte */}
                <div className="input-container">
                    <label htmlFor="text">Explication :</label>
                    <input
                        id="text"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </div>
            <button className="submit-button" disabled={!value || points === 0 || !challenge} onClick={Submit}>Soumettre</button>
            <ToastContainer position="bottom-right" />
        </div>
    )
}
export const UnvalidChallenge: React.FC<{type: ChallType}> = ({type}) => {
    const [value, setValue] = useState({} as any)
    const [challenge, setChallenge] = useState({} as any)

    const Submit = async () => {
        await handleError("Challenge unvalidé !", "Challenge non complété.", unvalidChallenge, challenge.value, value.value)
        setValue({})
        setChallenge({})
    }

    return (
        <div className="info-container">
            <div className="select-container">
                <Select
                    options={(type === ChallType.Student) ? Users() :
                        type === ChallType.StudentOrCe ? Ces() :
                            type === (ChallType.Faction) ? Factions() : Teams()}
                    onChange={team => setValue(team)}
                    value={value}
                />
                <Select
                    options={Challenges(type, Choice.COMPLETED, value.value)}
                    onChange={chall => setChallenge(chall)}
                    value={challenge}
                />

            </div>
            <button className="submit-button" disabled={!value || !challenge} onClick={Submit}>Soumettre</button>
            <ToastContainer position="bottom-right" />
        </div>
    )
}