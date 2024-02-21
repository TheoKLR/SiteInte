import { Request, Response } from 'express';
import * as service from '../services/team.service';
import { errorResponse, createResponse, okResponse } from '../utils/responses';


export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllTeams();
    okResponse(res, { data });
  } catch (error) {
    errorResponse(res, { error });
  }
}

export const getTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return errorResponse(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getTeam(idNumber);
    okResponse(res, { data });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  const { name } = req.body;

  name ?? errorResponse(res, { msg: "No name" });

  try {
    await service.createTeam(name);
    createResponse(res, {})
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return errorResponse(res, { msg : 'could not parse Id' });

  try {
    await service.deleteTeam(idNumber);
    okResponse(res, { msg: "Team deleted" });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const addTeamToFaction = async (req: Request, res: Response) => {
  const { teamId, factionId } = req.body;

  try {
    await service.addTeamToFaction(teamId, factionId);
    okResponse(res, { msg: "Team modified" });
  } catch (error) {
    errorResponse(res, { error });
  }
};
