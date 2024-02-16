import express from 'express';
import  * as sc  from '../controllers/user.controller';
import { isAdmin } from '../middlewares/permissions';

const userRouter = express.Router();

userRouter.get('/all', isAdmin, sc.getAllUsers);
userRouter.get('', isAdmin, sc.getUser);
userRouter.delete('', isAdmin, sc.deleteUser);
userRouter.post('/addtoteam', isAdmin, sc.addToTeam);

export default userRouter;