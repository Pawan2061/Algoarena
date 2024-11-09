import express from "express";
const app = express();
import { createClient } from "redis";
import dotenv from "dotenv";

import { processRequest } from "./utils/processRequest";
const redisQueue = "requestqueue";
dotenv.config();

export const redis_url = process.env.REDIS_URL || "redis://localhost:6379";

export const redisClient = createClient({
  url: redis_url,
});
export const pushClient = createClient({
  url: redis_url,
});

async function connectRedis() {
  try {
    await redisClient.connect();
    await pushClient.connect();
    redisClient.on("error", (err) => {
      console.log("error while joining redis", err);
    });

    executeProcess();
  } catch (error) {
    console.log(error);
  }
}

connectRedis();
async function executeProcess() {
  const request = await redisClient.brPop(redisQueue, 0);

  await processRequest(JSON.parse(request!.element));
  executeProcess();
}

app.listen(3002, () => {
  console.log("working on port 3002");
});
