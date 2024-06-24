import express, { Router } from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import teamRouter from "./routes/team.routes";
import factionRouter from "./routes/faction.routes";
import authRouter from "./routes/auth.routes";
import newStudentRouter from "./routes/newstudent.route";
import { roleRouter, wishRouter } from "./routes/role.routes";
import eventRouter from "./routes/event.routes";
import { isTokenValid } from "./middlewares/permissions";
import { init } from "./database/init";
import { api_prefix } from "./utils/secret";
import { log } from "./middlewares/log";

async function startServer() {
  const app = express();
  const router = Router();

  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(api_prefix, router);
  app.use(log)
  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/team", teamRouter);
  router.use("/faction", factionRouter);
  router.use("/role", roleRouter);
  router.use("/event", eventRouter);
  router.use("/wish", wishRouter);
  router.use("/newstudent", newStudentRouter);

  await init();

  app.listen(8000, () => {
    console.log(`Server is running...`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
