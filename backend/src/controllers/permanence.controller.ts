import { Request, Response, NextFunction } from 'express';
import * as service from '../services/permanence.service';
import * as team_service from '../services/team.service'
import { Error, Created, Ok } from '../utils/responses';


export const getAllPermanences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllPermanences();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getPermanence = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getPermanence(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

export const createPermanence = async (req: Request, res: Response, next: NextFunction) => {
  const { name, desc, startingTime, duration, studentNumber } = req.body;
  name ?? Error(res, { msg: "No name" });

  try {
    await service.createPermanence(name, desc, startingTime, duration, studentNumber);
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
};

export const deletePermanence = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    await service.deletePermanence(idNumber);
    Ok(res, { msg: "Permanence deleted" });
  } catch (error) {
    Error(res, { error });
  }
};
