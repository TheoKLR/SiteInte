import express from 'express';
import { getAllFactions, addFaction } from '../controllers/faction.controllers';

const factionRouter = express.Router();

factionRouter.get('/add/:name', addFaction);
factionRouter.get('/all', getAllFactions);

export default factionRouter;