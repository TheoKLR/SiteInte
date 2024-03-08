import express from 'express';
import  * as tc  from '../controllers/team.controller';
import { isAdmin } from '../middlewares/permissions';

const teamRouter = express.Router();

teamRouter.post('', isAdmin, tc.createTeam);
teamRouter.get('/all', isAdmin, tc.getAllTeams);
teamRouter.get(':id', isAdmin, tc.getTeam);
teamRouter.delete(':id', isAdmin, tc.deleteTeam);
teamRouter.put('/addtofac', isAdmin, tc.addTeamToFaction);

export default teamRouter;