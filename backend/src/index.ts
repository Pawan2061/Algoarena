import express, { Response } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/authRoutes";
import { checkRole, verifyToken } from "./utils/jwt";
import { problemRouter } from "./routes/problemRoutes";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/v1", userRouter);
app.use("/api/v1", problemRouter);
app.get("/test", [verifyToken, checkRole], () => {
  console.log("working fine");
});

app.listen(3000, () => {
  console.log("working on server");
});
