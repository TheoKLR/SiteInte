import { Request, Response, NextFunction } from 'express';


export const log = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.originalUrl);
};