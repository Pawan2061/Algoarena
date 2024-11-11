import express from "express";
import { verifyToken } from "../utils/jwt";
import {
  createSubmission,
  getAllSubmissions,
  getUserSubmissions,
} from "../controllers/submissionController";
export const submitRouter = express.Router();

submitRouter.post("/submissions/create", [verifyToken], createSubmission);
submitRouter.get(
  "/submissions/problem/:problemId",
  [verifyToken],
  getAllSubmissions
);
submitRouter.get(
  "/submissions/user/:problemId",
  [verifyToken],
  getUserSubmissions
);
