import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '../utils/secret';

export const decodeToken = (req: Request): any => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return null
    }

    try {
        return verify(token, jwtSecret);
    } catch (error) {
        return null
    }
};