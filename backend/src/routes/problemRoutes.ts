import express from "express";
import {
  createProblem,
  getProblem,
  getProblems,
} from "../controllers/problemController";
export const problemRouter = express.Router();

problemRouter.post("/problems/create", createProblem);
problemRouter.get("/problems/all", getProblems);

problemRouter.get("/problems/:problemId", getProblem);
