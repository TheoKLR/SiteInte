import { Request, Response } from 'express';
import * as service from '../services/team.service';
import { Error, Created, Ok } from '../utils/responses';


export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllTeams();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getTeam(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  const { name } = req.body;

  name ?? Error(res, { msg: "No name" });

  try {
    await service.createTeam(name);
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    await service.deleteTeam(idNumber);
    Ok(res, { msg: "Team deleted" });
  } catch (error) {
    Error(res, { error });
  }
};

export const addTeamToFaction = async (req: Request, res: Response) => {
  const { teamId, factionId } = req.body;

  try {
    await service.addTeamToFaction(teamId, factionId);
    Ok(res, { msg: "Team modified" });
  } catch (error) {
    Error(res, { error });
  }
};
