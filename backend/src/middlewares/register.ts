import { Request, Response, NextFunction } from 'express';
import { getUserByEmail } from '../services/user.service';
import { Error } from '../utils/responses';

export const registerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const email_regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$');

    if (!email_regex.test(email) || email.includes("@utt.fr")) {
        return Error(res, { msg: "Invalid email address" });
    }

    const user = await getUserByEmail(email);

    if (user !== null) {
        return Error(res, { msg: "User already exists" });
    }

    if (password.length < 8) {
        return Error(res, { msg: "Password must be at least 8 characters long" });
    }
    next();
}