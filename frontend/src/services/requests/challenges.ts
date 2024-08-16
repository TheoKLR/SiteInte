import { api } from "../api";
import {ChallType} from "../interfaces";

// Obtention de la liste des challenges enregistrées dans la db
export const getAllChallenges = async () => {
  const response = await api.get("challenge/all");
  return response.data.data;
};

export const getChallenges = async (type: ChallType) => {
  const response = await api.get("challenge/all" + type);
  return response.data.data;
};

export const validChallenge = async (associatedId: number, challId: number, attributedPoints: number, text: string|null) => {
  return await api.post('challenge/valid', {
    associatedId,
    challId,
    attributedPoints,
    text
  })
}

export const unvalidChallenge = async (associatedId: number, challId: number) => {
  return await api.post('challenge/unvalid', {
    associatedId,
    challId
  })
}
