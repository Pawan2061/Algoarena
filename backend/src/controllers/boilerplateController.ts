import { Request, Response } from "express";
import { boilerPlatePayload } from "../interface";
import prisma from "../utils/prisma";

export const createBoilerPlate = async (
  req: Request<{}, {}, boilerPlatePayload>,

  res: Response
): Promise<any> => {
  try {
    const { code, languageId } = req.body;
    if (!code || !languageId) {
      return res.status(404).json({
        message: "creds not found",
      });
    }
    const boilerPlate = await prisma.boilerplate.create({
      data: {
        code: code,
        languageId: languageId,
      },
    });
    if (!boilerPlate) {
      return res.status(401).json({
        message: "couldnt create the boilerplate",
      });
    }

    return res.status(200).json({
      message: `${boilerPlate.id} is created`,
      data: [boilerPlate],
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
