import { Request, Response } from 'express';
import * as service from '../services/faction.service';
import { errorResponse, createResponse, okResponse } from '../utils/responses';


export const getAllFactions = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllFactions();
    okResponse(res, { data });
  } catch (error) {
    errorResponse(res, { error });
  }
}

export const getFaction = async (req: Request, res: Response) => {
  const { id } = req.body;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) { errorResponse(res, { msg: "Bad ID format" }) };

  try {
    const data = await service.getFaction(idNumber);
    okResponse(res, { data });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const createFaction = async (req: Request, res: Response) => {
  const { name } = req.body;

  name ?? errorResponse(res, { msg: "No name" });

  try {
    await service.createFaction(name);
    createResponse(res, {})
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const deleteFaction = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    await service.deleteFaction(id);
    okResponse(res, { msg: "Faction deleted" });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const renameFaction = async (req: Request, res: Response) => {
  const { id, name } = req.body;

  name ?? errorResponse(res, { msg: "No name" });


  try {
    await service.renameFaction(name, id);
    okResponse(res, { msg: "Faction renamed" });
  } catch (error) {
    errorResponse(res, { error });
  }
};

export const addPoints = async (req: Request, res: Response) => {
  const { id, points } = req.body;

  try {
    const currentPoints = await service.getPoints(id);
    service.addPoints(id, currentPoints, points);
    okResponse(res, { msg: "Faction modified" });
  } catch (error) {
    errorResponse(res, { error });
  }
};
