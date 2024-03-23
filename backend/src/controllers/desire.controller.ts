import { Request, Response, NextFunction } from 'express';
import * as service from '../services/desire.service';
import { Error, Created, Ok } from '../utils/responses';
import { decodeToken } from '../utils/token';

export const getAllDesires = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllDesires();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getDesire = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getDesire(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

export const createDesire = async (req: Request, res: Response, next: NextFunction) => {
  const { name, desc } = req.body;

  name ?? Error(res, { msg: "No name" });
  desc ?? Error(res, { msg: "No description" });

  try {
    await service.createDesire(name, desc);
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
};

export const deleteDesire = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    await service.deleteDesire(idNumber);
    Ok(res, { msg: "Desire deleted" });
  } catch (error) {
    Error(res, { error });
  }
};

export const submitDesires = async (req: Request, res: Response, next: NextFunction) => {
  const { desireIds } = req.body;

  const token = decodeToken(req)

  if (token === null) {
    return Error(res, { msg: 'No email' });
  }

  try {
    await service.deleteUserDesires(token.id);
    await service.submitDesires(token.id, desireIds);
    Ok(res, { msg: "Desires submitted" });
  } catch (error) {
    Error(res, { error });
  }
};

export const getDesireUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getDesireUsers(idNumber);
    Ok(res, {data});
  } catch (error) {
    Error(res, { error });
  }
};