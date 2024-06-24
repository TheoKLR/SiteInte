import express from 'express';
import  * as tc  from '../controllers/team.controller';
import { isAdmin } from '../middlewares/permissions';

const teamRouter = express.Router();

teamRouter.post('/register', tc.registerTeam);
teamRouter.post('', isAdmin, tc.createTeam);
teamRouter.get('/all', tc.getAllTeams);
teamRouter.get('/:id', isAdmin, tc.getTeam);
teamRouter.delete('/:id', isAdmin, tc.deleteTeam);
teamRouter.put('/addtofaction', isAdmin, tc.addToFaction);
teamRouter.put('/timestamp', tc.addTimestamp);
teamRouter.get('/timestamp', tc.getTimestamp);
teamRouter.post('/rename', isAdmin, tc.renameTeam);

export default teamRouter;