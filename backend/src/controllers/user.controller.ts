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

export const getUserLight = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.getUserLight();
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
        const decodedToken = decodeToken(req);

        const data = await service.getUser(decodedToken.id);
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}

export const getUserbyTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {teamId} = req.params;

        const data = await service.getUserbyTeam(teamId);
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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const {first_name, last_name, birthday, contact } = req.body;
    const token = decodeToken(req)
    if (token === null) {
      return Error(res, { msg: 'No email' });
    }

    try {
        await service.updateUser(token.id, first_name, last_name, birthday, contact);
        Ok(res, { msg: "User updated" });
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

    try {
        const user = await service.getUser(id);
        const permission = user?.permission || "newStudent";
        if (permission === "newStudent") {
            return Error(res, { msg: "bad permission" });
        }
        await service.changePermission(id, perm);
        Ok(res, { msg: "User modified" });
    } catch (error) {
        Error(res, { error });
    }
};

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roles, all, content } = req.body;
        if (all) {
            service.SendEmailToAll(content)
        } else {
            service.SendEmailToPerms(content)
        }
        Ok(res, {});
    } catch (error) {
        Error(res, { error });
    }
}

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

export const modifyTeam = async(req : Request, res: Response) => {

    const {teamId, members} = req.body
    try{
    const old_members = await service.getUserbyTeam(teamId);

    old_members?.forEach(async (old_member)=>{
        await service.updateTeam(old_member.id, null);
    })

    members.forEach(async (user: any) => {
        await service.updateTeam(user.value, teamId);
    });
    Ok(res, { msg: "Team modified" });

    }catch(error){
        Error(res, { error });
    }   
}
