import { isNumeric } from 'validator';
import { Error, Created, Ok, Unauthorized } from '../utils/responses'
import { Request, Response, NextFunction } from 'express'
import * as service from '../services/newstudent.service';

export const createNewstudent = async (req: Request, res: Response) => {
    try {
        const {count} = req.body;
        count ?? Error(res, {msg: "Count is null"});

        for(let i = 0; i < count ;i++){
            await service.createUUID();
        }
        Ok(res, { msg:"All UUID created" })
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