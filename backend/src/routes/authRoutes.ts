import express, { Request, Response } from "express";
import { getUsers, signIn, signUp } from "../controllers/userControl";
export const userRouter = express.Router();
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/users/all", getUsers);
