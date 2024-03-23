import { Request, Response, NextFunction } from 'express';
import * as service from '../services/user.service';
import { Error, Ok } from '../utils/responses';
import { decodeToken } from '../utils/token';

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

export const getUserDesires = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);

    if (isNaN(idNumber)) return Error(res, { msg: 'could not parse Id' });

    try {
        const data = await service.getUserDesires(idNumber);
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
};