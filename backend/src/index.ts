import express, { Response } from "express";
import dotenv from "dotenv";
import { createClient } from "redis";

import { userRouter } from "./routes/authRoutes";
import { checkRole, verifyToken } from "./utils/jwt";
import { problemRouter } from "./routes/problemRoutes";
import { submitRouter } from "./routes/submissionRoutes";
import { subClient } from "./controllers/submissionController";
export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export const pullClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/v1", userRouter);
app.use("/api/v1", problemRouter);
app.use("/api/v1", submitRouter);
app.get("/test", [verifyToken, verifyToken], () => {
  console.log("working good");
});

async function startServer() {
  await redisClient.connect();
  await pullClient.connect();
  await subClient.connect()
  app.listen(3000, () => {
    console.log("working on server");
  });
}

startServer();
