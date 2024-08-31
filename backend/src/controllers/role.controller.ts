import { Request, Response, NextFunction } from 'express';
import * as service from '../services/role.service';
import { Error, Created, Ok } from '../utils/responses';
import { decodeToken } from '../utils/token';

export const getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllRoles();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getRole = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg: 'could not parse Id' });

  try {
    const data = await service.getRole(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
  const { name, desc } = req.body;

  name ?? Error(res, { msg: "No name" });
  desc ?? Error(res, { msg: "No description" });

  try {
    await service.createRole(name, desc);
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
};

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg: 'could not parse Id' });

  try {
    await service.deleteRole(idNumber);
    Ok(res, { msg: "Role deleted" });
  } catch (error) {
    Error(res, { error });
  }
};

export const getWishUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg: 'could not parse Id' });

  try {
    const data = await service.getWishUsers(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

export const submitWish = async (req: Request, res: Response, next: NextFunction) => {
  const { choiceIds } = req.body;

  const token = decodeToken(req)
  if (token === null) {
    return Error(res, { msg: 'No email' });
  }
  try {
    await service.submitWish(token.id, choiceIds);
    Ok(res, { msg: "Roles submitted" });
  } catch (error) {
    Error(res, { error });
  }
};
