import express from "express";
import { verifyToken } from "../utils/jwt";
import { createSubmission } from "../controllers/submissionController";
export const submitRouter = express.Router();

// submitRouter.post("/submissions/create", [verifyToken], createSubmission);

submitRouter.post("/submissions/create", createSubmission);
