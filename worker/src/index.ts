import express from "express";
const app = express();
import { createClient } from "redis";
const redisQueue = "requestqueue";

const redis_url = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient = createClient({
  url: redis_url,
});

async function connectRedis() {
  try {
    await redisClient.connect();
    redisClient.on("error", (err) => {
      console.log("error while joining redis", err);
    });

    const output = await redisClient.brPop(redisQueue, 10);

    console.log(output);

    // executeProcess();
  } catch (error) {
    console.log(error);
  }
}

connectRedis();
// async function executeProcess() {
//   executeProcess();
// }

app.listen(3002, () => {
  console.log("working on port 3002");
});
