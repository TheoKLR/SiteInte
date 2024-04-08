import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes'
import teamRouter from './routes/team.routes'
import factionRouter from './routes/faction.routes'
import authRouter from './routes/auth.routes'
import {roleRouter, wishRouter} from './routes/role.routes'
import eventRouter from './routes/event.routes'
import { isTokenValid } from './middlewares/permissions'
import { init } from './database/init'

async function startServer() {
  const app = express()

  app.use(cors({ origin: '*' }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/auth', authRouter)
  app.use(isTokenValid)

  app.use('/user', userRouter)
  app.use('/team', teamRouter)
  app.use('/faction', factionRouter)
  app.use('/role', roleRouter)
  app.use('/event', eventRouter)
  app.use('/wish', wishRouter)
  await init()

  app.listen(8000, () => {
    console.log(`Server is running...`)
  })
}

startServer().catch(err => {
  console.error('Error starting server:', err)
})
