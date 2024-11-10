import { Response } from "express";

const requestQueue = "requestqueue";
const responseQueue = "responsequeue";
import { findProblemAndLanguage, runCode, runCodeJava } from "../utils/extra";
import { redisClient } from "..";
import { Redispayload } from "../interface";
import {
  createSubmissionCode,
  getResults,
  getSubmission,
} from "../utils/execute";

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

    // const input: Redispayload = {
    //   code: code,
    //   languageId: languageId,
    //   problemId: problemId,
    // };
    const input = {
      language_id: parseInt(languageId),
      source_code: btoa(code),
    };

    const resp = await createSubmissionCode(input);

    // const showResult = async () => {
    //   const result: any = await getSubmission(resp.token);
    //   console.log(result, "result is here");

    //   if (result.status_id === 1 || result.status_id === 2) {
    //     console.log("inside");

    //     await new Promise((resolve) => setTimeout(resolve, 4000));
    //   } else {
    //     const decodedOutput = result?.stdout ? atob(result.stdout) : "";
    //     return decodedOutput;
    //   }
    // };

    const finalOut = await getResults(resp.token);

    // await redisClient.lPush(requestQueue, JSON.stringify(input));

    // await redisClient.lPush(requestQueue, JSON.stringify(code));

    // const output = await redisClient.brPop(responseQueue, 0);

    // const ans = await runCode(code);
    // console.log("popping the requeust");

    // const output = await redisClient.brPop(responseQueue, 0);
    // console.log("popped the response", output);

    return res.status(200).json({
      answer: JSON.parse(JSON.stringify(finalOut)),
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
