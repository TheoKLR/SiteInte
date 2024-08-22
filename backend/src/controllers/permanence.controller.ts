import { Request, Response, NextFunction } from 'express';
import * as service from '../services/permanence.service';
import { Error, Created, Ok } from '../utils/responses';
import { Permanence } from '../schemas/permanence.schema';
import { timeToStr } from '../utils/time_utils';


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

export const openOrclosePermanenceJ7 = async( req: Request, res: Response, next: NextFunction) => {

  const { state } = req.body;
  try{
    const fetchedPermanences = await service.getAllPermanences();

    const now = new Date();

    // Réinitialiser l'heure de la date actuelle
    now.setHours(0, 0, 0, 0);
    const j7Permanences = fetchedPermanences.filter(perm => {
      const startTime = new Date(perm.startTime);
    
      // Réinitialiser l'heure de la date de début de la permanence
      startTime.setHours(0, 0, 0, 0);
    
      const timeDifference = startTime.getTime() - now.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference === 7;
    });

        for (const perm of j7Permanences) {
          await service.updatePermanence(
            perm.id, 
            perm.title, 
            perm.description ?? "No desc", 
            perm.startTime, 
            perm.endTime, 
            perm.location, 
            perm.maxRegistrations, 
            state)
        }

    Ok(res, {msg:"All J+7 perms updated !", data: j7Permanences});
  }catch(error){
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

    const now = new Date();
    const twentyFourHoursBefore = new Date(new Date(permanence.startTime).getTime() - 24 * 60 * 60 * 1000);

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