import express from 'express';
import  * as dc  from '../controllers/desire.controller';
import { isAdmin, isTokenValid } from '../middlewares/permissions';

const desireRouter = express.Router();

desireRouter.post('', isAdmin, dc.createDesire);
desireRouter.get('/all', isTokenValid, dc.getAllDesires);
desireRouter.get('/:id', dc.getDesire);
desireRouter.delete('/:id', isAdmin, dc.deleteDesire);
desireRouter.post('/submit', dc.submitDesires);
desireRouter.get('/:id/users', isAdmin, dc.getDesireUsers);

export default desireRouter;