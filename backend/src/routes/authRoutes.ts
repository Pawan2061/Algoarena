import express, { Request, Response } from "express";
import { getUser, getUsers, signIn, signUp } from "../controllers/userControl";
export const userRouter = express.Router();
userRouter.post("/users/create", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/users/all", getUsers);
userRouter.get("/users/:id", getUser);
