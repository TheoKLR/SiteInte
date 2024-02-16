import express from 'express';
import  * as fc  from '../controllers/faction.controller';

const factionRouter = express.Router();

factionRouter.post('/:name', fc.createFaction);
factionRouter.get('', fc.getAllFactions);
factionRouter.get('/:id', fc.getFaction);
factionRouter.delete('/:id', fc.deleteFaction);
factionRouter.post('/rename/:id/:name', fc.renameFaction);
factionRouter.post('/add/:id/:points', fc.addPoints);
factionRouter.post('/rmv/:id/:points', fc.removePoints);

export default factionRouter;