import express from 'express';
import  * as ac  from '../controllers/auth.controller';
import { registerMiddleware } from '../middlewares/register';

const authRouter = express.Router();

authRouter.post('/register', registerMiddleware, ac.register);
authRouter.post('/login', ac.login);

export default authRouter;