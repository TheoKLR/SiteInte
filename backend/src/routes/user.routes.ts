import express from 'express';
import  * as sc  from '../controllers/user.controller';
import { isAdmin, isAdminCE, isTokenValid } from '../middlewares/permissions';

const userRouter = express.Router();

userRouter.get('/all', isAdminCE, sc.getAllUsers);
userRouter.get('/user/:id', isAdminCE, sc.getUser);
userRouter.delete('/delete/:id', isAdmin, sc.deleteUser);
userRouter.put('/addtoteam', isAdminCE, sc.addToTeam);
userRouter.put('/updateuser',isTokenValid, sc.updateUser);
userRouter.put('/permission', isAdmin, sc.changePermission);
userRouter.get('/:id/wish', isAdmin, sc.getUserWish);
userRouter.get('/current',isTokenValid, sc.getCurentUser);
userRouter.get('/all/light',isTokenValid, sc.getUserLight);
userRouter.get('/getbyteam/:teamId',isAdmin ,sc.getUserbyTeam);
userRouter.post('/modifyteam', isAdmin, sc.modifyTeam);
userRouter.get('/allbypermission/:permission', isAdmin, sc.getAllByPermission);
userRouter.get('/isinrilist/:email', sc.isInRILIst);


export default userRouter;