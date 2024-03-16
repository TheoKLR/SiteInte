import { Request, Response } from 'express';
import * as service from '../services/user.service';
import { Error, Ok } from '../utils/responses';
import { RoleType } from '../schemas/user.schema';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const data = await service.getAllUsers();
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}

export const getUser = async (req: Request, res: Response) => {
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

export const deleteUser = async (req: Request, res: Response) => {
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

export const addToTeam = async (req: Request, res: Response) => {
    const { UserId, TeamId } = req.body;

    try {
        await service.addToTeam(UserId, TeamId);
        Ok(res, { msg: "User modified" });
    } catch (error) {
        Error(res, { error });
    }
};

export const addContact = async (req: Request, res: Response) => {
    const { userId, contact } = req.body;

    try {
        await service.addContact(userId, contact);
        Ok(res, { msg: "User modified" });
    } catch (error) {
        Error(res, { error });
    }
};

export const getUserDesires = async (req: Request, res: Response) => {
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