"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userControl_1 = require("../controllers/userControl");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", userControl_1.signUp);
exports.userRouter.post("/signin", userControl_1.signIn);
exports.userRouter.get("/users/all", userControl_1.getUsers);
