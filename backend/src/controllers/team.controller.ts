import { Request, Response, NextFunction } from 'express';
import * as service from '../services/team.service';
import * as user_service from '../services/user.service';
import { Error, Created, Ok } from '../utils/responses';
import { time } from 'console';


export const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllTeams();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'Could not parse Id' });

  try {
    const data = await service.getTeam(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  name ?? Error(res, { msg: "No name" });

  try {
    await service.createTeam(name);
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
};

export const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    await user_service.removeUsersFromTeam(idNumber);
    await service.deleteTeam(idNumber);
    Ok(res, { msg: "Team deleted" });
  } catch (error) {
    Error(res, { error });
  }
};

export const addToFaction = async (req: Request, res: Response, next: NextFunction) => {
  const { teamIds, factionId } = req.body;

  try {
    await service.addToFaction(teamIds, factionId);
    Ok(res, { msg: "Team modified" });
  } catch (error) {
    Error(res, { error });
  }
};

export const registerTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { name, userIds } = req.body;

  try {
    await service.createTeam(name);
    const id = await service.getTeamId(name);
    if (id) {
      await user_service.addToTeam(userIds, id);
    }
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
}

export const addTimestamp = async (req: Request, res: Response, next: NextFunction) => {
  const { timestamp, id } = req.body;
  console.log('test2:' + timestamp + "   " +  id)
  try {
    await service.addTimestamp(timestamp, id);
    Ok(res, { msg: "Team modified" });
  } catch (error) {
    Error(res, { error });
  }
};

export const getTimestamp = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  try {
    const data = await service.getTimestamp(id);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};


export const renameTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.body;

  name ?? Error(res, { msg: "No name" });

  try {
    await service.renameTeam(name, id);
    Ok(res, {msg : "Team renamed !"})
  } catch (error) {
    Error(res, { error });
  }
};


export const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { id, isOfficial } = req.body;

  try {
    await service.validateTeam(id, isOfficial);
    Ok(res, {msg : "Team updated !"})
  } catch (error) {
    Error(res, { error });
  }
};

export const getAllMembersTeam = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
  
    const members = await user_service.getAllMembersTeam(idNumber);
    
    Ok(res, {data : members})
  } catch (error) {
    Error(res, { error });
  }
};
