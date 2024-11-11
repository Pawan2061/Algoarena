import { Response, Request } from "express";

const requestQueue = "requestqueue";
const responseQueue = "responsequeue";
import { findProblemAndLanguage } from "../utils/extra";
import { redisClient } from "..";
import prisma from "../utils/prisma";
import { v4 as uuidv4 } from "uuid";

export const createSubmission = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    console.log("inside");

    const userId = req.user.id;
    const { code, languageId, problemId } = req.body;
    console.log("got the input");

    if (!code || !languageId || !problemId) {
      return res.status(404).json({
        message: "credentials are unavailble",
      });
    }
    console.log("got the body", code, languageId, problemId);

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
    console.log("sending in the queue");

    await redisClient.lPush(requestQueue, JSON.stringify(input));
    console.log("sent the queue");

    const output = await redisClient.brPop(responseQueue, 0);
    console.log("received rhe output", output);

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
      answer: JSON.parse(JSON.stringify(submission)),
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
