import { Response } from "express";

const redisQueue = "requestqueue";

import { findProblemAndLanguage, runCode, runCodeJava } from "../utils/extra";
import { redisClient } from "..";

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
    const { problem, language } = await findProblemAndLanguage(
      problemId,
      languageId
    );

    if (!problem || !language) {
      return res.status(400).json({
        message: "insufficient problem and language",
      });
    }
    const input = {
      code: code,
      languageId: languageId,
      problemId: problemId,
    };

    redisClient.lPush(redisQueue, "hello");
    const ans = await runCode(code);
    return res.status(200).json({
      answer: ans,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
