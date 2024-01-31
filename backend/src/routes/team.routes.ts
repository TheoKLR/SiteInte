import express from 'express';
import { getAllTeams, addTeam } from '../controllers/team.controllers';

const teamRouter = express.Router();

teamRouter.get('/add/:name', addTeam);
teamRouter.get('/all', getAllTeams);

export default teamRouter;