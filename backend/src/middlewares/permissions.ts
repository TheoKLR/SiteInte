import { Request, Response, NextFunction } from 'express';
import { verify, JsonWebTokenError } from 'jsonwebtoken';
import { RoleType } from '../schemas/user.schema';
import { jwtSecret } from '../utils/secret';
import { errorResponse } from '../utils/responses';
import { getUserByEmail } from '../services/user.service';
import { decodeToken } from '../utils/token';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = decodeToken(req);
        const user = await getUserByEmail(decodedToken.email);

        if (user === null) {
            return errorResponse(res, { msg: "user doesn't exists" });
        }

        if (user.role !== RoleType.NewStudent && user.role !== RoleType.Student) {
            next();
        } else {
            errorResponse(res, { msg: 'Forbidden: Insufficient permissions' });
        }
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return errorResponse(res, { msg: 'Unauthorized: Invalid token' });
        } else {
            return errorResponse(res, { msg: 'Unauthorized: Missing token' });
        }
    }
};

