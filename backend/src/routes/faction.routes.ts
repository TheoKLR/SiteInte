import express from 'express';
import  * as fc  from '../controllers/faction.controller';
import { isAdmin } from '../middlewares/permissions';

const factionRouter = express.Router();

factionRouter.post('', isAdmin, fc.createFaction);
factionRouter.get('/all', isAdmin, fc.getAllFactions);
factionRouter.get('/:id', isAdmin, fc.getFaction);
factionRouter.delete('/:id', isAdmin, fc.deleteFaction);
factionRouter.put('/addpoints', isAdmin, fc.addPoints);

export default factionRouter;