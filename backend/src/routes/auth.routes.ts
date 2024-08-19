import express from 'express';
import  * as ac  from '../controllers/auth.controller';
import { registerMiddleware } from '../middlewares/register';
import { isAdmin, isTokenValid } from '../middlewares/permissions';

const authRouter = express.Router();

authRouter.post('/register', registerMiddleware, ac.register);
authRouter.post('/newStudentLogin', ac.newStudentLogin);
authRouter.get('/studentLogin/:authorization_code', ac.studentLogin);
authRouter.get('/role', ac.getRole);
authRouter.get('/istokenvalid/:token',ac.isTokenValid);
authRouter.get('/handlecasticket', ac.handlecasticket)
authRouter.post('/resetpasswordadmin', isAdmin, ac.resetPasswordAdmin)
authRouter.post('/resetpassworduser', ac.resetPasswordUser)
authRouter.post('/requestpassworduser', ac.requestPasswordUser)

export default authRouter;