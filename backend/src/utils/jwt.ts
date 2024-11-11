import { JwtPayload } from "../interface";
import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import prisma from "./prisma";
type token = string;

export const createToken = async (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "2d",
  });
  return token;
};

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(404).json({
      message: "unauthorized",
    });
    return;
  }
  jwt.verify(token!, process.env.JWT_SECRET!, (err: any, decodedToken: any) => {
    if (err) {
      return res.status(404).json({
        error: err,
      });
    }
    req.user = decodedToken;
    next();
  });
};

export const checkRole = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log(req.user);

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });
  if (user?.role != "Admin") {
    return res.status(403).json({
      message: "unauthorized",
    });
  }
  next();
};
