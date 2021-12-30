import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import {
  loginValidation,
  registerValidation,
} from '../validations/userValidation';
import {
  base64Encode,
  generateAccessToken,
  getRandomNumber,
} from '../utils/utils';

interface User {
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).json(error.details);

  const emailExist = await UserModel.findOne({ email });
  if (emailExist)
    return res.status(400).json([
      {
        context: {
          label: 'email',
        },
        message: 'Email already registered!',
      },
    ]);

  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);

  try {
    const avatarFolder = './server/public/default-avatar';

    fs.readdir(avatarFolder, async (err, files) => {
      const randomAvatar = files[getRandomNumber(files.length)];
      const base64Image = base64Encode(`${avatarFolder}/${randomAvatar}`);

      const newUser = new UserModel({
        ...req.body,
        avatar: {
          imageFormat: randomAvatar.split('.').pop(),
          base64: base64Image,
        },
        password: hashedPassword,
      });

      const user = await newUser.save();
      if (!user)
        return res
          .status(400)
          .json({ error: 'Something went wrong while creating your account' });
    });

    return res.status(200).json({ email, password });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).json(error.details);

  const user = await UserModel.findOne({ email });

  if (!user)
    return res.status(400).json([
      {
        context: {
          label: 'email',
        },
        message: "Email doesn't exists. Please try again!",
      },
    ]);

  const isValidPassword: boolean = await bcrypt.compare(
    password,
    user.password
  );

  if (!isValidPassword)
    return res.status(400).json([
      {
        context: {
          label: 'password',
        },
        message: 'Password is incorrect!',
      },
    ]);

  const accessToken = generateAccessToken(user._id);
  req.headers.authorization = 'Bearer ' + accessToken;

  return res.status(200).json(accessToken);
};

export const getDataFromToken = async (req: Request, res: Response) => {
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Access denied' });
    }

    const _id = decoded.id;
    const user = await UserModel.findById({ _id });

    return res.status(200).json(user);
  }
};
