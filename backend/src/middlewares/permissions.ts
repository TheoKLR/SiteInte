import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { RoleType } from '../schemas/user.schema';
import { Error, Unauthorized } from '../utils/responses';
import { getUserByEmail } from '../services/user.service';
import { decodeToken } from '../utils/token';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = decodeToken(req);
        const user = await getUserByEmail(decodedToken.email);

        if (user === null) {
            return Error(res, { msg: "user doesn't exists" });
        }

        if (user.role !== RoleType.NewStudent && user.role !== RoleType.Student) {
            next();
        } else {
            Error(res, { msg: 'Forbidden: Insufficient permissions' });
        }
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
};

export const isTokenValid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = decodeToken(req);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            return Unauthorized(res, { msg: 'Unauthorized: Token has expired' });
        }
        next();
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
};