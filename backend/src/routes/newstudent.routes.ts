import express from 'express';
import  * as nsc  from '../controllers/newstudent.controller';
import { isAdmin } from '../middlewares/permissions';

const newStudentRouter = express.Router();

newStudentRouter.post('/syncNewStudent', isAdmin, nsc.syncNewstudent);
newStudentRouter.get('/allNewStudent', isAdmin, nsc.getAllNewStudent);
newStudentRouter.delete('/deleteNewStudent/:uuids', isAdmin, nsc.deleteNewStudents);

export default newStudentRouter;