import express from 'express';
import  * as fc  from '../controllers/challenge.controller';
import {isAdmin, isAdminAnim, isAdminCE} from '../middlewares/permissions';

const challengeRouter = express.Router();

challengeRouter.get('/countPoints', isAdminAnim, fc.countPoints);
challengeRouter.get('/all', fc.getAllChallenges);
challengeRouter.post('/valid', isAdminAnim, fc.validChallenge);
challengeRouter.post('/validFree', isAdminAnim, fc.validFreeChallenge);
challengeRouter.post('/unvalid', isAdminAnim, fc.unvalidChallenge);
challengeRouter.post('/unvalidFree', isAdminAnim, fc.unvalidFreeChallenge);
challengeRouter.post('/allFreeText', isAdminAnim, fc.getAllFreeText)
challengeRouter.get('/allFaction', fc.getAllFactionChallenges);
challengeRouter.get('/allStudent', fc.getAllStudentChallenges);
challengeRouter.get('/allTeam', fc.getAllTeamChallenges);
challengeRouter.get('/allStudentOrCe', fc.getAllStudentOrCeChallenges);
challengeRouter.get('/allFree', fc.getAllFreeChallenges);

export default challengeRouter;