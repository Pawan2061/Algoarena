import { Request, Response } from "express";
import { problemPayload } from "../interface";
import prisma from "../utils/prisma";

export const createProblem = async (
  req: Request<{}, {}, problemPayload>,
  res: Response
): Promise<any> => {
  try {
    const { boilerPlateId, input, output, statement } = req.body;
    if (!boilerPlateId || !input || !output || !statement) {
      return res.status(404).json({
        message: "creds arent available",
      });
    }
    const problem = await prisma.problem.create({
      data: {
        input: input,
        statement: statement,
        boilerplateId: boilerPlateId,
        output: output,
      },
    });
    if (!problem) {
      return res.status(403).json({
        message: "error creating the problem",
      });
    }
    return res.status(200).json({
      message: `problem ${problem.id} is created`,
      data: problem,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: error,
    });
  }
};

export const getProblems = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const problems = await prisma.problem.findMany();
    if (!problems) {
      return res.status(404).json({
        message: "no problems are available",
      });
    }
    return res.status(200).json({
      problems: [problems],
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};
export const getProblem = async (req: Request, res: Response): Promise<any> => {
  try {
    const problem = await prisma.problem.findUnique({
      where: {
        id: req.params.problemId,
      },
    });
    if (!problem) {
      return res.status(404).json({
        message: "problem not availbale",
      });
    }

    return res.status(200).json({
      data: problem,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};
