import { Response, Request } from "express";

const requestQueue = "requestqueue";
const responseQueue = "responsequeue";
import { findProblemAndLanguage } from "../utils/extra";
import { redisClient } from "..";
import prisma from "../utils/prisma";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "redis";
import { handleSubcribe } from "../utils/subscribe";

export const subClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
export const createSubmission = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const userId = req.user.id;
    const { code, languageId, problemId } = req.body;

    if (!code || !languageId || !problemId) {
      return res.status(404).json({
        message: "credentials are unavailble",
      });
    }

    const { language, problem } = await findProblemAndLanguage(
      languageId,
      problemId
    );
    const queueId = uuidv4();

    const input = {
      queueId: queueId,
      language_id: parseInt(language!.id),
      source_code: code,
    };

    const finalOutput = handleSubcribe(queueId, 5000);

    await redisClient.lPush(requestQueue, JSON.stringify(input));

    const response = await finalOutput;

    // const output = await redisClient.brPop(responseQueue, 0);

    console.log(response, "output is here");

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
      answer: JSON.parse(JSON.stringify(response)),
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
