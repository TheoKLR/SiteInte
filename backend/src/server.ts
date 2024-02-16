import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes';
import teamRouter from './routes/team.routes';
import factionRouter from './routes/faction.routes';
import authRouter from './routes/auth.routes';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/team', teamRouter);
app.use('/faction', factionRouter);
app.use('/auth', authRouter);

app.listen(8000, () => {
  console.log(`Server is running...`);
});
