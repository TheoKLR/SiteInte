import express from 'express';
import  * as tc  from '../controllers/team.controller';

const teamRouter = express.Router();

teamRouter.post('/:name', tc.createTeam);
teamRouter.get('/all', tc.getAllTeams);
teamRouter.get('', tc.getTeam);
teamRouter.delete('', tc.deleteTeam);
teamRouter.post('/rename', tc.renameTeam);
teamRouter.post('/addtofac', tc.addTeamToFaction);


export default teamRouter;