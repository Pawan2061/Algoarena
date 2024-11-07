import e, { Request, Response } from "express";
import bcrypt, { genSalt, hash } from "bcrypt";
import { JwtPayload, SigninSchema, SignupSchema } from "../interface";
import prisma from "../utils/prisma";
import { createToken } from "../utils/jwt";

export const signUp = async (
  req: Request<{}, {}, SignupSchema>,
  res: Response
): Promise<any> => {
  try {
    const { name, password } = req.body;
    if (!name && !password) {
      return res.status(200).json({
        message: "invalid creds",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        password: hashed,
      },
    });
    const payload: JwtPayload = {
      name: name,
      password: password,
    };
    const token = await createToken(payload);
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
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: error,
    });
  }
};

export const signIn = async (
  req: Request<{}, {}, SigninSchema>,
  res: Response
): Promise<any> => {
  try {
    const { name, password } = req.body;
    if (!name && !password) {
      return res.status(200).json({
        message: "invalid creds",
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        name: name,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: `no such user  exists`,
      });
    }
    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.status(403).json({
        message: "passwords dont match",
      });
    }
    const payload: JwtPayload = {
      name: name,
      password: password,
    };
    const token = await createToken(payload);
    return res.status(200).json({
      message: `user ${name} is logged in`,
      data: {
        token: token,
      },
    });
  } catch (error) {}
};

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return res.status(400).json({
        message: "no users found",
      });
    }

    return res.status(200).json({
      users: [users],
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
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
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
