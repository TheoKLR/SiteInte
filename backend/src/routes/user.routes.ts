import express from 'express';
import  * as sc  from '../controllers/user.controller';
import  * as scBlacklist  from '../controllers/blacklist.controller';
import {isAdmin, isAdminCE, isAdminCEAnim, isTokenValid} from '../middlewares/permissions';

const userRouter = express.Router();

userRouter.get('/all', isAdminCEAnim, sc.getAllUsers);
userRouter.get('/blacklisted', isAdminCE, scBlacklist.getAllBlacklistedUsers);
userRouter.get('/ce/all', isAdminCEAnim, sc.getAllCe);
userRouter.get('/user/:id', isAdminCEAnim, sc.getUser);
userRouter.delete('/delete/:id', isAdmin, sc.deleteUser);
userRouter.put('/addtoteam', isAdminCE, sc.addToTeam);
userRouter.put('/updateuser',isTokenValid, sc.updateUser);
userRouter.put('/permission', isAdmin, sc.changePermission);
userRouter.get('/:id/wish', isAdmin, sc.getUserWish);
userRouter.get('/busAttribution', isTokenValid, sc.getBusAttribution);
userRouter.get('/getBusAttributionByBus', isAdmin, sc.getBusAttributionByBus);
userRouter.get('/current',isTokenValid, sc.getCurentUser);
userRouter.get('/all/light',isTokenValid, sc.getUserLight);
userRouter.get('/getbyteam/:teamId',isAdminCE, sc.getUserbyTeam);
userRouter.post('/modifyteam', isAdminCE, sc.modifyTeam);
userRouter.get('/allbypermission/:permission', isAdmin, sc.getAllByPermission);
userRouter.post('/getInfo', isAdmin, sc.getInfo);
userRouter.post('/setBusData', isAdmin, sc.setBusData);
userRouter.post('/setBusData', isAdmin, sc.setBusData);
userRouter.post('/getMissing', isAdmin, sc.getMissing);
userRouter.get('/isinrilist/:email', sc.isInRILIst);


export default userRouter;
