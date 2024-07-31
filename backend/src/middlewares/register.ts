import { Request, Response, NextFunction } from 'express';
import { getUserByEmail } from '../services/user.service';
import { Error } from '../utils/responses';
import { getIsUsedbyUUID } from '../services/newstudent.service';
import { validate as uuidValidate } from 'uuid';

export const registerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, uuid } = req.body;

        const email_regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$');

        if (!email_regex.test(email)) {
            return Error(res, { msg: "Invalid email address" });
        }

        //Verification for UUID
        if (!uuidValidate(uuid)) {
            return Error(res, { msg: "Incorrect UUID" });
        }
        const isUsed = await getIsUsedbyUUID(uuid);
        if ((isUsed === null || isUsed === true)) {
            return Error(res, { msg: "Incorrect UUID or already used" });
        }
       
        const user = await getUserByEmail(email);
        



        if (user !== null) {
            return Error(res, { msg: "User already exists" });
        }

        if (password.length < 8) {
            return Error(res, { msg: "Password must be at least 8 characters long" });
        }

        // Everything is okay, proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Catch any unexpected errors and handle them
        return Error(res, { error: err, msg: 'An unexpected error occurred during registration' });
    }
};