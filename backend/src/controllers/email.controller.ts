import { Request, Response, NextFunction } from 'express';
import * as service from '../services/email.service';
import { Error, Ok } from '../utils/responses';

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {emailoptions} = req.body;
    
    await service.sendEmail(emailoptions);
    Ok(res, { });
  } catch (error) {
    Error(res, { error });
  }
}

export const sendEmailForBus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {emailoptions} = req.body;

    await service.sendEmail(emailoptions);
    Ok(res, { });
  } catch (error) {
    Error(res, { error });
  }
}

