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

    const input = {
      language_id: parseInt(languageId),
      source_code: btoa(code),
    };

    const output = await runJavascript(input.source_code);

    return res.status(200).json({
      answer: JSON.parse(JSON.stringify(output)),
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

// await redisClient.lPush(requestQueue, JSON.stringify(input));

// await redisClient.lPush(requestQueue, JSON.stringify(code));

// const output = await redisClient.brPop(responseQueue, 0);

// const ans = await runCode(code);
// console.log("popping the requeust");

// const output = await redisClient.brPop(responseQueue, 0);
// console.log("popped the response", output);
