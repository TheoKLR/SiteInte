import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Challenge, ChallType} from "../../../services/interfaces";
import {toTable} from "../../utils/Tables";
import {getChallenges, unvalidFreeChallenge, validFreeChallenge} from "../../../services/requests/challenges";
import {handleError, toId} from "../../utils/Submit";
import {Choice, Factions, getFreeChallengeText} from "../../utils/Select";

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
    const [faction, setFaction] = useState({} as any)
    const [challenge, setChallenge] = useState({} as any)
    const [points, setPoints] = useState<number>(0)
    const [text, setText] = useState<string>("")

    const Submit = async () => {
        const id = toId(faction)
        await handleError("Challenge validé !", "Challenge déjà complété.", validFreeChallenge, faction.value, points, text)
        setFaction({})
        setChallenge({})
        setPoints(0)
        setText("")
    }

    return (
        <div className="info-container">
            <div className="select-container">
                <Select
                    options={Factions()}
                    onChange={faction => setFaction(faction)}
                    value={faction}
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
            <button className="submit-button" disabled={!faction || points === 0 || !challenge} onClick={Submit}>Soumettre</button>
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export const UnvalidChallenge: React.FC = () => {
    const [faction, setFaction] = useState({} as any)
    const [challenge, setChallenge] = useState({} as any)
    const [options, setOptions] = useState<any>([])

    const Submit = async () => {
        await handleError("Challenge unvalidé !", "Challenge non complété.", unvalidFreeChallenge, faction.value, challenge.value)
        setFaction({})
        setChallenge({})
    }

    useEffect(() => {
        getFreeChallengeText(faction.value)
            .then(value => {
                setOptions(value)})
    }, [faction]);

    return (
        <div className="info-container">
            <div className="select-container">
                <Select
                    options={Factions()}
                    onChange={faction => {
                        setFaction(faction)
                    }}
                    value={faction}
                />
                <Select
                    options={options}
                    onChange={chall => setChallenge(chall)}
                    value={challenge}
                />

            </div>
            <button className="submit-button" disabled={!faction || !challenge} onClick={Submit}>Soumettre</button>
            <ToastContainer position="bottom-right" />
        </div>
    )
}