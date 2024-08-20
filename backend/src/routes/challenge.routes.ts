import express from 'express';
import  * as fc  from '../controllers/challenge.controller';
import {isAdmin, isAdminAnim, isAdminCE} from '../middlewares/permissions';

const challengeRouter = express.Router();

challengeRouter.get('/countPoints', isAdminAnim, fc.countPoints);
challengeRouter.get('/countPointsForTeam', isAdminAnim, fc.countPointsForTeam);
challengeRouter.get('/all', fc.getAllChallengesInDb);
challengeRouter.post('/valid', isAdminAnim, fc.validChallenge);
challengeRouter.post('/validFree', isAdminAnim, fc.validFreeChallenge);
challengeRouter.post('/getCompletedForTeam', isAdminAnim, fc.getCompletedChallengeForTeam);
challengeRouter.post('/getCompletedForFaction', isAdminAnim, fc.getCompletedChallengeForFaction);
challengeRouter.post('/getCompletedForStudent', isAdminAnim, fc.getCompletedChallengeForStudent);
challengeRouter.post('/getAvailableForTeam', isAdminAnim, fc.getAvailableChallengeForTeam);
challengeRouter.post('/getAvailableForStudent', isAdminAnim, fc.getAvailableChallengeForStudent);
challengeRouter.post('/getAvailableForFaction', isAdminAnim, fc.getAvailableChallengeForFaction);
challengeRouter.post('/unvalid', isAdminAnim, fc.unvalidChallenge);
challengeRouter.post('/unvalidFree', isAdminAnim, fc.unvalidFreeChallenge);
challengeRouter.post('/allFreeText', isAdminAnim, fc.getAllFreeText)
challengeRouter.post('/allFaction', fc.getAllFactionChallenges);
challengeRouter.post('/allStudent', fc.getAllStudentChallenges);
challengeRouter.post('/allTeam', fc.getAllTeamChallenges);
challengeRouter.post('/allStudentOrCe', fc.getAllCeChallenges);
challengeRouter.post('/allFree', fc.getAllFreeChallenges);

export default challengeRouter;