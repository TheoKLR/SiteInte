import { Request, Response, NextFunction } from 'express'
import { Error, Created, Ok, Unauthorized } from '../utils/responses'
import { GetAllBlacklistedStudent } from '../services/blacklist.service'

export const getAllBlacklistedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await GetAllBlacklistedStudent();
        Ok(res, { data });
    } catch (error) {
        Error(res, { error });
    }
}