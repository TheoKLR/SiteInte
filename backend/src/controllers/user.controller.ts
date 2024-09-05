import { Request, Response, NextFunction } from 'express';
import * as service from '../services/user.service';
import { Error, Ok } from '../utils/responses';
import { decodeToken } from '../utils/token';
import { parsePermType, PermType } from '../schemas/user.schema';
import { RI_list } from '../utils/RI_list';
import {CustomRequest} from "../middlewares/permissions";
import {NoUserMail} from "../error/user";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.GetAllStudent();
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}

export const getAllNewUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.GetAllNewStudent();
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}

export const getAllCe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.getAllCe();
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}

export const getAllByPermission= async (req: Request, res: Response, next: NextFunction) => {

        const {permission} = req.params;
        const permissionParse = parsePermType(permission);
        
    try {
        if(permissionParse){
            const data = await service.getAllByPermission(permissionParse);
            const datafiltered = data.filter((user : any)=> !RI_list.includes(user.email)) //Don't include RI
            Ok(res, {data: datafiltered });
        }
        else{
            Error(res, {msg : "Not a good perm"})
        }
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
    const {branch, contact, discord_id } = req.body;
    const token = decodeToken(req)
    if (token === null) {
      return Error(res, { msg: 'No email' });
    }

    try {
        await service.updateUser(token.id,branch, contact, discord_id);
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

export const getInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { emails } = req.body
    try {
        const data = await service.getInfo(emails)
        Ok(res, {data: data, msg: "Ok"})
    } catch (error) {
        Error(res, { error })
    }
}

export const setBusData = async (req: Request, res: Response, next: NextFunction) => {
    const { lines } = req.body
    try {
        const data = await service.setBusData(lines)
        Ok(res, {data: data, msg: "Ok"})
    } catch (error) {
        Error(res, { error })
    }
}

export const getMissing = async (req: Request, res: Response, next: NextFunction) => {
    const { data } = req.body
    try {
        const result = await service.getMissing(data)
        Ok(res, {data: result, msg: "Ok"})
    } catch (error) {
        Error(res, { error })
    }
}

export const changePermission = async (req: Request, res: Response, next: NextFunction) => {
    const { id, perm } = req.body;

    try {
        const user = await service.getUser(id);

        //This part is to block Admin to promote a newStudent
        /*const permission = user?.permission || "newStudent";
        if (permission === "newStudent") {
            return Error(res, { msg: "bad permission" });
        }*/
       
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

export const getBusAttribution = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const data = await service.getBusAttribution(req.decoded_token?.email as string);
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}

export const getBusAttributionByBus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.getBusAttributionByBus();

        // Envoyer la réponse avec les données converties
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

export const isInRILIst = async(req : Request, res: Response) => {

    const {email} = req.params;
    const RI_List = RI_list;
    if(RI_List.includes(email)){
        Ok(res, {data : true});
    }
    else{
        Ok(res, {data: false});
    }

}
