import { Request, Response } from "express";
import prisma from "../utils/prisma";
export const reset = async (req: Request, res: Response): Promise<any> => {
  try {
    const deleteUsers = await prisma.user.deleteMany();
    const deleteSubmissions = await prisma.submission.deleteMany();

    const deleteProblems = await prisma.problem.deleteMany();

    const deleteBoilerPlates = await prisma.boilerplate.deleteMany();
    return res.status(200).json({
      message: "done",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
