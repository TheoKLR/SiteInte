import { Request, Response } from 'express';
import * as service from '../services/user.service';
import { errorResponse, okResponse } from '../utils/responses';
import { RoleType } from '../schemas/user.schema';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllUsers();
    okResponse(res, {data});
  } catch(error) {
    errorResponse(res, {error});
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return errorResponse(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getUser(idNumber);
    okResponse(res, {data});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return errorResponse(res, { msg : 'could not parse Id' });

  try {
    await service.deleteUser(idNumber);
    okResponse(res, {msg: "User deleted"});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const addToTeam = async (req: Request, res: Response) => {
  const { UserId, TeamId } = req.body;

  try {
    await service.addToTeam(UserId, TeamId);
    okResponse(res, {msg: "User modified"});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const addContact = async (req: Request, res: Response) => {
  const { userId, contact } = req.body;

  try {
    await service.addContact(userId, contact);
    okResponse(res, {msg: "User modified"});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const getUserDesires = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return errorResponse(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getUserDesires(idNumber);
    okResponse(res, {data});
  } catch (error) {
    errorResponse(res, { error });
  }
};

