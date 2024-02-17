import express from 'express';
import  * as fc  from '../controllers/faction.controller';
import { isAdmin } from '../middlewares/permissions';

const factionRouter = express.Router();

factionRouter.post('', isAdmin, fc.createFaction);
factionRouter.get('/all', isAdmin, fc.getAllFactions);
factionRouter.get('', isAdmin, fc.getFaction);
factionRouter.delete('', isAdmin, fc.deleteFaction);
factionRouter.post('/rename', isAdmin, fc.renameFaction); 
factionRouter.post('/addpoints', isAdmin, fc.addPoints);

export default factionRouter;