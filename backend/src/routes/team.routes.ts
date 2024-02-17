import express from 'express';
import  * as tc  from '../controllers/team.controller';
import { isAdmin } from '../middlewares/permissions';

const teamRouter = express.Router();

teamRouter.post('', isAdmin, tc.createTeam);
teamRouter.get('/all', isAdmin, tc.getAllTeams);
teamRouter.get('', isAdmin, tc.getTeam);
teamRouter.delete('', isAdmin, tc.deleteTeam);
teamRouter.post('/rename', isAdmin, tc.renameTeam);
teamRouter.post('/addtofac', isAdmin, tc.addTeamToFaction);


export default teamRouter;