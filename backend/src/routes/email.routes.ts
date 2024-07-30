import express from 'express';
import  * as fc  from '../controllers/email.controller';
import { isAdmin } from '../middlewares/permissions';

const emailRouter = express.Router();

emailRouter.post('/sendemail', fc.sendEmail);


export default emailRouter;