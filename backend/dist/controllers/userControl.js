"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const jwt_1 = require("../utils/jwt");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!name && !password) {
            return res.status(200).json({
                message: "invalid creds",
            });
        }
        const hashed = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_1.default.user.create({
            data: {
                name: name,
                password: hashed,
            },
        });
        const payload = {
            name: name,
            password: password,
        };
        const token = yield (0, jwt_1.createToken)(payload);
        if (!user) {
            return res.status(401).json({
                message: "couldnt create the user",
            });
        }
        return res.status(200).json({
            message: `user ${user.name} is created`,
            data: {
                token: token,
                user: user,
            },
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        if (!name && !password) {
            return res.status(200).json({
                message: "invalid creds",
            });
        }
        const user = yield prisma_1.default.user.findFirst({
            where: {
                name: name,
            },
        });
        if (!user) {
            return res.status(401).json({
                message: `no such user  exists`,
            });
        }
        const compare = yield bcrypt_1.default.compare(password, user.password);
        if (!compare) {
            return res.status(403).json({
                message: "passwords dont match",
            });
        }
        const payload = {
            name: name,
            password: password,
        };
        const token = yield (0, jwt_1.createToken)(payload);
        return res.status(200).json({
            message: `user ${name} is logged in`,
            data: {
                token: token,
                user: user,
            },
        });
    }
    catch (error) { }
});
exports.signIn = signIn;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany();
        if (!users) {
            return res.status(400).json({
                message: "no users found",
            });
        }
        return res.status(200).json({
            users: [users],
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "no user found",
            });
        }
        return res.status(200).json({
            user: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
exports.getUser = getUser;
