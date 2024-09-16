import express from 'express';
import  * as fc  from '../controllers/email.controller';
import { isAdmin } from '../middlewares/permissions';
import {sendEmailForBus} from "../controllers/email.controller";

const emailRouter = express.Router();

emailRouter.post('/sendemail', isAdmin, fc.sendEmail);
emailRouter.post('/sendEmailForBus', isAdmin, fc.sendEmailForBus);

export default emailRouter;