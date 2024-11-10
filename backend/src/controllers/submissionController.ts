import { Response } from "express";

const requestQueue = "requestqueue";
const responseQueue = "responsequeue";
import { findProblemAndLanguage, runCode, runCodeJava } from "../utils/extra";
import { redisClient } from "..";
import { Redispayload, SubmissionRequest } from "../interface";
import {
  createSubmissionCode,
  getResults,
  getSubmission,
  matchTestCases,
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

    const input = {
      language_id: parseInt(languageId),
      source_code: btoa(code),
    };

    const resp = await createSubmissionCode(input);

    const output = await getResults(resp.token);
    console.log(output);

    return res.status(200).json({
      answer: JSON.parse(JSON.stringify(output.decodedOutput)),
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const batchSubmit = async (req: any, res: Response): Promise<any> => {
  try {
    const { codes, languageId, problemId }: SubmissionRequest = req.body;

    if (!codes || !languageId || !problemId) {
      return res.status(404).json({
        message: "not found",
      });
    }
    let results = [];
    for (let code of codes) {
      const input = {
        language_id: parseInt(languageId),
        source_code: btoa(code),
      };
      const { token } = await createSubmissionCode(input);
      const finalOutput = await getResults(token);
      results.push(finalOutput);
    }
    const { successfulMatches, unsuccessfulMatches } = await matchTestCases(
      results
    );

    return {
      test_cases_passed: successfulMatches,
      test_cases_failed: unsuccessfulMatches,
    };
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
