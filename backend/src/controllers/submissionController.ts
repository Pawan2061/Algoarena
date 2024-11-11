import { Response, Request } from "express";

const requestQueue = "requestqueue";
const responseQueue = "responsequeue";
import { findProblemAndLanguage } from "../utils/extra";
import { redisClient } from "..";
import prisma from "../utils/prisma";

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
    const input = {
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

    return res.status(200).json({
      answer: JSON.parse(JSON.stringify(submission)),
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
