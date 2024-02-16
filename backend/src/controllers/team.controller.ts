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
  const { id } = req.body;

  try {
    const data = await service.getTeam(id);
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
  const { id } = req.body;

  try {
    await service.deleteTeam(id);
    okResponse(res, { msg: "Team deleted" });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const renameTeam = async (req: Request, res: Response) => {
  const { id, name } = req.body;

  name ?? errorResponse(res, { msg: "No name" });

  try {
    await service.renameTeam(name, id);
    okResponse(res, { msg: "Team renamed" });
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
