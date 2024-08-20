import { api } from "../api";
import {ChallType} from "../interfaces";

export const createTeam = async (name: string) => {
  return await api.post("team", { name });
};

export const deleteTeam = async (id: number) => {
  return await api.delete("team/" + id);
};

export const getTeam = async (id: number) => {
  const response = await api.get("team/" + id)
  return response?.data.data ;
};

export const addToFaction = async (teamIds: number[], factionId: number) => {
  return await api.put("team/addtofaction", {
    teamIds,
    factionId,
  });
};

export const registerTeam = async (name: string, userIds: number[]) => {
  return await api.post("team/register", {
    name,
    userIds,
  });
};

export const renameTeam = async (name: string, id: number[]) => {
  return await api.post("team/rename", {
    name,
    id
  });
};
export const validateTeam = async (id: number, isOfficial: boolean) => {
  return await api.post("team/validate", {
    id,
    isOfficial
  });
};

export const setTimestamp = async (timestamp: number, id: number) =>{
  api.put("/team/timestamp", { timestamp, id })};

// Obtention de la liste des équipes enregistrées dans la db
export const getAllTeams = async () => {
  const response = await api.get("team/all");
  return response.data.data;
};

export const getAllTeamsWithPoints = async () => {
  const response = await api.get("team/allWithPoints");
  return response.data.data;
};

export const getAllMembersTeam = async (id : number) => {
  const response = await api.get("team/getallmembers/"+id);
  return response.data.data;
};