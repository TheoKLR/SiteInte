import express from 'express';
import  * as fc  from '../controllers/faction.controller';
import { isAdmin, isAdminCE } from '../middlewares/permissions';

const factionRouter = express.Router();

factionRouter.post('', isAdminCE, fc.createFaction);
factionRouter.get('/all', fc.getAllFactions);
factionRouter.get('/:id', fc.getFaction);
factionRouter.delete('/:id', isAdminCE, fc.deleteFaction);

export default factionRouter;