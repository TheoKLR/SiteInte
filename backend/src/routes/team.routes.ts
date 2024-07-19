import express from 'express';
import  * as tc  from '../controllers/team.controller';
import { isAdmin, isAdminCE } from '../middlewares/permissions';

const teamRouter = express.Router();

teamRouter.post('/register', tc.registerTeam);
teamRouter.post('', isAdminCE, tc.createTeam);
teamRouter.get('/all', tc.getAllTeams);
teamRouter.get('/:id', isAdminCE, tc.getTeam);
teamRouter.delete('/:id', isAdminCE, tc.deleteTeam);
teamRouter.put('/addtofaction', isAdminCE, tc.addToFaction);
teamRouter.put('/timestamp', tc.addTimestamp);
teamRouter.get('/timestamp', tc.getTimestamp);
teamRouter.post('/rename', isAdminCE, tc.renameTeam);
teamRouter.post('/validate', isAdminCE, tc.validateTeam);

export default teamRouter;