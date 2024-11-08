import express from "express";
import { checkRole, verifyToken } from "../utils/jwt";
import { createBoilerPlate } from "../controllers/boilerplateController";

export const boilerPlateRouter = express.Router();

boilerPlateRouter.post("/create", [verifyToken, checkRole], createBoilerPlate);
