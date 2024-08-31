import { Request, Response, NextFunction } from 'express';
import * as service from '../services/faction.service';
import * as team_service from '../services/team.service'
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
    await team_service.removeTeamFromFaction(idNumber);
    await service.deleteFaction(idNumber);
    Ok(res, { msg: "Faction deleted" });
  } catch (error) {
    Error(res, { error });
  }
};
