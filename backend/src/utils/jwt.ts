import { JwtPayload } from "../interface";
import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
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
  }
  jwt.verify(token!, process.env.JWT_SECRET!, (err: any, decodedToken: any) => {
    if (err) {
      res.status(404).json({
        error: err,
      });
      return;
    }
    req.user = decodedToken;
    next();
  });
};
