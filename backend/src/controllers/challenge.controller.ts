import { Request, Response, NextFunction } from 'express';
import * as service from '../services/challenge.service';
import { Error, Created, Ok } from '../utils/responses';

export const getAllChallenges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllChallenges();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const createChallenge = async (req: Request, res: Response, next: NextFunction) => {
  const { name, desc, points } = req.body;
  name ?? Error(res, { msg: "No name" });

  try {
    await service.createChallenge(name, desc, points);
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
};

export const deleteChallenge = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    await service.deleteChallenge(idNumber);
    Ok(res, { msg: "Challenge deleted" });
  } catch (error) {
    Error(res, { error });
  }
};

export const validateChallenge = async (req: Request, res: Response, next: NextFunction) => {
  const { challengeId, factionId } = req.body;

  try {
    await service.validateChallenge(challengeId, factionId);
    Ok(res, { msg: "challenge validated" });
  } catch (error) {
    Error(res, { error });
  }
}
