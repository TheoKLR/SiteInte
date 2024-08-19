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

export const getAllFreeChallengesTexts = async (factionId: number) => {
  const response = await api.post("challenge/allFreeText", {
    factionId
  });
  return response.data.data;
};

export const validChallenge = async (associatedId: number, challId: number, attributedPoints: number, text: string|null) => {
  console.log("ratio")
  return await api.post('challenge/valid', {
    associatedId,
    challId,
    attributedPoints,
    text
  })
}

export const validFreeChallenge = async (associatedId: number, attributedPoints: number, text: string|null) => {
  return await api.post('challenge/validFree', {
    associatedId,
    attributedPoints,
    text
  })
}

export const unvalidFreeChallenge = async (factionId: number, text: number) => {
  return await api.post('challenge/unvalidFree', {
    factionId,
    text
  })
}

export const unvalidChallenge = async (challId: number, associatedId: number) => {
  return await api.post('challenge/unvalid', {
    challId,
    associatedId
  })
}