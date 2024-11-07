import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/authRoutes";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/v1", userRouter);

app.listen(3000, () => {
  console.log("working on server");
});
