import { Request, Response } from 'express';
import * as service from '../services/user.service';
import { errorResponse, createResponse, okResponse } from '../utils/responses';
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
    const { id } = req.body;

  try {
    const data = await service.getUser(id);
    okResponse(res, {data});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    await service.deleteUser(id);
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

export const grantUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  

  try {
    const user = await service.getUser(id);

    if (user === null) {
      return errorResponse(res, { msg: "user doesn't exists" });
  }
    if (user.role === RoleType.NewStudent) {
      return errorResponse(res, {msg: "you can't grant new student"});
    }
    await service.grantUser(id)
    okResponse(res, {msg: "User modified"});
  } catch (error) {
    errorResponse(res, {error});
  }
};

export const revokeUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const user = await service.getUser(id);

    if (user === null) {
      return errorResponse(res, { msg: "user doesn't exists" });
  }
    if (user.role === RoleType.NewStudent || user.role === RoleType.Student) {
      return errorResponse(res, {msg: "you can't revoke student or new student"});
    }
    await service.revokeUser(id)
    okResponse(res, {msg: "User modified"});
  } catch (error) {
    errorResponse(res, {error});
  }
};