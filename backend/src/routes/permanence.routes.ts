import express from 'express';
import  * as fc  from '../controllers/permanence.controller';
import { isAdmin } from '../middlewares/permissions';

const permanenceRouter = express.Router();

permanenceRouter.post('', isAdmin, fc.createPermanence);
permanenceRouter.get('/all', fc.getAllPermanences);
permanenceRouter.get('/:id', isAdmin, fc.getPermanence);
permanenceRouter.delete('/:id', isAdmin, fc.deletePermanence);
permanenceRouter.put('/:id', isAdmin, fc.updatePermanence);
permanenceRouter.post('/openorclosej7', isAdmin, fc.openOrclosePermanenceJ7);
permanenceRouter.post('/register/:id', fc.registerPermanence);
permanenceRouter.delete('/unregister/:id', isAdmin, fc.unRegisterPermanence);
permanenceRouter.get('/registrations/:id', fc.getRegistrations);
permanenceRouter.get('/userpermanences/:userid', fc.getUserPermanences)


export default permanenceRouter;