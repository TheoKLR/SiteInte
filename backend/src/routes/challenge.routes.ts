import express from 'express';
import  * as fc  from '../controllers/challenge.controller';

import {isAdmin, isAdminAnim, isAdminCE, isTokenValid} from '../middlewares/permissions';

const challengeRouter = express.Router();

challengeRouter.get('/countPoints', isAdminAnim, fc.countPoints);
challengeRouter.get('/countPointsForTeam', isAdminAnim, fc.countPointsForTeam);
challengeRouter.get('/all', fc.getAllChallengesInDb);
challengeRouter.post('/valid', isAdminAnim, fc.validChallenge);
challengeRouter.post('/validFree', isAdminAnim, fc.validFreeChallenge);
challengeRouter.post('/getCompletedForTeam', fc.getCompletedChallengeForTeam);
challengeRouter.post('/getCompletedForFaction', fc.getCompletedChallengeForFaction);
challengeRouter.post('/getCompletedForStudent', fc.getCompletedChallengeForStudent);
challengeRouter.post('/getAvailableForTeam', fc.getAvailableChallengeForTeam);
challengeRouter.post('/getAvailableForStudent', fc.getAvailableChallengeForStudent);
challengeRouter.post('/getAllAvailableForStudent', fc.getAllAvailableChallengeForStudent);
challengeRouter.post('/getAvailableForFaction', fc.getAvailableChallengeForFaction);
challengeRouter.post('/unvalid', isAdminAnim, fc.unvalidChallenge);
challengeRouter.post('/unvalidFree', isAdminAnim, fc.unvalidFreeChallenge);
challengeRouter.post('/allFreeText', isAdminAnim, fc.getAllFreeText)
challengeRouter.post('/allFaction', fc.getAllFactionChallenges);
challengeRouter.post('/allStudent', fc.getAllStudentChallenges);
challengeRouter.post('/allTeam', fc.getAllTeamChallenges);
challengeRouter.post('/allStudentOrCe', fc.getAllCeChallenges);
challengeRouter.post('/allFree', fc.getAllFreeChallenges);

export default challengeRouter;