import express from 'express';
import  * as fc  from '../controllers/permanence.controller';
import { isAdmin } from '../middlewares/permissions';

const permanenceRouter = express.Router();

permanenceRouter.post('', isAdmin, fc.createPermanence);
permanenceRouter.get('/all', fc.getAllPermanences);
permanenceRouter.get('/:id', isAdmin, fc.getPermanence);
permanenceRouter.post("/:userId/:permId", fc.addUserToPermanence);
permanenceRouter.delete('/:id', isAdmin, fc.deletePermanence);

export default permanenceRouter;