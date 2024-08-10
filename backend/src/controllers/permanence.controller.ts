import { Request, Response, NextFunction } from 'express';
import * as service from '../services/permanence.service';
import { Error, Created, Ok } from '../utils/responses';


export const getAllPermanences = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const data = await service.getAllPermanences();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getAllAvailablePermanences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.getAllAvailablePermanences();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

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

export const addUserToPermanence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, permId } = req.params;
  const userIdNumber = parseInt(userId, 10);
  const permIdNumber = parseInt(permId, 10);

  if (isNaN(userIdNumber)) return Error(res, { msg: "could not parse Id" });
  if (isNaN(permIdNumber)) return Error(res, { msg: "could not parse Id" });

  try {
    const userAdded = await service.addUserToPermanence(userIdNumber, permIdNumber);
    if (userAdded) {
      Ok(res, { msg: "user added to permanence" });
    } else {
      Error(res, { msg: "max number of student reached" });
    }
  } catch (error) {
    Error(res, { error });
  }
};

export const updateTimeLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.updateTimeLimit();
    Ok(res, {});
  } catch (error) {
    Error(res, { error });
  }
};