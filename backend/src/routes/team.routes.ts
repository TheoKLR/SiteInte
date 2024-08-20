import express from 'express';
import  * as tc  from '../controllers/team.controller';
import { isAdmin, isAdminCE, isTokenValid } from '../middlewares/permissions';

const teamRouter = express.Router();

teamRouter.post('/register',isTokenValid, tc.registerTeam);
teamRouter.post('', isAdminCE, tc.createTeam);
teamRouter.get('/all',isTokenValid, tc.getAllTeams);
teamRouter.get('/:id',isTokenValid, tc.getTeam);
teamRouter.get('/allWithPoints', tc.getAllTeamsWithPoints);
teamRouter.get('/:id', isAdminCE, tc.getTeam);
teamRouter.delete('/:id', isAdminCE, tc.deleteTeam);
teamRouter.put('/addtofaction', isAdminCE, tc.addToFaction);
teamRouter.put('/timestamp',isTokenValid, tc.addTimestamp);
teamRouter.get('/timestamp',isTokenValid, tc.getTimestamp);
teamRouter.post('/modify', isAdminCE, tc.modifyTeam);
teamRouter.post('/validate', isAdminCE, tc.validateTeam);
teamRouter.get('/getallmembers/:id',isTokenValid, tc.getAllMembersTeam);
teamRouter.post('/distributeteam',isAdmin, tc.teamDistribution);

export default teamRouter;