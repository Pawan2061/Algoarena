import { Response, Request } from "express";

const requestQueue = "requestqueue";
const responseQueue = "responsequeue";
import { findProblemAndLanguage } from "../utils/extra";
import { redisClient } from "..";
import prisma from "../utils/prisma";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "redis";
import { handleSubcribe } from "../utils/subscribe";
import { matchResults } from "../utils/match";
import { Output } from "../interface";

export const subClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
export const createSubmission = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    console.log("starting test");

    const userId = req.user.id;
    const { id, code, languageId, problemId } = req.body;

    if (!code || !languageId || !problemId || !id) {
      return res.status(403).json({
        message: "credentials are unavailble",
      });
    }
    console.log("checking");

    const { language, problem } = await findProblemAndLanguage(
      languageId,
      problemId
    );
    const queueId = uuidv4();
    console.log("input");

    const inputRedis = {
      queueId: queueId,
      language_id: parseInt(language!.id),
      source_code: code,
    };

    console.log("listning on id:", inputRedis.queueId, queueId);

    const finalOutput = handleSubcribe(queueId, 5000);

    await redisClient.lPush(requestQueue, JSON.stringify(inputRedis));

    const response = await finalOutput;
    const st = JSON.parse(response);

    const message = st.replace(/[^\x20-\x7E]+/g, "").trim();
    console.log(message, "is here");

    const output = await matchResults(problem!.output, message);

    const submission = await prisma.submission.create({
      data: {
        languageId: languageId,
        userId: userId,
        problemId: problemId,
        status: "Pending",
        code: code,
      },
    });
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalSubmissions: {
          increment: 1,
        },
      },
    });

    return res.status(200).json({
      answer: JSON.parse(JSON.stringify(output)),
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
//this is the submissions from all the users for a given ps
export const getAllSubmissions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { problemId } = req.params;
    const submissions = await prisma.submission.findMany({
      where: {
        problemId: problemId,
      },
    });
    if (!submissions) {
      return res.status(404).json({
        message: "no submissions found",
      });
    }

    return res.status(200).json({
      submissions: submissions,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json(error);
  }
};

export const getUserSubmissions = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const userId = await req.user.id;
    const problemId = await req.body.problemId;
    if (!userId) {
      return res.status(404).json({
        message: "user isnot logged in",
      });
    }
    const submissions = await prisma.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });
    return res.status(200).json({ userSubmissions: submissions });
  } catch (error) {
    return res.status(404).json(error);
  }
};
