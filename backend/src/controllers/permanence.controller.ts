import { Request, Response, NextFunction } from 'express';
import * as service from '../services/permanence.service';
import { Error, Created, Ok } from '../utils/responses';
import { Permanence } from '../schemas/permanence.schema';
import { parseDateString, resetTimeToMidnight, timeToStr } from '../utils/time_utils';
import { parse } from 'date-fns';

export const getAllPermanences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllPermanences();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getPermanence = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    const data = await service.getPermanence(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

export const createPermanence = async (req: Request, res: Response, next: NextFunction) => {

  const { title, description, startTime, endTime, location, maxRegistrations } = req.body;

  try{

    const {start_time_str, end_time_str} = await timeToStr(startTime, endTime);
    const updatedPermanence = await service.createPermanence(title, description, start_time_str, end_time_str, location, maxRegistrations)
    Created(res, {})
  }catch(error){
    Error(res, { error });
  }
};

export const updatePermanence = async( req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const { title, description, startTime, endTime, location, maxRegistrations, isRegistrationOpen } = req.body;

  try{
    
    const {start_time_str, end_time_str} = await timeToStr(startTime, endTime);

    const updatedPermanence = await service.updatePermanence(idNumber, title, description, start_time_str, end_time_str, location, maxRegistrations, isRegistrationOpen);
    Ok(res, {msg: 'Permanence updated !'})
  }catch(error){
    Error(res, { error });
  }
  
}
export const deletePermanence = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    await service.deletePermanence(idNumber);
    Ok(res, { msg: "Permanence deleted" });
  } catch (error) {
    Error(res, { error });
  }
};

export const openOrclosePermanenceJ7 = async(req: Request, res: Response, next: NextFunction) => {
  const { state } = req.body;

  try {
    const fetchedPermanences = await service.getAllPermanences();
    const now = resetTimeToMidnight(new Date());

    const j7Permanences = fetchedPermanences.filter(perm => {
      const startTime = resetTimeToMidnight(parseDateString(perm.startTime)); // Conversion correcte
      
      const daysDifference = Math.floor((startTime.getTime() - now.getTime()) / (1000 * 3600 * 24));
      return daysDifference <= 7;
    });

    for (const perm of j7Permanences) {
      await service.openClosePermanence(perm.id, state);
    }

    Ok(res, { msg: "All J+7 perms updated!", data: j7Permanences });
  } catch (error) {
    Error(res, { error });
  }
}


export const registerPermanence = async( req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const { userId } = req.body;
  const useridNumber = parseInt(userId, 10);


  try{
    const permanence : any  = await service.getPermanence(idNumber);

    if (!permanence) {
      return Error(res,{ msg: 'Inscriptions fermées ou permanence introuvable.' });
    }

    /* 24hours condition
    const now = new Date();
    const twentyFourHoursBefore = new Date(new Date(permanence.startTime).getTime() - (24 * 60 * 60 * 1000));


    if (now > twentyFourHoursBefore) {
      return Error(res, { msg: 'Inscriptions fermées 24h avant la permanence.' });
    }*/

    // Vérifier si l'utilisateur est déjà inscrit
    const existingRegistration = await service.getUserRegistration(idNumber, useridNumber);
    if (existingRegistration) {
       return  Error(res, { msg: 'Vous êtes déjà inscrit à cette permanence.' });
    }
    

    const registrations = await service.getRegistration(idNumber);
    if (registrations.length >= permanence.maxRegistrations) {
      return Error(res, { msg: 'Nombre maximum d\'inscriptions atteint.' });
    }
    const result = await service.registerUser(idNumber, useridNumber);

    Ok(res, {msg:"User Registered !", data: result});

  }catch(error){
    Error(res, { error });
  }
};

export const unRegisterPermanence = async( req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const { userId } = req.body;
  const useridNumber = parseInt(userId, 10);


  try{
    const permanence : any = await service.getPermanence(idNumber);

    const startTime = parseDateString(permanence.startTime); // Conversion correcte


    const now = new Date();
    const twentyFourHoursBefore = new Date(new Date(startTime).getTime() - 24 * 60 * 60 * 1000);

    if (now > twentyFourHoursBefore) {
      return Error(res, { msg: 'Vous ne pouvez plus vous désinscrire à moins de 24h de la permanence.' });
    }

    await service.unRegisterUser(idNumber, useridNumber);

    Ok(res, {msg:"User unregistered !"})
  }catch(error){
    Error(res, { error });
  }
};

export const getRegistrations = async( req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  try{

    const registrations = await service.getRegistrations(idNumber);

    Ok(res, {data:registrations})
  }catch(error){
    Error(res, { error });
  }
};

export const getMemberOfPerm = async( req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  try{

    const users = await service.getMemberOfPerm(idNumber);

    Ok(res, {data:users})
  }catch(error){
    Error(res, { error });
  }
};

export const setMembersOfPerm = async( req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  const { users } = req.body;

  try{

    await service.setMembersOfPerm(idNumber, users);

    Ok(res, {data:users})
  }catch(error){
    Error(res, { error });
  }
};

export const getUserPermanences = async( req: Request, res: Response, next: NextFunction) => {

  const { userid } = req.params;
  const idNumber = parseInt(userid, 10);

  try {
    // Récupération des enregistrements de l'utilisateur
    const registrations = await service.getUserRegistrations(idNumber);

    // Récupération des permanences correspondantes de manière asynchrone
    const permanences = await Promise.all(
        registrations.map(async (reg) => {
            return await service.getPermanence(reg.permanenceId);
        })
    );

    // Réponse avec les permanences trouvées
    Ok(res, { data: permanences });
  }catch(error){
    Error(res, { error });
  }
};

export const openClosePermanence = async( req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const {isRegistrationOpen } = req.body;

  try{
    
    const updatedPermanence = await service.openClosePermanence(idNumber, isRegistrationOpen);
    Ok(res, {msg: 'Permanence opened or closed !'})
  }catch(error){
    Error(res, { error });
  }
}

export const isRegister = async(req: Request, res:Response)=>{

  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const { userId } = req.body;
  const useridNumber = parseInt(userId, 10);

  // Vérifier si l'utilisateur est déjà inscrit
  const existingRegistration = await service.getUserRegistration(idNumber, useridNumber);
  if (existingRegistration) {
    return  Ok(res, { data: true });
  }
  else{
    return Ok(res, {data : false})
  }
}