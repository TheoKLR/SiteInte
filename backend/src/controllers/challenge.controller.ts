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

export const getAllStudentOrCeChallenges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllStudentOrCeChallenges();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getAllFreeChallenges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllFreeChallenges();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const validChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {challId, associatedId, attributedPoints, text} = req.body
    const data = await service.validateChallenge(challId, associatedId, attributedPoints, text);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const validFreeChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {associatedId, attributedPoints, text} = req.body
    const data = await service.freeChallengeToFaction(associatedId, attributedPoints, text);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getAllFreeText = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {factionId} = req.body
    const data = await service.getFreeChallenges(factionId);
    const response = data.map(value => value.text)
    Ok(res, {data: response});
  } catch (error) {
    Error(res, { error });
  }
}

export const unvalidChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {challId, associatedId} = req.body
    const data = await service.unvalidateChallenge(challId, associatedId);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const unvalidFreeChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {factionId, text} = req.body
    const data = await service.unvalidateToFaction(text, factionId);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getAllStudentChallenges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllStudentChallenges();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getAllFactionChallenges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllFactionChallenges();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getAllTeamChallenges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllTeamChallenges();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const createChallenge = async (req: Request, res: Response, next: NextFunction) => {
  const { name, desc, points } = req.body;
  name ?? Error(res, { msg: "No name" });

  try {
    //await service.createChallenge(name, desc, points);
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
  const { challengeId, associatedId, points, text } = req.body;

  try {
    await service.validateChallenge(challengeId, associatedId, points, text);
    Ok(res, { msg: "challenge validated" });
  } catch (error) {
    Error(res, { error });
  }
}

export const countPoints = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const points = [await service.countPoints(1), await service.countPoints(2)]
    Ok(res, {data: points});
  } catch (error) {
    Error(res, { error });
  }
}