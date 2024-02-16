import { Request, Response } from 'express';
import * as service from '../services/user.service';
import { errorResponse, createResponse, okResponse } from '../utils/responses';

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
  const { UserId, teamId } = req.body;

  try {
    await service.addToTeam(UserId, teamId);
    okResponse(res, {msg: "User modified"});
  } catch (error) {
    errorResponse(res, {error});
  }
};
