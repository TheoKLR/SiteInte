import { Request, Response, NextFunction } from 'express';
import * as service from '../services/faction.service';
import { Error, Created, Ok } from '../utils/responses';


export const getAllFactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllFactions();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getFaction = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getFaction(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

export const createFaction = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  console.log(name)

  name ?? Error(res, { msg: "No name" });

  try {
    await service.createFaction(name);
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
};

export const deleteFaction = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    await service.deleteFaction(idNumber);
    Ok(res, { msg: "Faction deleted" });
  } catch (error) {
    Error(res, { error });
  }
};

export const addPoints = async (req: Request, res: Response, next: NextFunction) => {
  const { id, points } = req.body;

  try {
    const currentPoints = await service.getPoints(id);
    service.addPoints(id, currentPoints, points);
    Ok(res, { msg: "Faction modified" });
  } catch (error) {
    Error(res, { error });
  }
};
