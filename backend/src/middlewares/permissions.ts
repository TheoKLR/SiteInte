import { Request, Response, NextFunction } from 'express';
import { PermType } from '../schemas/user.schema';
import { Error, Unauthorized } from '../utils/responses';
import { getUserByEmail } from '../services/user.service';
import { decodeToken } from '../utils/token';

export interface CustomRequest extends Request {
    decoded_token?: {id: number, email: string};
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = decodeToken(req);
        const user = await getUserByEmail(decodedToken.email);

        if (user === null) {
            return Error(res, { msg: "user doesn't exists" });
        }

        if (user.permission === PermType.Admin) {
            next();
        } else {
            Error(res, { msg: 'Forbidden: Insufficient permissions' });
        }
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
};

export const isAdminCE = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = decodeToken(req);
        const user = await getUserByEmail(decodedToken.email);

        if (user === null) {
            return Error(res, { msg: "user doesn't exists" });
        }

        if (user.permission === PermType.Admin || user.permission === PermType.RespoCE) {
            next();
        } else {
            Error(res, { msg: 'Forbidden: Insufficient permissions' });
        }
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
};

export const isAdminCEAnim = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = decodeToken(req);
        const user = await getUserByEmail(decodedToken.email);

        if (user === null) {
            return Error(res, { msg: "user doesn't exists" });
        }

        if (user.permission === PermType.Admin || user.permission === PermType.RespoCE || user.permission === PermType.Anim) {
            next();
        } else {
            Error(res, { msg: 'Forbidden: Insufficient permissions' });
        }
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
};

//TODO: create anim perm
export const isAdminAnim = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodedToken = decodeToken(req);
        const user = await getUserByEmail(decodedToken.email);

        if (user === null) {
            return Error(res, { msg: "user doesn't exists" });
        }

        if (user.permission === PermType.Admin || user.permission === PermType.Anim) {
            next();
        } else {
            Error(res, { msg: 'Forbidden: Insufficient permissions' });
        }
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
};

export const isTokenValid = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return Error(res, { msg: 'Unauthorized: Invalid token' });
        }
        const decodedToken = decodeToken(req);
        if (!decodedToken) {
            return Unauthorized(res, { msg: 'Unauthorized: Token has expired' });
        }
        //put decoded token in request so services can access it easily.
        req.decoded_token = decodedToken
        next();
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
};

export const isCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        const {userId} = req.body

        if (!token) {
            return Error(res, { msg: 'Unauthorized: Invalid token' });
        }
        const decodedToken = decodeToken(req);

        if (!decodedToken) {
            return Unauthorized(res, { msg: 'Unauthorized: Token has expired' });
        }

        const decodedUser = await getUserByEmail(decodedToken);

        if(decodedUser){
            if(userId !== decodedUser.id){
                return Unauthorized(res, { msg: 'Unauthorized: Invalid user' });
            }
        }


        next();
    } catch (error) {
        return Error(res, { msg: 'Unauthorized: Invalid token' });
    }
};
