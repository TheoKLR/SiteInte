import express from 'express';
import  * as ac  from '../controllers/auth.controller';
import { registerMiddleware } from '../middlewares/register';

const authRouter = express.Router();

authRouter.post('/register', registerMiddleware, ac.register);
authRouter.post('/newStudentLogin', ac.newStudentLogin);
authRouter.get('/studentLogin/:authorization_code', ac.studentLogin);
authRouter.get('/role', ac.getRole);

export default authRouter;