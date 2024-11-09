import { Response } from "express";

const requestQueue = "requestqueue";
const responseQueue = "responsequeue";
import { findProblemAndLanguage, runCode, runCodeJava } from "../utils/extra";
import { redisClient } from "..";
import { Redispayload } from "../interface";

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

    const input: Redispayload = {
      code: code,
      languageId: languageId,
      problemId: problemId,
    };

    console.log("pushing the code");

    // await redisClient.lPush(requestQueue, JSON.stringify(input));

    await redisClient.lPush(requestQueue, JSON.stringify(code));
    console.log("psuhed to queue");

    const output = await redisClient.brPop(responseQueue, 0);
    console.log(output, "the final output is here");

    console.log("compiled the output");

    // const ans = await runCode(code);
    // console.log("popping the requeust");

    // const output = await redisClient.brPop(responseQueue, 0);
    // console.log("popped the response", output);

    return res.status(200).json({
      answer: output,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
