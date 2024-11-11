import express from "express";
import {
  createProblem,
  getProblem,
  getProblems,
} from "../controllers/problemController";
import { verifyToken } from "../utils/jwt";
export const problemRouter = express.Router();

problemRouter.post("/problems/create", [verifyToken], createProblem);
problemRouter.get("/problems/all", getProblems);

problemRouter.get("/problems/:problemId", [verifyToken], getProblem);
