import express from 'express';
import  * as sc  from '../controllers/user.controller';
import { isAdmin } from '../middlewares/permissions';

const userRouter = express.Router();

userRouter.get('/all', isAdmin, sc.getAllUsers);
userRouter.get('/user/:id', isAdmin, sc.getUser);
userRouter.delete('/delete/:id', isAdmin, sc.deleteUser);
userRouter.put('/addtoteam', isAdmin, sc.addToTeam);
userRouter.put('/updateuser', sc.updateUser);
userRouter.put('/permission', isAdmin, sc.changePermission);
userRouter.get('/:id/wish', isAdmin, sc.getUserWish);
userRouter.get('/current', sc.getCurentUser);
userRouter.get('/all/light', sc.getUserLight);
userRouter.get('/getbyteam/:teamId',isAdmin ,sc.getUserbyTeam);
userRouter.post('/modifyteam', isAdmin, sc.modifyTeam)


export default userRouter;