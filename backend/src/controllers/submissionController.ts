import { Response } from "express";

const requestQueue = "requestqueue";
const responseQueue = "responsequeue";
import {
  findProblemAndLanguage,
  runCode,
  runCodeJava,
  runJavascript,
} from "../utils/extra";
import { redisClient } from "..";
import { Redispayload, SubmissionRequest } from "../interface";

export const createSubmission = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const userId = req.user.id;
    const { code, languageId, problemId } = req.body;

    if (!code || !languageId || !problemId || !userId) {
      return res.status(404).json({
        message: "credentials are unavailble",
      });
    }

    const { language, problem } = await findProblemAndLanguage(
      languageId,
      problemId
    );
    const input = {
      language_id: parseInt(language!.id),
      source_code: code,
    };

    await redisClient.lPush(requestQueue, JSON.stringify(input));
    const output = await redisClient.brPop(responseQueue, 0);

    return res.status(200).json({
      answer: JSON.parse(JSON.stringify(output)),
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
