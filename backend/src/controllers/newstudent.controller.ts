import { isNumeric } from 'validator';
import { Error, Created, Ok, Unauthorized } from '../utils/responses'
import { Request, Response, NextFunction } from 'express'
import * as randomstring from 'randomstring';
import * as service from '../services/newstudent.service';
import * as user_service from '../services/user.service';
import * as bcrypt from 'bcryptjs'
import { PermType } from '../schemas/user.schema';

export const syncNewstudent = async (req: Request, res: Response) => {
    try {
        
        const token = await service.getTokenUTTAPI();
        const newStudents = await service.getNewStudentsFromUTTAPI(token);

        newStudents.forEach( async (element: any) => {
            let user = await service.getNewStudentbyEmail(element.email)
            if (!user){
                await service.createUUID(element.email)
            }

            let userInDb = await user_service.getUserByEmail(element.email);
            if(!userInDb){
                let tmpPassword =  await bcrypt.hash(randomstring.generate(48), 10);
                await user_service.createUser(element.prenom, element.nom, element.email, null, element.specialite, "", "", tmpPassword, PermType.NewStudent);
            }
            else{
                if(element.diplome === "MA"){ //To be sure that every Master are in the correct branch (Some check TC this condition prevent that)
                    
                    await user_service.registerUser(
                        userInDb.first_name, 
                        userInDb.last_name, 
                        userInDb.email,
                        userInDb.birthday,
                        "Master",
                        userInDb.contact,
                        userInDb.discord_id,
                        userInDb.password)
                }
            }
            
        });


        Ok(res, { msg:"All NewStudent created and synced" })

        
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

export const deleteNewStudents = async(req : Request, res: Response)=>{

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