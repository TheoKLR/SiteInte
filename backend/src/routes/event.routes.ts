import express from 'express';
import  * as fc  from '../controllers/event.controller';
import { isAdmin } from '../middlewares/permissions';

const eventRouter = express.Router();

eventRouter.post('', isAdmin, fc.createEvent);
eventRouter.put('/start', isAdmin, fc.startEvent);
eventRouter.put('/finish', isAdmin, fc.finishEvent);
eventRouter.get('/active', fc.activeEvents);
eventRouter.get('/inactive', fc.inactiveEvents);


export default eventRouter;