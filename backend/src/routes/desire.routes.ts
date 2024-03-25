import express from 'express';
import  * as dc  from '../controllers/role.controller';
import { isAdmin, isTokenValid } from '../middlewares/permissions';

const desireRouter = express.Router();

desireRouter.post('', isAdmin, dc.createRole);
desireRouter.get('/all', isTokenValid, dc.getAllRoles);
desireRouter.get('/:id', dc.getRole);
desireRouter.delete('/:id', isAdmin, dc.deleteRole);
//desireRouter.post('/submit', dc.);
//desireRouter.get('/:id/users', isAdmin, dc.getDesireUsers);

export default desireRouter;