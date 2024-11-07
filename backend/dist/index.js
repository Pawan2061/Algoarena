"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = require("./routes/authRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
app.use("/api/v1", authRoutes_1.userRouter);
app.listen(3000, () => {
    console.log("working on server");
});
