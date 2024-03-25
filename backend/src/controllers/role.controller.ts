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

export const addUserRoles = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, roleIds } = req.body;

  try {
    //const data = await service.getRoleUsers(idNumber);
    Ok(res, {});
  } catch (error) {
    Error(res, { error });
  }
};

export const removeUserRoles = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, roleIds } = req.body;

  try {
    //const data = await service.getRoleUsers(idNumber);
    Ok(res, {});
  } catch (error) {
    Error(res, { error });
  }
};


/*
export const submitRoles = async (req: Request, res: Response, next: NextFunction) => {
  const { ids } = req.body;

  const token = decodeToken(req)

  if (token === null) {
    return Error(res, { msg: 'No email' });
  }

  try {
    await service.deleteUserRoles(token.id);
    await service.submitRoles(token.id, ids);
    Ok(res, { msg: "Roles submitted" });
  } catch (error) {
    Error(res, { error });
  }
};

export const getRoleUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg: 'could not parse Id' });

  try {
    const data = await service.getRoleUsers(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};*/