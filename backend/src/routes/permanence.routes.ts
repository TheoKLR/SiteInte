import express from 'express';
import  * as fc  from '../controllers/permanence.controller';
import { isAdmin, isAdminCE } from '../middlewares/permissions';

const permanenceRouter = express.Router();

permanenceRouter.post('', isAdminCE, fc.createPermanence);
permanenceRouter.get('/all', fc.getAllPermanences);
permanenceRouter.get('/:id', isAdminCE, fc.getPermanence);
permanenceRouter.delete('/:id', isAdminCE, fc.deletePermanence);
permanenceRouter.put('/:id', isAdminCE, fc.updatePermanence);
permanenceRouter.post('/openorclosej7', isAdminCE, fc.openOrclosePermanenceJ7);
permanenceRouter.post('/register/:id', fc.registerPermanence);
permanenceRouter.delete('/unregister/:id', fc.unRegisterPermanence);
permanenceRouter.get('/registrations/:id', fc.getRegistrations);
permanenceRouter.get('/userpermanences/:userid', fc.getUserPermanences)


export default permanenceRouter;