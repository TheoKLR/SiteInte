import { isNumeric } from 'validator';
import { Error, Created, Ok, Unauthorized } from '../utils/responses'
import { Request, Response, NextFunction } from 'express'
import * as service from '../services/newstudent.service';

export const syncNewstudent = async (req: Request, res: Response) => {
    try {
        
        const token = await service.getTokenUTTAPI();
        const newStudents = await service.getNewStudentsFromUTTAPI(token);
        newStudents.forEach( async (element: any) => {
            let user = await service.getNewStudentbyEmail(element.email)
            if (!user){
                await service.createUUID(element.email)
            }
        });
        Ok(res, { msg:"All UUID created and synced" })
    } catch (error) {
        Error(res, { error })
    }
}

export const getAllNewStudent = async(req : Request, res: Response)=>{
    try{
        const data = await service.getAllnewStudent();
        Ok(res, {data:data});
    }catch(error){
        Error(res,{error})
    }
}

export const deleteByUUID = async(req : Request, res: Response)=>{

    const {uuids} = req.params;
    uuids ?? Error (res, {msg: "No UUIDs"})

    const elements = uuids.split("+");

    try{
        elements.map(async element =>{
            await service.deleteByUUID(element);
        })
        Ok(res, {msg: "Suppresion effectuée !"});
    }catch(error){
        Error(res,{error})
    }
}