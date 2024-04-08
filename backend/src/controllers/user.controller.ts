import { Request, Response, NextFunction } from 'express';
import * as service from '../services/user.service';
import { Error, Ok } from '../utils/responses';
import { decodeToken } from '../utils/token';
import { PermType, parsePermType } from '../schemas/user.schema';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.getAllUsers();
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);

    if (isNaN(idNumber)) return Error(res, { msg: 'could not parse Id' });

    try {
        const data = await service.getUser(idNumber);
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
};

export const getCurentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = decodeToken(req)
        const data = await service.getUser(decodedToken.id);
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);

    if (isNaN(idNumber)) return Error(res, { msg: 'could not parse Id' });

    try {
        await service.deleteUser(idNumber);
        Ok(res, { msg: "User deleted" });
    } catch (error) {
        Error(res, { error });
    }
};

export const addToTeam = async (req: Request, res: Response, next: NextFunction) => {
    const { userIds, teamId } = req.body;

    try {
        await service.addToTeam(userIds, teamId);
        Ok(res, { msg: "User modified" });
    } catch (error) {
        Error(res, { error });
    }
};

export const addContact = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, contact } = req.body;

    try {
        await service.addContact(userId, contact);
        Ok(res, { msg: "User modified" });
    } catch (error) {
        Error(res, { error });
    }
};

export const changePermission = async (req: Request, res: Response, next: NextFunction) => {
    const { id, perm } = req.body;
    const permission = parsePermType(perm);
    if (!permission || permission === PermType.NewStudent) {
        Error(res, { msg: "bad permission" });
    }

    try {
        await service.changePermission(id, perm);
        Ok(res, { msg: "User modified" });
    } catch (error) {
        Error(res, { error });
    }
};

export const getUserWish = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);

    if (isNaN(idNumber)) return Error(res, { msg: 'could not parse Id' });

    try {
        const data = await service.getUserWish(idNumber);
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}