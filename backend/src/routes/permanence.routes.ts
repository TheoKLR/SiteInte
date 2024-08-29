import express from 'express';
import  * as fc  from '../controllers/permanence.controller';
import {isAdmin, isAdminCE, isTokenValid} from '../middlewares/permissions';
import {getMemberOfPerm, setMembersOfPerm} from "../controllers/permanence.controller";

const permanenceRouter = express.Router();

permanenceRouter.post('', isAdminCE, fc.createPermanence);
permanenceRouter.get('/all', fc.getAllPermanences);
permanenceRouter.get('/:id', isAdminCE, fc.getPermanence);
permanenceRouter.delete('/:id', isAdminCE, fc.deletePermanence);
permanenceRouter.post('/update/:id', isAdminCE, fc.updatePermanence);
permanenceRouter.post('/openorclose/:id', isAdminCE, fc.openClosePermanence);
permanenceRouter.post('/openorclosej7', isAdminCE, fc.openOrclosePermanenceJ7);
//TODO: faille de sécu, n'importe qui de connecté peut désinscrire qui il veut
permanenceRouter.post('/register/:id', isTokenValid, fc.registerPermanence);
permanenceRouter.post('/setMember/:id', isAdminCE, fc.setMembersOfPerm);
permanenceRouter.post('/isregister/:id', isTokenValid, fc.isRegister);
permanenceRouter.delete('/unregister/:id', isTokenValid, fc.unRegisterPermanence);
permanenceRouter.get('/registrations/:id', isTokenValid, fc.getRegistrations);
permanenceRouter.get('/getRegisteredUser/:id', isTokenValid, fc.getMemberOfPerm);
permanenceRouter.get('/userpermanences/:userid', isTokenValid, fc.getUserPermanences)


export default permanenceRouter;