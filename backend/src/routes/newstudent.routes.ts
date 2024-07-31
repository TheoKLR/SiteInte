import express from 'express';
import  * as nsc  from '../controllers/newstudent.controller';
import { isAdmin } from '../middlewares/permissions';

const newStudentRouter = express.Router();

newStudentRouter.post('/syncUUID', isAdmin, nsc.syncNewstudent);
newStudentRouter.get('/allUUID', isAdmin, nsc.getAllNewStudent);
newStudentRouter.delete('/deleteUUID/:uuids', isAdmin, nsc.deleteByUUID);

export default newStudentRouter;