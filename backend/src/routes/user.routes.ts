import express from 'express';
import { getAllUsers, addUser } from '../controllers/user.controllers';

const userRouter = express.Router();

userRouter.get('/add/:name', addUser);
userRouter.get('/all', getAllUsers);

export default userRouter;