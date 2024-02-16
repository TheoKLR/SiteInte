import { Request, Response, NextFunction } from 'express';
import { verify, JsonWebTokenError } from 'jsonwebtoken';
import { jwtSecret } from '../utils/secret';
import { errorResponse } from '../utils/responses';

export const decodeToken = (req: Request, res: Response): any => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        throw new Error('Unauthorized: Missing token');
    }

    try {
        return verify(token, jwtSecret);
    } catch (error) {
        throw error;
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        let decodedToken = decodeToken(req, res);

        if (decodedToken.role === 'NewStudent' || decodedToken.role === 'Student') {
            next();
        } else {
            errorResponse(res, { msg: 'Forbidden: Insufficient permissions' });
        }
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return errorResponse(res, { msg: 'Unauthorized: Invalid token' });
        } else {
            return errorResponse(res, { msg: 'Internal Server Error' });
        }
    }
};
